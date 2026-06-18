import {
  AssistantPublic,
  AssistantSparse,
  GroupChatAssistantPublic,
  GroupChatPublic,
  GroupChatSparse,
} from '@data-contracts/backend/data-contracts';
import { AssistantInfo } from '@sk-web-gui/ai';
import { ChatTarget, ChatTargetAssistantIdentityMap, ChatTargetIdentity, ChatTargetSparse } from '../types/chat-target.type';
import { iconUrl } from './icon-url';

export const isAssistantTarget = (
  target: ChatTarget | ChatTargetSparse | AssistantPublic | AssistantSparse | GroupChatPublic | GroupChatSparse
): target is ChatTarget | ChatTargetSparse | AssistantPublic | AssistantSparse => {
  return !isGroupChatTarget(target);
};

export const isGroupChatTarget = (
  target: ChatTarget | ChatTargetSparse | AssistantPublic | AssistantSparse | GroupChatPublic | GroupChatSparse
): target is GroupChatPublic | GroupChatSparse | ChatTarget | ChatTargetSparse => {
  return (
    'show_response_label' in target ||
    target.type === 'group_chat' ||
    target.type === 'group-chat' ||
    ('targetType' in target && target.targetType === 'group_chat')
  );
};

export const getChatTargetType = (target: AssistantPublic | AssistantSparse | GroupChatPublic | GroupChatSparse) =>
  isGroupChatTarget(target) ? 'group_chat' : 'assistant';

export const toChatTargetSparse = (
  target: AssistantSparse | GroupChatSparse,
  overrides?: Partial<Pick<ChatTargetSparse, 'isPersonal'>>
): ChatTargetSparse => ({
  ...target,
  targetType: getChatTargetType(target),
  isPersonal: overrides?.isPersonal,
});

export const toChatTarget = (
  target: AssistantPublic | GroupChatPublic,
  overrides?: Partial<Pick<ChatTarget, 'isPersonal'>>
): ChatTarget => ({
  ...target,
  targetType: getChatTargetType(target),
  isPersonal: overrides?.isPersonal,
});

export const getChatTargetAvatar = (
  target?: ChatTarget | ChatTargetSparse | AssistantPublic | AssistantSparse | GroupChatPublic | GroupChatSparse,
  personal?: boolean
): string | undefined => {
  return personal ? `${process.env.NEXT_PUBLIC_BASE_PATH}/qwerty2.png` : iconUrl(target?.icon_id ?? undefined);
};

export const getChatTargetIdentity = (
  target?: Pick<ChatTarget | ChatTargetSparse, 'id' | 'name'> & { icon_id?: string | null; isPersonal?: boolean }
): ChatTargetIdentity | undefined => {
  if (!target) {
    return undefined;
  }

  return {
    id: target.id,
    name: target.name,
    avatar: target.isPersonal ? `${process.env.NEXT_PUBLIC_BASE_PATH}/qwerty2.png` : iconUrl(target.icon_id ?? undefined),
  };
};

export const toAssistantInfo = (target: ChatTarget): AssistantInfo => ({
  name: target.name,
  id: target.id,
  shortName: target.name.charAt(0),
  avatar: getChatTargetAvatar(target, target.isPersonal),
});

export const getToolAssistantIdentityMap = (
  target?: ChatTarget,
  assistants: Array<{ id: string; icon_id?: string | null }> = []
): ChatTargetAssistantIdentityMap => {
  if (!target) {
    return {};
  }

  return (target.tools?.assistants ?? []).reduce(
    (map, assistant: GroupChatAssistantPublic) => {
      const matchingAssistant = assistants.find((candidate) => candidate.id === assistant.id);

      return {
        ...map,
        [assistant.id]: {
          id: assistant.id,
          name: assistant.handle,
          avatar: matchingAssistant ? iconUrl(matchingAssistant.icon_id ?? undefined) : undefined,
        },
      };
    },
    {}
  );
};

export const getGroupChatAssistantIdentityMap = (
  target?: ChatTarget,
  assistants: Array<{ id: string; icon_id?: string | null }> = []
): ChatTargetAssistantIdentityMap => {
  if (!target || !isGroupChatTarget(target)) {
    return {};
  }

  return getToolAssistantIdentityMap(target, assistants);
};
