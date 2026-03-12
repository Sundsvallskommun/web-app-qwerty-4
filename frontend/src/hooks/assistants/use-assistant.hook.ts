import { AssistantPublic } from '@data-contracts/backend/data-contracts';
import { getAssistant } from '@services/assistant.service';
import { useSnackbar } from '@sk-web-gui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useAssistant = (id: string) => {
  const [data, setData] = useState<AssistantPublic>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const message = useSnackbar();
  const { t } = useTranslation();

  const the_resource = t('assistants:the_name_one');

  useEffect(() => {
    setLoading(true);
    setLoaded(false);
    getAssistant(id)
      .then((res) => {
        setData(res);
        setLoaded(true);
      })
      .catch((error) =>
        message({ message: t(`crud:getone.error.${error?.response?.status}`, { resource: the_resource }) })
      )
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loaded, loading };
};
