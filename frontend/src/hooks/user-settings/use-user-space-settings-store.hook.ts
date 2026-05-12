import { UserSpaceSettingsDto } from '@data-contracts/backend/data-contracts';
import { create } from 'zustand';

interface State {
  settings: UserSpaceSettingsDto;
  loaded: boolean;
  loading: boolean;
  attempted: boolean;
}

interface Actions {
  setSettings: (settings: UserSpaceSettingsDto) => void;
  setLoaded: (loaded: boolean) => void;
  setLoading: (loading: boolean) => void;
  setAttempted: (attempted: boolean) => void;
}

const initialState: State = {
  settings: {
    groupSharedAssistantsBySpace: false,
    hiddenSpaceIds: [],
  },
  loaded: false,
  loading: false,
  attempted: false,
};

export const useUserSpaceSettingsStore = create<State & Actions>((set) => ({
  ...initialState,
  setSettings: (settings) => set(() => ({ settings })),
  setLoaded: (loaded) => set(() => ({ loaded })),
  setLoading: (loading) => set(() => ({ loading })),
  setAttempted: (attempted) => set(() => ({ attempted })),
}));
