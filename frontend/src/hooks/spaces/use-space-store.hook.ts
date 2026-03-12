import { SpacePublic, SpaceSparse } from '@data-contracts/backend/data-contracts';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Data {
  spaces: Array<SpaceSparse | SpacePublic>;
  loaded: boolean;
  loading: boolean;
}

interface Actions {
  setSpaces: (spaces: Array<SpaceSparse | SpacePublic>) => void;
  setLoaded: (loaded: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const useSpaceStore = create(
  persist<Data & Actions>(
    (set) => ({
      spaces: [],
      loaded: false,
      loading: false,
      setSpaces: (spaces) => set(() => ({ spaces })),
      setLoaded: (loaded) => set(() => ({ loaded })),
      setLoading: (loading) => set(() => ({ loading })),
    }),
    {
      name: 'spaces',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
