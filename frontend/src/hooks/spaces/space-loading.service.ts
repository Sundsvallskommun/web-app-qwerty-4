import { AssistantPublic } from '@data-contracts/backend/data-contracts';
import { usePinnedAssistantsStore } from '@hooks/assistants/use-pinned-assistants-store.hook';
import { useUserSpaceSettingsStore } from '@hooks/user-settings/use-user-space-settings-store.hook';
import { getAssistant } from '@services/assistant.service';
import { getPinnedAssistants } from '@services/pinned-assistants.service';
import { getSpaces, getPersonalSpace, getSpaceApplications } from '@services/space.service';
import { getUserSpaceSettings } from '@services/user-space-settings.service';
import { useSpaceStore } from './use-space-store.hook';

const BACKGROUND_HYDRATION_CONCURRENCY = 4;

let bootstrapPromise: Promise<{ personalLoaded: boolean; sharedSpacesLoaded: boolean }> | null = null;
const applicationsRequests = new Map<string, Promise<void>>();

const normalizePinnedAssistantIds = (ids: unknown): string[] => {
  if (!Array.isArray(ids)) {
    return [];
  }

  const uniqueIds = new Set<string>();

  ids.forEach((id) => {
    if (typeof id !== 'string') {
      return;
    }

    const normalizedId = id.trim();
    if (!normalizedId) {
      return;
    }

    uniqueIds.add(normalizedId);
  });

  return [...uniqueIds];
};

const updateBootstrapLoaded = () => {
  const state = useSpaceStore.getState();
  state.setBootstrapLoaded(state.personalLoaded && state.sharedSpacesLoaded);
};

const seedPinnedAssistantsStore = (ids: string[]) => {
  const store = usePinnedAssistantsStore.getState();
  store.setAttempted(true);
  store.setIds(ids);
  store.setLoaded(true);
  store.setLoading(false);
};

const seedUserSpaceSettingsStore = (settings: Awaited<ReturnType<typeof getUserSpaceSettings>>) => {
  const store = useUserSpaceSettingsStore.getState();
  store.setAttempted(true);
  store.setSettings(settings);
  store.setLoaded(true);
  store.setLoading(false);
};

const loadPinnedAssistant = async (assistantId: string): Promise<AssistantPublic | null> => {
  try {
    const assistant = await getAssistant(assistantId);
    useSpaceStore.getState().upsertAssistantInSpace(assistant.space_id, assistant);
    return assistant;
  } catch {
    return null;
  }
};

const runBackgroundHydration = async (spaceIds: string[]) => {
  if (!spaceIds.length) {
    useSpaceStore.getState().setHydrating(false);
    return;
  }

  useSpaceStore.getState().setHydrating(true);

  const queue = [...spaceIds];
  const workers = Array.from({ length: Math.min(BACKGROUND_HYDRATION_CONCURRENCY, queue.length) }, async () => {
    while (queue.length > 0) {
      const nextSpaceId = queue.shift();
      if (!nextSpaceId) {
        return;
      }

      await ensureSpaceApplicationsLoaded(nextSpaceId);
    }
  });

  await Promise.allSettled(workers);
  useSpaceStore.getState().setHydrating(false);
};

export const ensureSpaceApplicationsLoaded = (spaceId: string): Promise<void> => {
  const normalizedId = spaceId.trim();
  if (!normalizedId) {
    return Promise.resolve();
  }

  const state = useSpaceStore.getState();
  if (state.applicationsLoadedBySpaceId[normalizedId]) {
    return Promise.resolve();
  }

  const existingRequest = applicationsRequests.get(normalizedId);
  if (existingRequest) {
    return existingRequest;
  }

  const request = getSpaceApplications(normalizedId)
    .then((applications) => {
      const store = useSpaceStore.getState();
      store.setSpaceApplications(normalizedId, applications);
      store.setApplicationsLoaded(normalizedId, true);
    })
    .catch(() => undefined)
    .finally(() => {
      const store = useSpaceStore.getState();
      store.setApplicationsLoading(normalizedId, false);
      applicationsRequests.delete(normalizedId);
    });

  state.setApplicationsLoading(normalizedId, true);
  applicationsRequests.set(normalizedId, request);

  return request;
};

