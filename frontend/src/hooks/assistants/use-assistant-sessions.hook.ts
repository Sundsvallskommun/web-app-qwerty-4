import { SessionMetadataPublic } from '@data-contracts/backend/data-contracts';
import { getAssistantSessions } from '@services/assistant.service';
import { useSnackbar } from '@sk-web-gui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useAssistantSessions = (assistantId?: string) => {
  const [data, setData] = useState<SessionMetadataPublic[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const message = useSnackbar();
  const { t } = useTranslation();

  useEffect(() => {
    if (!assistantId) {
      setData([]);
      setLoaded(false);
      setLoading(false);
      return;
    }

    let cancelled = false;

    setLoading(true);
    setLoaded(false);

    getAssistantSessions(assistantId)
      .then((res) => {
        if (cancelled) return;
        setData(res.items ?? []);
        setLoaded(true);
      })
      .catch((error) => {
        if (cancelled) return;
        setData([]);
        message({ message: t(`crud:getmany.error.${error?.response?.status}`, { resource: 'sessioner' }) });
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [assistantId, message, t]);

  return { data, loaded, loading };
};
