import { ColorSchemeMode } from '@sk-web-gui/react';

export type TableProperty = string;

export interface LocalStorage {
  colorScheme: ColorSchemeMode;
  setColorScheme: (color: ColorSchemeMode) => void;
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
  groupSharedAssistantsBySpace: boolean;
  setGroupSharedAssistantsBySpace: (groupBySpace: boolean) => void;
  openSharedAssistantSpaceIds: string[];
  setOpenSharedAssistantSpaceIds: (spaceIds: string[]) => void;
  toggleOpenSharedAssistantSpaceId: (spaceId: string) => void;
}
