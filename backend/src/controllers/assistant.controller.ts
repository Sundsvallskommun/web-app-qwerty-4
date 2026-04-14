import { getApiBase } from '@/config/api-config';
import {
  AssistantPublic as AssistantPublicInterface,
  CursorPaginatedResponseSessionMetadataPublic as CursorPaginatedResponseSessionMetadataPublicInterface,
  PaginatedResponseAssistantPublic as PaginatedResponseAssistantPublicInterface,
  PartialAssistantUpdatePublic,
  SessionPublic as SessionPublicInterface,
} from '@/data-contracts/eneo-sundsvall/data-contracts';
import { UpdateAssistantDto } from '@/dtos/assistant.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { AssistantPublic, PaginatedResponseAssistantPublic } from '@/responses/eneo/assistant.response';
import { CursorPaginatedResponseSessionMetadataPublic, SessionPublic } from '@/responses/eneo/session.response';
import EneoApiService from '@/services/eneo-api.service';
import { logger } from '@/utils/logger';
import { Response } from 'express';
import { Body, Controller, Delete, Get, HttpError, Param, Post, Req, Res, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@UseBefore(authMiddleware)
@Controller()
export class AssistantController {
  private apiService = new EneoApiService();
  private basePath = `${getApiBase('eneo-sundsvall')}/assistants/`;

  @Get('/assistants')
  @OpenAPI({
    summary: 'Get assitants from Eneo',
  })
  @ResponseSchema(PaginatedResponseAssistantPublic)
  async get_assistants(
    @Req() req: RequestWithUser,
    @Res() response: Response<PaginatedResponseAssistantPublicInterface>,
  ): Promise<Response<PaginatedResponseAssistantPublicInterface>> {
    const url = `${this.basePath}`;
    try {
      const res = await this.apiService.get<PaginatedResponseAssistantPublicInterface>({ url }, req);
      return response.send(res.data);
    } catch (e: any) {
      logger.error('Error getting assistants: ', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not get assistants');
    }
  }

  @Get('/assistants/:id')
  @OpenAPI({
    summary: 'Get assitant from Eneo',
  })
  @ResponseSchema(AssistantPublic)
  async get_assistant_by_id(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Res() response: Response<AssistantPublicInterface>,
  ): Promise<Response<AssistantPublicInterface>> {
    const url = `${this.basePath}${id}/`;
    try {
      const res = await this.apiService.get<AssistantPublicInterface>({ url }, req);
      return response.send(res.data);
    } catch (e: any) {
      logger.error('Error getting assistant: ', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not get assistant');
    }
  }

  @Post('/assistants/:id')
  @OpenAPI({
    summary: 'Update Eneo assistant',
  })
  @UseBefore(validationMiddleware(UpdateAssistantDto, 'body'))
  @ResponseSchema(AssistantPublic)
  async update_assistant(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() body: UpdateAssistantDto,
    @Res() response: Response<AssistantPublicInterface>,
  ): Promise<Response<AssistantPublicInterface>> {
    const url = `${this.basePath}${id}/`;
    try {
      const res = await this.apiService.post<AssistantPublicInterface, PartialAssistantUpdatePublic>({ url, data: body }, req);
      return response.send(res.data);
    } catch (e: any) {
      logger.error('Error updating assistant: ', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not update assistant');
    }
  }

  @Delete('/assistants/:id')
  @OpenAPI({
    summary: 'Delete Eneo assistant',
  })
  async delete_assistant(@Req() req: RequestWithUser, @Param('id') id: string, @Res() response: Response): Promise<Response> {
    const url = `${this.basePath}${id}/`;
    try {
      await this.apiService.delete<AssistantPublic>({ url }, req);
      return response.send();
    } catch (e: any) {
      logger.error('Error deleting assistant: ', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not delete assistant');
    }
  }

  @Get('/assistants/:id/sessions')
  @OpenAPI({
    summary: 'Get sessions from Eneo assistant',
  })
  @ResponseSchema(CursorPaginatedResponseSessionMetadataPublic)
  async get_assistant_sessions(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Res() response: Response<CursorPaginatedResponseSessionMetadataPublicInterface>,
  ): Promise<Response<CursorPaginatedResponseSessionMetadataPublicInterface>> {
    const url = `${this.basePath}${id}/sessions/`;
    try {
      const res = await this.apiService.get<CursorPaginatedResponseSessionMetadataPublicInterface>({ url }, req);
      return response.send(res.data);
    } catch (e: any) {
      logger.error('Error getting assistant sessions: ', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not get assistant sessions');
    }
  }

  @Get('/assistants/:id/sessions/:session_id')
  @OpenAPI({
    summary: 'Get session from Eneo assistant',
  })
  @ResponseSchema(SessionPublic)
  async get_assistant_session(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Param('session_id') session_id: string,
    @Res() response: Response<SessionPublicInterface>,
  ): Promise<Response<SessionPublicInterface>> {
    const url = `${this.basePath}${id}/sessions/${session_id}/`;

    try {
      const res = await this.apiService.get<SessionPublicInterface>({ url }, req);
      return response.send(res.data);
    } catch (e: any) {
      logger.error('Error getting session: ', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not get session');
    }
  }
}
