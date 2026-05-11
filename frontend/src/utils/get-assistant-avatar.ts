import { AssistantPublic, AssistantSparse } from '@data-contracts/backend/data-contracts';
import { iconUrl } from './icon-url';

export const getAssistantAvatar = (
  assistant?: AssistantPublic | AssistantSparse,
  personal?: boolean
): string | undefined => {
  return personal ? `${process.env.NEXT_PUBLIC_BASE_PATH}/qwerty2.png` : iconUrl(assistant?.icon_id ?? undefined);
};
