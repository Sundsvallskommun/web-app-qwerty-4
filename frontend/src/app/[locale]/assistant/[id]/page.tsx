'use client';

import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { useChatTarget } from '@hooks/chat-targets/use-chat-target.hook';
import { paramToString } from '@utils/param-to-string';
import { useParams } from 'next/navigation';
import { AssistantView } from '@views/assistant/assistant.view';

const PersonalAssistant = () => {
  const { id } = useParams();

  const { data, loaded } = useChatTarget(paramToString(id));

  if (!data && !loaded) {
    return <LoaderFullScreen />;
  }

  if (!data) {
    return <LoaderFullScreen />;
  }

  return <AssistantView assistant={data} />;
};

export default PersonalAssistant;
