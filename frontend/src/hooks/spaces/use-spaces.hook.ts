import { getPersonalSpace, getSpaces } from '@services/space.service';
import { useSnackbar } from '@sk-web-gui/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';
import { useSpaceStore } from './use-space-store.hook';
import { SpacePublic, SpaceSparse } from '@data-contracts/backend/data-contracts';

export const useSpaces = () => {
  const [data, setData] = useSpaceStore(useShallow((state) => [state.spaces, state.setSpaces]));
  const [loaded, setLoaded] = useSpaceStore(useShallow((state) => [state.loaded, state.setLoaded]));
  const [loading, setLoading] = useSpaceStore(useShallow((state) => [state.loading, state.setLoading]));

  const message = useSnackbar();
  const { t } = useTranslation();

  const resources = t('spaces:name_many');

  const refresh = () => {
    setLoading(true);
    Promise.allSettled([getSpaces(true, false).then((res) => res.data), getPersonalSpace().then((res) => res.data)])
      .then(async (res) => {
        const fulfilled = (await res).filter((item) => item.status === 'fulfilled');
        if (fulfilled.length > 0) {
          const newData: Array<SpaceSparse | SpacePublic> = [];
          for (const space of fulfilled) {
            if ('items' in space.value) {
              newData.push(...space.value.items);
            } else {
              newData.push(space.value);
            }
          }
          setData(newData);
          setLoaded(true);
        }
      })
      .catch((error) =>
        message({
          position: 'bottom',
          message: t(`crud:getmany.error.${error?.response?.status}`, { resource: resources }),
        })
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if ((!data || !loaded) && !loading) {
      refresh();
    }
  }, []);

  return { data, loaded, loading };
};
