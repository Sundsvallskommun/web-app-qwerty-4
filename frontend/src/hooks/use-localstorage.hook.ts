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
      groupSharedAssistantsBySpace: false,
      setGroupSharedAssistantsBySpace: (groupSharedAssistantsBySpace) => set(() => ({ groupSharedAssistantsBySpace })),
      openSharedAssistantSpaceIds: [],
      setOpenSharedAssistantSpaceIds: (openSharedAssistantSpaceIds) => set(() => ({ openSharedAssistantSpaceIds })),
      toggleOpenSharedAssistantSpaceId: (spaceId) =>
        set((state) => ({
          openSharedAssistantSpaceIds:
            state.openSharedAssistantSpaceIds.includes(spaceId) ?
              state.openSharedAssistantSpaceIds.filter((id) => id !== spaceId)
            : [...state.openSharedAssistantSpaceIds, spaceId],
        })),
    }),
    {
      name: `${process.env.NEXT_PUBLIC_APP_NAME}-local-store`,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
