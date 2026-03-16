import { LocalStorage } from '@interfaces/localstorage';
import { ColorSchemeMode } from '@sk-web-gui/react';
import 'dotenv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useLocalStorage = create(
  persist<LocalStorage>(
    (set) => ({
      colorScheme: ColorSchemeMode.System,
      setColorScheme: (colorScheme) => set(() => ({ colorScheme })),
      menuOpen: false,
      setMenuOpen: (menuOpen) => set(() => ({ menuOpen })),
      pinnedAssistantIds: [],
      setPinnedAssistantIds: (pinnedAssistantIds) => set(() => ({ pinnedAssistantIds })),
      togglePinnedAssistantId: (id) =>
        set((state) => ({
          pinnedAssistantIds:
            state.pinnedAssistantIds.includes(id) ?
              state.pinnedAssistantIds.filter((pinnedId) => pinnedId !== id)
            : [...state.pinnedAssistantIds, id],
        })),
    }),
    {
      name: `${process.env.NEXT_PUBLIC_APP_NAME}-admin-store`,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
