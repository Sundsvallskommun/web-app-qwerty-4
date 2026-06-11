import { Applications, AssistantPublic, AssistantSparse, SpacePublic, SpaceSparse } from '@data-contracts/backend/data-contracts';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const mergeSpace = (current: SpaceSparse | SpacePublic, next: SpaceSparse | SpacePublic): SpaceSparse | SpacePublic =>
  ({
    ...current,
    ...next,
    applications: next.applications ?? current.applications,
    default_assistant: next.default_assistant ?? current.default_assistant,
  }) as SpaceSparse | SpacePublic;

const isAssistantPublic = (assistant: AssistantPublic | AssistantSparse): assistant is AssistantPublic => 'prompt' in assistant;

const toAssistantSparse = (assistant: AssistantPublic | AssistantSparse): AssistantSparse => {
  if (!isAssistantPublic(assistant)) {
    return assistant;
  }

  return {
    id: assistant.id,
    name: assistant.name,
    created_at: assistant.created_at,
    updated_at: assistant.updated_at,
    completion_model_kwargs: assistant.completion_model_kwargs ?? null,
    logging_enabled: assistant.logging_enabled,
    permissions: undefined,
    user_id: assistant.user.id,
    published: assistant.published,
    description: assistant.description ?? null,
    metadata_json: assistant.metadata_json ?? null,
    type: assistant.type as unknown as AssistantSparse['type'],
    icon_id: assistant.icon_id ?? null,
    completion_model_id: null,
  };
};

const mergeSpaces = (
  currentSpaces: Array<SpaceSparse | SpacePublic>,
  nextSpaces: Array<SpaceSparse | SpacePublic>
): Array<SpaceSparse | SpacePublic> => {
  const spacesById = new Map(currentSpaces.map((space) => [space.id, space]));

  nextSpaces.forEach((space) => {
    const existing = spacesById.get(space.id);
    spacesById.set(space.id, existing ? mergeSpace(existing, space) : space);
  });

  const mergedSpaces = nextSpaces.map((space) => spacesById.get(space.id) ?? space);
  const appendedSpaces = currentSpaces.filter((space) => !nextSpaces.some((nextSpace) => nextSpace.id === space.id));

  return [...mergedSpaces, ...appendedSpaces];
};

interface Data {
  spaces: Array<SpaceSparse | SpacePublic>;
  loading: boolean;
  attempted: boolean;
  bootstrapLoaded: boolean;
  personalLoaded: boolean;
  sharedSpacesLoaded: boolean;
  hydrating: boolean;
  applicationsLoadedBySpaceId: Record<string, boolean>;
  applicationsLoadingBySpaceId: Record<string, boolean>;
}

interface Actions {
  setSpaces: (spaces: Array<SpaceSparse | SpacePublic>) => void;
  upsertSpace: (space: SpaceSparse | SpacePublic) => void;
  upsertAssistantInSpace: (spaceId: string, assistant: AssistantPublic | AssistantSparse) => void;
  setSpaceApplications: (spaceId: string, applications: Applications) => void;
  setLoading: (loading: boolean) => void;
  setAttempted: (attempted: boolean) => void;
  setBootstrapLoaded: (loaded: boolean) => void;
  setPersonalLoaded: (loaded: boolean) => void;
  setSharedSpacesLoaded: (loaded: boolean) => void;
  setHydrating: (hydrating: boolean) => void;
  setApplicationsLoaded: (spaceId: string, loaded: boolean) => void;
  setApplicationsLoading: (spaceId: string, loading: boolean) => void;
}

export const useSpaceStore = create(
  persist<Data & Actions>(
    (set) => ({
      spaces: [],
      loading: false,
      attempted: false,
      bootstrapLoaded: false,
      personalLoaded: false,
      sharedSpacesLoaded: false,
      hydrating: false,
      applicationsLoadedBySpaceId: {},
      applicationsLoadingBySpaceId: {},
      setSpaces: (spaces) =>
        set((state) => ({
          spaces: mergeSpaces(state.spaces, spaces),
        })),
      upsertSpace: (space) =>
        set((state) => {
          const existing = state.spaces.find((current) => current.id === space.id);

          if (!existing) {
            return { spaces: [...state.spaces, space] };
          }

          return {
            spaces: state.spaces.map((current) => (current.id === space.id ? mergeSpace(current, space) : current)),
          };
        }),
      upsertAssistantInSpace: (spaceId, assistant) =>
        set((state) => ({
          spaces: state.spaces.map((space) => {
            if (space.id !== spaceId) {
              return space;
            }

            const nextAssistant = toAssistantSparse(assistant);
            const currentAssistants = space.applications?.assistants.items ?? [];
            const assistants = currentAssistants.some((currentAssistant) => currentAssistant.id === assistant.id) ?
                currentAssistants.map((currentAssistant) =>
                  currentAssistant.id === nextAssistant.id ? { ...currentAssistant, ...nextAssistant } : currentAssistant
                )
              : [...currentAssistants, nextAssistant];

            return {
              ...space,
              applications: {
                assistants: {
                  permissions: space.applications?.assistants.permissions ?? [],
                  items: assistants,
                  count: assistants.length,
                },
                group_chats: space.applications?.group_chats ?? {
                  permissions: [],
                  items: [],
                  count: 0,
                },
                services: space.applications?.services ?? {
                  permissions: [],
                  items: [],
                  count: 0,
                },
                apps: space.applications?.apps ?? {
                  permissions: [],
                  items: [],
                  count: 0,
                },
              },
            } as SpaceSparse | SpacePublic;
          }),
        })),
      setSpaceApplications: (spaceId, applications) =>
        set((state) => ({
          spaces: state.spaces.map((space) =>
            space.id === spaceId ?
              {
                ...space,
                applications,
              }
            : space
          ),
        })),
      setLoading: (loading) => set(() => ({ loading })),
      setAttempted: (attempted) => set(() => ({ attempted })),
      setBootstrapLoaded: (bootstrapLoaded) => set(() => ({ bootstrapLoaded })),
      setPersonalLoaded: (personalLoaded) => set(() => ({ personalLoaded })),
      setSharedSpacesLoaded: (sharedSpacesLoaded) => set(() => ({ sharedSpacesLoaded })),
      setHydrating: (hydrating) => set(() => ({ hydrating })),
      setApplicationsLoaded: (spaceId, loaded) =>
        set((state) => ({
          applicationsLoadedBySpaceId: {
            ...state.applicationsLoadedBySpaceId,
            [spaceId]: loaded,
          },
        })),
      setApplicationsLoading: (spaceId, loading) =>
        set((state) => ({
          applicationsLoadingBySpaceId: {
            ...state.applicationsLoadingBySpaceId,
            [spaceId]: loading,
          },
        })),
    }),
    {
      name: 'spaces',
      storage: createJSONStorage(() => sessionStorage),
      merge: (persistedState, currentState) => {
        const state = persistedState as Partial<Data & Actions>;

        return {
          ...currentState,
          ...state,
          loading: false,
          attempted: false,
          hydrating: false,
          applicationsLoadingBySpaceId: {},
        };
      },
    }
  )
);
