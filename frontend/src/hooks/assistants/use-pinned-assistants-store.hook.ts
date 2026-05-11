import { create } from 'zustand';

interface State {
  ids: string[];
  loaded: boolean;
  loading: boolean;
  attempted: boolean;
}

interface Actions {
  setIds: (ids: string[]) => void;
  setLoaded: (loaded: boolean) => void;
  setLoading: (loading: boolean) => void;
  setAttempted: (attempted: boolean) => void;
}

const initialState: State = {
  ids: [],
  loaded: false,
  loading: false,
  attempted: false,
};

export const usePinnedAssistantsStore = create<State & Actions>((set) => ({
  ...initialState,
  setIds: (ids) => set(() => ({ ids })),
  setLoaded: (loaded) => set(() => ({ loaded })),
  setLoading: (loading) => set(() => ({ loading })),
  setAttempted: (attempted) => set(() => ({ attempted })),
}));
