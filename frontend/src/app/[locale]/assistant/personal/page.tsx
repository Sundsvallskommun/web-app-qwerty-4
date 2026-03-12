'use client';

import { AssistantView } from 'src/views/assistant/assistant.view';
import { AssistantPublic } from '@data-contracts/backend/data-contracts';
import { getSpace } from '@services/space.service';
import { useEffect, useState } from 'react';

const PersonalAssistant = () => {
  const [assistant, setAssistant] = useState<AssistantPublic | null>(null);

  useEffect(() => {
    getSpace('personal')
      .then((res) => {
        if (res.data.default_assistant) {
          setAssistant(res.data.default_assistant);
        }
      })
      .catch(() => {});
  }, []);
  return assistant && <AssistantView assistant={assistant} />;
};

export default PersonalAssistant;