export const bootstrapSpaces = async (): Promise<{ personalLoaded: boolean; sharedSpacesLoaded: boolean }> => {
  if (bootstrapPromise) {
    return bootstrapPromise;
  }

  const state = useSpaceStore.getState();
  const hasPersonalSpace = state.spaces.some((space) => space.personal && !!space.default_assistant);

  if (state.bootstrapLoaded && state.personalLoaded && state.sharedSpacesLoaded && hasPersonalSpace) {
    return {
      personalLoaded: state.personalLoaded,
      sharedSpacesLoaded: state.sharedSpacesLoaded,
    };
  }

  state.setAttempted(true);
  state.setLoading(true);
  usePinnedAssistantsStore.getState().setAttempted(true);
  usePinnedAssistantsStore.getState().setLoading(true);
  useUserSpaceSettingsStore.getState().setAttempted(true);
  useUserSpaceSettingsStore.getState().setLoading(true);

  bootstrapPromise = Promise.allSettled([
    getSpaces(false, false).then((res) => res.data),
    getPersonalSpace().then((res) => res.data),
    getPinnedAssistants(),
    getUserSpaceSettings(),
  ])
    .then(async ([spacesResult, personalResult, pinnedResult, settingsResult]) => {
      let sharedSpacesLoaded = false;
      let personalLoaded = false;

      if (spacesResult.status === 'fulfilled') {
        const store = useSpaceStore.getState();
        store.setSpaces(spacesResult.value.items);
        store.setSharedSpacesLoaded(true);
        sharedSpacesLoaded = true;
        updateBootstrapLoaded();
      }

      if (personalResult.status === 'fulfilled') {
        const store = useSpaceStore.getState();
        store.upsertSpace(personalResult.value);
        store.setPersonalLoaded(true);
        store.setApplicationsLoaded(personalResult.value.id, true);
        personalLoaded = true;
        updateBootstrapLoaded();
      }

      const hiddenSpaceIds =
        settingsResult.status === 'fulfilled' ? settingsResult.value.hiddenSpaceIds.map((id) => id.trim()).filter(Boolean) : [];

      if (settingsResult.status === 'fulfilled') {
        seedUserSpaceSettingsStore(settingsResult.value);
      } else {
        const settingsStore = useUserSpaceSettingsStore.getState();
        settingsStore.setAttempted(true);
        settingsStore.setLoading(false);
      }

      const pinnedAssistantIds =
        pinnedResult.status === 'fulfilled' ? normalizePinnedAssistantIds(pinnedResult.value.ids) : [];

      if (pinnedResult.status === 'fulfilled') {
        seedPinnedAssistantsStore(pinnedAssistantIds);
      } else {
        const pinnedStore = usePinnedAssistantsStore.getState();
        pinnedStore.setAttempted(true);
        pinnedStore.setLoading(false);
      }

      if (sharedSpacesLoaded && pinnedAssistantIds.length > 0) {
        await Promise.allSettled(pinnedAssistantIds.map((assistantId) => loadPinnedAssistant(assistantId)));
      }

      if (sharedSpacesLoaded) {
        const visibleSharedSpaceIds = useSpaceStore
          .getState()
          .spaces.filter((space) => !space.personal && !hiddenSpaceIds.includes(space.id))
          .map((space) => space.id);

        void runBackgroundHydration(visibleSharedSpaceIds);
      } else {
        useSpaceStore.getState().setHydrating(false);
      }

      return {
        personalLoaded,
        sharedSpacesLoaded,
      };
    })
    .finally(() => {
      useSpaceStore.getState().setLoading(false);
      bootstrapPromise = null;
    });

  return bootstrapPromise;
};
