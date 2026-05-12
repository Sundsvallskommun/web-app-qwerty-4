import { Configuration as ConfigurationInterface } from '@/data-contracts/configuration/data-contracts';
import { UserSpaceSettingsDto } from '@/dtos/user-space-settings.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { UserConfigurationService } from '@/services/user-configuration.service';
import { logger } from '@/utils/logger';
import { Response } from 'express';
import { Body, Controller, Get, HttpError, Put, Req, Res, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

const GROUP_SHARED_ASSISTANTS_BY_SPACE_KEY = 'groupSharedAssistantsBySpace';
const HIDDEN_SPACE_IDS_KEY = 'hiddenSpaceIds';

const normalizeSpaceIds = (ids: unknown): string[] => {
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

const getGroupSharedAssistantsBySpace = (configuration?: ConfigurationInterface): boolean =>
  configuration?.data?.[GROUP_SHARED_ASSISTANTS_BY_SPACE_KEY]?.[0] === 'true';

const getUserSpaceSettingsFromConfiguration = (configuration?: ConfigurationInterface): UserSpaceSettingsDto => ({
  groupSharedAssistantsBySpace: getGroupSharedAssistantsBySpace(configuration),
  hiddenSpaceIds: normalizeSpaceIds(configuration?.data?.[HIDDEN_SPACE_IDS_KEY]),
});

@UseBefore(authMiddleware)
@Controller()
export class UserSpaceSettingsController {
  private userConfigurationService = new UserConfigurationService();

  @Get('/user-settings/spaces')
  @OpenAPI({
    summary: 'Get space settings for the current user',
  })
  @ResponseSchema(UserSpaceSettingsDto)
  async getUserSpaceSettings(
    @Req() req: RequestWithUser,
    @Res() response: Response<UserSpaceSettingsDto>,
  ): Promise<Response<UserSpaceSettingsDto>> {
    try {
      const configuration = await this.userConfigurationService.getConfiguration(req.user);
      return response.send(getUserSpaceSettingsFromConfiguration(configuration));
    } catch (e: any) {
      logger.error('Error getting user space settings', e);
      throw new HttpError(e?.status ?? e?.httpCode ?? 500, e?.message ?? 'Could not get user space settings');
    }
  }

  @Put('/user-settings/spaces')
  @OpenAPI({
    summary: 'Update space settings for the current user',
  })
  @UseBefore(validationMiddleware(UserSpaceSettingsDto, 'body'))
  @ResponseSchema(UserSpaceSettingsDto)
  async updateUserSpaceSettings(
    @Req() req: RequestWithUser,
    @Body() body: UserSpaceSettingsDto,
    @Res() response: Response<UserSpaceSettingsDto>,
  ): Promise<Response<UserSpaceSettingsDto>> {
    const settings: UserSpaceSettingsDto = {
      groupSharedAssistantsBySpace: body.groupSharedAssistantsBySpace,
      hiddenSpaceIds: normalizeSpaceIds(body.hiddenSpaceIds),
    };

    try {
      await this.userConfigurationService.updateConfigurationData(req.user, {
        [GROUP_SHARED_ASSISTANTS_BY_SPACE_KEY]: [String(settings.groupSharedAssistantsBySpace)],
        [HIDDEN_SPACE_IDS_KEY]: settings.hiddenSpaceIds,
      });

      return response.send(settings);
    } catch (e: any) {
      logger.error('Error updating user space settings', e);
      throw new HttpError(e?.status ?? e?.httpCode ?? 500, e?.message ?? 'Could not update user space settings');
    }
  }
}
