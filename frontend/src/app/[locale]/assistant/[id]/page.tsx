'use client';

import { useAssistant } from '@hooks/assistants/use-assistant.hook';
import { paramToString } from '@utils/param-to-string';
import { useParams } from 'next/navigation';
import { AssistantView } from 'src/views/assistant/assistant.view';

const PersonalAssistant = () => {
  const { id } = useParams();

  const { data, loaded } = useAssistant(paramToString(id));

  return loaded && data && <AssistantView assistant={data} />;
};

export default PersonalAssistant;
