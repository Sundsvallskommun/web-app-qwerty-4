import { AssistantSparse, SpacePublic } from '@data-contracts/backend/data-contracts';
import { useEffect, useState } from 'react';
import { useSpaces } from '../spaces/use-spaces.hook';

interface UseAssistantsOptions {
  personal?: boolean;
  shared?: boolean;
  include_default?: boolean;
}

export const useAssistants = (
  options: UseAssistantsOptions = { personal: true, shared: true, include_default: true }
) => {
  const [data, setData] = useState<AssistantSparse[]>([]);
  const { data: spaces } = useSpaces();

  useEffect(() => {
    const filteredSpaces = spaces.filter(
      (space) => space.personal === options.personal || space.personal === !options.shared
    );
    const default_assistants = filteredSpaces.reduce((defaultAssistants, space) => {
      const typedSpace = space as SpacePublic;
      if (options?.include_default && typedSpace?.default_assistant) {
        return [...defaultAssistants, typedSpace.default_assistant as unknown as AssistantSparse];
      }
      return [...defaultAssistants];
    }, [] as AssistantSparse[]);

    const assistants = filteredSpaces
      .filter((spaces) => typeof spaces.applications?.assistants.items !== 'undefined')
      .flatMap((space) => space.applications?.assistants.items) as AssistantSparse[];
    const allAssistants: AssistantSparse[] = [...default_assistants, ...assistants];
    setData(
      allAssistants.filter(
        (assistant: AssistantSparse, index) =>
          allAssistants.findIndex((ass: AssistantSparse) => ass.id === assistant.id) === index
      )
    );
  }, [spaces, options.include_default, options.personal, options.shared]);

  return { data };
};
