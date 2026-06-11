import { AssistantPublic, SpacePublic } from '@data-contracts/backend/data-contracts';
import { useSpaces } from '@hooks/spaces/use-spaces.hook';
import { getAssistant } from '@services/assistant.service';
import { getPersonalSpace } from '@services/space.service';
import { useSnackbar } from '@sk-web-gui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useAssistant = (id: string) => {
  const [data, setData] = useState<AssistantPublic>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: spaces, personalLoaded } = useSpaces();
  const message = useSnackbar();
  const { t } = useTranslation();

  const the_resource = t('assistants:the_name_one');

  useEffect(() => {
    if (id !== 'personal') {
      return;
    }

    setLoading(true);
    setLoaded(false);

    if (!personalLoaded) {
      return;
    }

    const personalSpace = spaces.find((space) => space.personal);
    const personalAssistant = (personalSpace as SpacePublic | undefined)?.default_assistant as AssistantPublic | undefined;

    if (personalAssistant) {
      setData(personalAssistant);
      setLoaded(true);
      setLoading(false);
      return;
    }

    getPersonalSpace()
      .then((res) => {
        const fallbackAssistant = res.data?.default_assistant as AssistantPublic | undefined;
        if (fallbackAssistant) {
          setData(fallbackAssistant);
          setLoaded(true);
        }
      })
      .finally(() => setLoading(false));
  }, [id, personalLoaded, spaces]);

  useEffect(() => {
    if (id === 'personal') {
      return;
    }

    setLoading(true);
    setLoaded(false);

    getAssistant(id)
      .then((res) => {
        setData(res);
        setLoaded(true);
      })
      .catch((error) =>
        message({
          position: 'bottom',
          message: t(`crud:getone.error.${error?.response?.status}`, { resource: the_resource }),
        })
      )
      .finally(() => setLoading(false));
  }, [id, message, t, the_resource]);

  return { data, loaded, loading };
};
