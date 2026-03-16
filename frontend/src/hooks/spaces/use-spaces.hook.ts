import { getSpaces } from '@services/space.service';
import { useSnackbar } from '@sk-web-gui/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';
import { useSpaceStore } from './use-space-store.hook';

export const useSpaces = () => {
  const [data, setData] = useSpaceStore(useShallow((state) => [state.spaces, state.setSpaces]));
  const [loaded, setLoaded] = useSpaceStore(useShallow((state) => [state.loaded, state.setLoaded]));
  const [loading, setLoading] = useSpaceStore(useShallow((state) => [state.loading, state.setLoading]));

  const message = useSnackbar();
  const { t } = useTranslation();

  const resources = t('spaces:name_many');

  const refresh = () => {
    setLoading(true);
    getSpaces(true, true)
      .then((res) => {
        setData(res.data.items);
        setLoaded(true);
      })
      .catch((error) =>
        message({ message: t(`crud:getmany.error.${error?.response?.status}`, { resource: resources }) })
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!data || !loaded) {
      refresh();
    }
  }, []);

  return { data, loaded, loading };
};
