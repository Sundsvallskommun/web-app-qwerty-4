import { SpacePublic, SpaceSparse } from '@data-contracts/backend/data-contracts';
import { useSnackbar } from '@sk-web-gui/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';
import { bootstrapSpaces } from './space-loading.service';
import { useSpaceStore } from './use-space-store.hook';

export const useSpaces = () => {
  const [data, loading, attempted, bootstrapLoaded, personalLoaded, sharedSpacesLoaded, hydrating] = useSpaceStore(
    useShallow((state) => [
      state.spaces,
      state.loading,
      state.attempted,
      state.bootstrapLoaded,
      state.personalLoaded,
      state.sharedSpacesLoaded,
      state.hydrating,
    ])
  );

  const message = useSnackbar();
  const { t } = useTranslation();

  const resources = t('spaces:name_many');

  const refresh = () =>
    bootstrapSpaces().then((result) => {
      if (!result.personalLoaded && !result.sharedSpacesLoaded) {
        message({
          position: 'bottom',
          message: t('crud:getmany.error.500', { resource: resources }),
        });
      }

      return result;
    });

  useEffect(() => {
    if (!attempted && !loading && !bootstrapLoaded) {
      void refresh();
    }
  }, [attempted, bootstrapLoaded, loading]);

  return {
    data: data as Array<SpaceSparse | SpacePublic>,
    loaded: bootstrapLoaded,
    bootstrapLoaded,
    personalLoaded,
    sharedSpacesLoaded,
    hydrating,
    loading,
    refresh,
  };
};
