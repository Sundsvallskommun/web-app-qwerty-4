import { SessionStorage } from '@interfaces/sessionstorage';
import 'dotenv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useSessionStorage = create(
  persist<SessionStorage>(
    (set) => ({
      useBrowser: false,
      setUseBrowser: (useBrowser) => set(() => ({ useBrowser })),
    }),
    {
      name: `${process.env.NEXT_PUBLIC_APP_NAME}-session-store`,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
