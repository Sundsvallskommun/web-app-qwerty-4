import { ColorSchemeMode } from '@sk-web-gui/react';

export type TableProperty = string;

export interface LocalStorage {
  colorScheme: ColorSchemeMode;
  setColorScheme: (color: ColorSchemeMode) => void;
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
  pinnedAssistantIds: string[];
  setPinnedAssistantIds: (ids: string[]) => void;
  togglePinnedAssistantId: (id: string) => void;
  groupSharedAssistantsBySpace: boolean;
  setGroupSharedAssistantsBySpace: (groupBySpace: boolean) => void;
  openSharedAssistantSpaceIds: string[];
  setOpenSharedAssistantSpaceIds: (spaceIds: string[]) => void;
  toggleOpenSharedAssistantSpaceId: (spaceId: string) => void;
}
