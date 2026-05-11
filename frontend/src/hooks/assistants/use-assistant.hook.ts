import { AssistantPublic, SpacePublic } from '@data-contracts/backend/data-contracts';
import { useSpaces } from '@hooks/spaces/use-spaces.hook';
import { getAssistant } from '@services/assistant.service';
import { useSnackbar } from '@sk-web-gui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useAssistant = (id: string) => {
  const [data, setData] = useState<AssistantPublic>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: spaces, loaded: spacesLoaded } = useSpaces();
  const message = useSnackbar();
  const { t } = useTranslation();

  const the_resource = t('assistants:the_name_one');

  useEffect(() => {
    if (id !== 'personal') {
      return;
    }

    setLoading(true);
    setLoaded(false);

    if (!spacesLoaded) {
      return;
    }

    const personalSpace = spaces.find((space) => space.personal);
    if (personalSpace && 'default_assistant' in personalSpace) {
      setData((personalSpace as SpacePublic).default_assistant as unknown as AssistantPublic);
      setLoaded(true);
    }
    setLoading(false);
  }, [id, spaces, spacesLoaded]);

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
