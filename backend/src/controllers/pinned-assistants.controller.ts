import { Configuration as ConfigurationInterface } from '@/data-contracts/configuration/data-contracts';
import { PinnedAssistantsDto } from '@/dtos/pinned-assistants.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { UserConfigurationService } from '@/services/user-configuration.service';
import { logger } from '@/utils/logger';
import { Response } from 'express';
import { Body, Controller, Get, HttpError, Put, Req, Res, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

const PINNED_ASSISTANTS_KEY = 'pinnedAssistantIds';

const normalizePinnedAssistantIds = (ids: unknown): string[] => {
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

@UseBefore(authMiddleware)
@Controller()
export class PinnedAssistantsController {
  private userConfigurationService = new UserConfigurationService();

  private getPinnedIdsFromConfiguration = (configuration?: ConfigurationInterface): string[] =>
    normalizePinnedAssistantIds(configuration?.data?.[PINNED_ASSISTANTS_KEY]);

  @Get('/assistants/pinned')
  @OpenAPI({
    summary: 'Get pinned assistants for the current user',
  })
  @ResponseSchema(PinnedAssistantsDto)
  async getPinnedAssistants(@Req() req: RequestWithUser, @Res() response: Response<PinnedAssistantsDto>): Promise<Response<PinnedAssistantsDto>> {
    try {
      const configuration = await this.userConfigurationService.getConfiguration(req.user);
      return response.send({ ids: this.getPinnedIdsFromConfiguration(configuration) });
    } catch (e: any) {
      logger.error('Error getting pinned assistants', e);
      throw new HttpError(e?.status ?? e?.httpCode ?? 500, e?.message ?? 'Could not get pinned assistants');
    }
  }

  @Put('/assistants/pinned')
  @OpenAPI({
    summary: 'Update pinned assistants for the current user',
  })
  @UseBefore(validationMiddleware(PinnedAssistantsDto, 'body'))
  @ResponseSchema(PinnedAssistantsDto)
  async updatePinnedAssistants(
    @Req() req: RequestWithUser,
    @Body() body: PinnedAssistantsDto,
    @Res() response: Response<PinnedAssistantsDto>,
  ): Promise<Response<PinnedAssistantsDto>> {
    const ids = normalizePinnedAssistantIds(body?.ids);

    try {
      await this.userConfigurationService.updateConfigurationData(req.user, {
        [PINNED_ASSISTANTS_KEY]: ids,
      });
      return response.send({ ids });
    } catch (e: any) {
      logger.error('Error updating pinned assistants', e);
      throw new HttpError(e?.status ?? e?.httpCode ?? 500, e?.message ?? 'Could not update pinned assistants');
    }
  }
}
