import { getApiBase } from '@/config/api-config';
import {
  Applications as ApplicationsInterface,
  AssistantPublic as AssistantPublicInterface,
  CreateSpaceAssistantRequest as CreateSpaceAssistantRequestInterface,
  PaginatedResponseSpaceSparse as PaginatedResponseSpaceSparseInterface,
  SpacePublic as SpacePublicInterface,
} from '@/data-contracts/eneo-sundsvall/data-contracts';
import {
  Applications,
  AssistantPublic,
  CreateSpaceAssistantRequest,
  PaginatedResponseSpaceSparse,
  SpacePublic,
} from '@/data-contracts/eneo-sundsvall/data-contracts.classes';
import { RequestWithUser } from '@/interfaces/auth.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import EneoApiService from '@/services/eneo-api.service';
import { logger } from '@/utils/logger';
import { Response } from 'express';
import { Body, Controller, Get, HttpError, Param, Post, QueryParam, Req, Res, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@UseBefore(authMiddleware)
@Controller()
export class SpaceController {
  private apiService = new EneoApiService();
  private basePath = `${getApiBase('eneo-sundsvall')}/spaces/`;

  @Get('/spaces')
  @OpenAPI({
    summary: 'Get spaces',
    description: 'Get spaces available for you.',
    parameters: [{ name: 'personal', description: 'Include your personal space', in: 'query' }],
  })
  @ResponseSchema(PaginatedResponseSpaceSparse)
  async get_user_spaces(
    @Req() req: RequestWithUser,
    @QueryParam('include_personal') include_personal: boolean,
    @QueryParam('include_applications') include_applications: boolean,
    @Res() response: Response<PaginatedResponseSpaceSparseInterface>,
  ): Promise<Response<PaginatedResponseSpaceSparseInterface>> {
    try {
      const url = `${this.basePath}`;
      const params = {
        include_applications,
        include_personal,
      };
      const res = await this.apiService.get<PaginatedResponseSpaceSparseInterface>({ url, params }, req);

      return response.send(res.data);
    } catch (e: any) {
      logger.error('Error getting spaces', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not get spaces');
    }
  }

  @Get('/spaces/personal')
  @OpenAPI({
    summary: 'Get personal space',
  })
  @ResponseSchema(SpacePublic)
  async get_personal_space(@Req() req: RequestWithUser, @Res() response: Response<SpacePublicInterface>): Promise<Response<SpacePublicInterface>> {
    try {
      const url = `${this.basePath}type/personal/`;
      const res = await this.apiService.get<SpacePublicInterface>({ url }, req);

      return response.send(res.data);
    } catch (e: any) {
      logger.error('Error getting space', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Error getting personal space');
    }
  }

  @Get('/spaces/:id')
  @OpenAPI({
    summary: 'Get space',
    parameters: [{ name: 'id', description: 'Id of space', in: 'path' }],
  })
  @ResponseSchema(SpacePublic)
  async get_single_space(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Res() response: Response<SpacePublicInterface>,
  ): Promise<Response<SpacePublicInterface>> {
    try {
      const url = `${this.basePath}${id}/`;
      const res = await this.apiService.get<SpacePublicInterface>({ url }, req);

      return response.send(res.data);
    } catch (e: any) {
      logger.error('Error getting space', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not get space');
    }
  }

  @Get('/spaces/:id/applications')
  @OpenAPI({
    summary: 'Get applications for space',
    parameters: [{ name: 'id', description: 'Id of space', in: 'path' }],
  })
  @ResponseSchema(Applications)
  async get_single_space_applications(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Res() response: Response<ApplicationsInterface>,
  ): Promise<Response<ApplicationsInterface>> {
    try {
      const url = `${this.basePath}${id}/applications/`;
      const res = await this.apiService.get<ApplicationsInterface>({ url }, req);

      return response.send(res.data);
    } catch (e: any) {
      logger.error('Error getting applications from space', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not get applications');
    }
  }

  @Post('/spaces/:id/applications/assistants')
  @OpenAPI({
    summary: 'Create assistant in space',
    parameters: [{ name: 'id', description: 'Id of space', in: 'path' }],
  })
  @ResponseSchema(AssistantPublic)
  @UseBefore(validationMiddleware(CreateSpaceAssistantRequest, 'body'))
  async create_space_assistant(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() body: CreateSpaceAssistantRequest,
    @Res() response: Response<AssistantPublicInterface>,
  ): Promise<Response<AssistantPublicInterface>> {
    try {
      const url = `${this.basePath}${id}/applications/assistants/`;
      const res = await this.apiService.post<AssistantPublicInterface, CreateSpaceAssistantRequestInterface>({ url, data: body }, req);

      return response.send(res.data);
    } catch (e: any) {
      logger.error('Error saving assistant to space', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not save assistant');
    }
  }
}
