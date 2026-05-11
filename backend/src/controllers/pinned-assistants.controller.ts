import { MUNICIPALITY_ID, NAMESPACE } from '@/config';
import { getApiBase } from '@/config/api-config';
import { Configuration as ConfigurationInterface } from '@/data-contracts/configuration/data-contracts';
import { PinnedAssistantsDto } from '@/dtos/pinned-assistants.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import ApiService from '@/services/api.service';
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
  private apiService = new ApiService();
  private basePath = `${getApiBase('configuration')}/${MUNICIPALITY_ID}/${NAMESPACE}/configurations`;

  private getApplication = (req: RequestWithUser) => req.user.username.toLowerCase();

  private getConfigurationUrl = (req: RequestWithUser) => `${this.basePath}/${this.getApplication(req)}`;

  private getPinnedIdsFromConfiguration = (configuration?: ConfigurationInterface): string[] =>
    normalizePinnedAssistantIds(configuration?.data?.[PINNED_ASSISTANTS_KEY]);

  private buildConfigurationPayload = (ids: string[]): ConfigurationInterface => ({
    data: {
      [PINNED_ASSISTANTS_KEY]: normalizePinnedAssistantIds(ids),
    },
  });

  @Get('/assistants/pinned')
  @OpenAPI({
    summary: 'Get pinned assistants for the current user',
  })
  @ResponseSchema(PinnedAssistantsDto)
  async getPinnedAssistants(@Req() req: RequestWithUser, @Res() response: Response<PinnedAssistantsDto>): Promise<Response<PinnedAssistantsDto>> {
    const url = this.getConfigurationUrl(req);

    try {
      const result = await this.apiService.get<ConfigurationInterface>({ url }, req.user);
      return response.send({ ids: this.getPinnedIdsFromConfiguration(result.data) });
    } catch (e: any) {
      if (e?.status === 404 || e?.httpCode === 404) {
        return response.send({ ids: [] });
      }

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
    const url = this.getConfigurationUrl(req);
    const payload = this.buildConfigurationPayload(ids);

    try {
      await this.apiService.put<ConfigurationInterface, ConfigurationInterface>({ url, data: payload }, req.user);
      return response.send({ ids });
    } catch (e: any) {
      if (e?.status !== 404 && e?.httpCode !== 404) {
        logger.error('Error updating pinned assistants', e);
        throw new HttpError(e?.status ?? e?.httpCode ?? 500, e?.message ?? 'Could not update pinned assistants');
      }
    }

    try {
      await this.apiService.post<ConfigurationInterface, ConfigurationInterface>({ url, data: payload }, req.user);
      return response.send({ ids });
    } catch (e: any) {
      logger.error('Error creating pinned assistants configuration', e);
      throw new HttpError(e?.status ?? e?.httpCode ?? 500, e?.message ?? 'Could not update pinned assistants');
    }
  }
}
