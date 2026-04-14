import { SessionMetadataPublic } from '@data-contracts/backend/data-contracts';
import 'dotenv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AssistantSessionsById = Record<string, SessionMetadataPublic[]>;
type AssistantLoadedById = Record<string, boolean>;
type AssistantLoadingById = Record<string, boolean>;

interface AssistantSessionsStore {
  sessionsByAssistantId: AssistantSessionsById;
  loadedByAssistantId: AssistantLoadedById;
  loadingByAssistantId: AssistantLoadingById;
  setAssistantSessions: (assistantId: string, sessions: SessionMetadataPublic[]) => void;
  setAssistantLoaded: (assistantId: string, loaded: boolean) => void;
  setAssistantLoading: (assistantId: string, loading: boolean) => void;
  reset: () => void;
}

export const ASSISTANT_SESSIONS_STORE_NAME = `${process.env.NEXT_PUBLIC_APP_NAME}-assistant-sessions-store`;

export const useAssistantSessionsStore = create(
  persist<AssistantSessionsStore>(
    (set) => ({
      sessionsByAssistantId: {},
      loadedByAssistantId: {},
      loadingByAssistantId: {},
      setAssistantSessions: (assistantId, sessions) =>
        set((state) => ({
          sessionsByAssistantId: {
            ...state.sessionsByAssistantId,
            [assistantId]: sessions,
          },
        })),
      setAssistantLoaded: (assistantId, loaded) =>
        set((state) => ({
          loadedByAssistantId: {
            ...state.loadedByAssistantId,
            [assistantId]: loaded,
          },
        })),
      setAssistantLoading: (assistantId, loading) =>
        set((state) => ({
          loadingByAssistantId: {
            ...state.loadingByAssistantId,
            [assistantId]: loading,
          },
        })),
      reset: () =>
        set(() => ({
          sessionsByAssistantId: {},
          loadedByAssistantId: {},
          loadingByAssistantId: {},
        })),
    }),
    {
      name: ASSISTANT_SESSIONS_STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
