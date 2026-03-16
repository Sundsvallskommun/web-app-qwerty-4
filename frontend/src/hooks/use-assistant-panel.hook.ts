import { create } from 'zustand';

interface AssistantPanelState {
  isAssistantPanelOpen: boolean;
  openAssistantPanel: () => void;
  closeAssistantPanel: () => void;
}

export const useAssistantPanel = create<AssistantPanelState>((set) => ({
  isAssistantPanelOpen: false,
  openAssistantPanel: () => set({ isAssistantPanelOpen: true }),
  closeAssistantPanel: () => set({ isAssistantPanelOpen: false }),
}));
