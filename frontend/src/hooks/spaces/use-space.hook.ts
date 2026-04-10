import { SpacePublic } from '@data-contracts/backend/data-contracts';
import { getSpace } from '@services/space.service';
import { useSnackbar } from '@sk-web-gui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useSpace = (id: string | 'personal') => {
  const [data, setData] = useState<SpacePublic | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  const message = useSnackbar();
  const { t } = useTranslation();

  const the_resource = t('spaces:the_name_one');

  useEffect(() => {
    setLoading(true);
    setLoaded(false);
    setData(null);
    if (id) {
      getSpace(id)
        .then((res) => {
          setData(res.data);
          setLoaded(true);
        })
        .catch((error) =>
          message({
            position: 'bottom',
            message: t(`crud:getone.error.${error?.response?.status}`, { resource: the_resource }),
          })
        )
        .finally(() => setLoading(false));
    } else {
      setLoaded(false);
      setLoading(false);
      setData(null);
    }
  }, [id]);

  return { data, loaded, loading };
};
