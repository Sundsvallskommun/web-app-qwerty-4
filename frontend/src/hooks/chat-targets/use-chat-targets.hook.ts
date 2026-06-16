import { AssistantSparse, SpacePublic } from '@data-contracts/backend/data-contracts';
import { useSpaces } from '@hooks/spaces/use-spaces.hook';
import type { ChatTargetSparse } from '../../types/chat-target';
import { useEffect, useState } from 'react';
import { toChatTargetSparse } from '@utils/chat-target';

interface UseChatTargetsOptions {
  personal?: boolean;
  shared?: boolean;
  org?: boolean;
  include_default?: boolean;
}

export const useChatTargets = (
  options: UseChatTargetsOptions = { personal: true, shared: true, org: false, include_default: true }
) => {
  const [data, setData] = useState<ChatTargetSparse[]>([]);
  const { data: spaces } = useSpaces();

  useEffect(() => {
    const filteredSpaces = spaces.filter(
      (space) =>
        (options.personal === true && space.personal === options.personal) ||
        (options.org === true && space.organization === options.org) ||
        (options.shared === true && space.personal === false && space.organization === false)
    );
    const defaultTargets = filteredSpaces.reduce((defaults, space) => {
      const typedSpace = space as SpacePublic;

      if (options.include_default && typedSpace.default_assistant) {
        return [
          ...defaults,
          toChatTargetSparse(typedSpace.default_assistant as unknown as AssistantSparse, { isPersonal: true }),
        ];
      }

      return defaults;
    }, [] as ChatTargetSparse[]);

    const targets = filteredSpaces.flatMap((space) => {
      const assistants = (space.applications?.assistants.items ?? []).map((assistant) => toChatTargetSparse(assistant));
      const groupChats = (space.applications?.group_chats.items ?? []).map((groupChat) =>
        toChatTargetSparse(groupChat)
      );

      return [...assistants, ...groupChats];
    });

    const allTargets = [...defaultTargets, ...targets];
    setData(
      allTargets.filter((target, index) => allTargets.findIndex((candidate) => candidate.id === target.id) === index)
    );
  }, [options.include_default, options.personal, options.shared, options.org, spaces]);

  return { data };
};
