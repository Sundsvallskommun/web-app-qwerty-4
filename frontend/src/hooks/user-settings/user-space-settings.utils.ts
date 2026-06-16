import { UserSpaceSettingsDto } from '@data-contracts/backend/data-contracts';

export const normalizeUserSpaceSettingIds = (ids: unknown): string[] => {
  if (!Array.isArray(ids)) {
    return [];
  }

  const uniqueIds = new Set<string>();

  ids.forEach((id) => {
    if (typeof id !== 'string') {
      return;
    }

    const normalizedId = id.trim();
    if (!normalizedId) {
      return;
    }

    uniqueIds.add(normalizedId);
  });

  return [...uniqueIds];
};

export const normalizeUserSpaceSettings = (settings?: Partial<UserSpaceSettingsDto>): UserSpaceSettingsDto => ({
  groupSharedAssistantsBySpace: Boolean(settings?.groupSharedAssistantsBySpace),
  hiddenSpaceIds: normalizeUserSpaceSettingIds(settings?.hiddenSpaceIds),
});
