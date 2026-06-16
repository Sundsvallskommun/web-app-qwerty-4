import { SessionMetadataPublic } from '@data-contracts/backend/data-contracts';
import 'dotenv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SessionsByTargetKey = Record<string, SessionMetadataPublic[]>;
type LoadedByTargetKey = Record<string, boolean>;
type LoadingByTargetKey = Record<string, boolean>;

interface ChatTargetSessionsStore {
  sessionsByTargetKey: SessionsByTargetKey;
  loadedByTargetKey: LoadedByTargetKey;
  loadingByTargetKey: LoadingByTargetKey;
  setTargetSessions: (targetKey: string, sessions: SessionMetadataPublic[]) => void;
  setTargetLoaded: (targetKey: string, loaded: boolean) => void;
  setTargetLoading: (targetKey: string, loading: boolean) => void;
  reset: () => void;
}

export const CHAT_TARGET_SESSIONS_STORE_NAME = `${process.env.NEXT_PUBLIC_APP_NAME}-chat-target-sessions-store`;

export const useChatTargetSessionsStore = create(
  persist<ChatTargetSessionsStore>(
    (set) => ({
      sessionsByTargetKey: {},
      loadedByTargetKey: {},
      loadingByTargetKey: {},
      setTargetSessions: (targetKey, sessions) =>
        set((state) => ({
          sessionsByTargetKey: {
            ...state.sessionsByTargetKey,
            [targetKey]: sessions,
          },
        })),
      setTargetLoaded: (targetKey, loaded) =>
        set((state) => ({
          loadedByTargetKey: {
            ...state.loadedByTargetKey,
            [targetKey]: loaded,
          },
        })),
      setTargetLoading: (targetKey, loading) =>
        set((state) => ({
          loadingByTargetKey: {
            ...state.loadingByTargetKey,
            [targetKey]: loading,
          },
        })),
      reset: () =>
        set(() => ({
          sessionsByTargetKey: {},
          loadedByTargetKey: {},
          loadingByTargetKey: {},
        })),
    }),
    {
      name: CHAT_TARGET_SESSIONS_STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
