'use client';

import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { useChatTarget } from '@hooks/chat-targets/use-chat-target.hook';
import { paramToString } from '@utils/param-to-string';
import { useParams } from 'next/navigation';
import { AssistantView } from '@views/assistant/assistant.view';
import { useEffect } from 'react';

const PersonalAssistant = () => {
  const { id } = useParams();

  const { data, loaded } = useChatTarget(paramToString(id));

  if (!loaded || !data) {
    return <LoaderFullScreen />;
  }

  return <AssistantView assistant={data} />;
};

export default PersonalAssistant;
