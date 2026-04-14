'use client';

import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { useAssistant } from '@hooks/assistants/use-assistant.hook';
import { paramToString } from '@utils/param-to-string';
import { useParams } from 'next/navigation';
import { AssistantView } from 'src/views/assistant/assistant.view';

const PersonalAssistant = () => {
  const { id, sessionId } = useParams();

  const { data, loaded } = useAssistant(paramToString(id));

  if (!loaded || !data) {
    return <LoaderFullScreen />;
  }

  return <AssistantView assistant={data} sessionId={paramToString(sessionId)} />;
};

export default PersonalAssistant;
