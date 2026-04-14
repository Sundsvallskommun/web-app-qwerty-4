import { getApiBase } from '@/config/api-config';
import {
  AskResponse as AskResponseInterface,
  ConversationRequest,
  CursorPaginatedResponseSessionMetadataPublic as CursorPaginatedResponseSessionMetadataPublicInterface,
  SessionFeedback as SessionFeedbackInterface,
  SessionPublic as SessionPublicInterface,
} from '@/data-contracts/eneo-sundsvall/data-contracts';
import { ConversationRequestDto } from '@/dtos/conversation.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { AskResponse } from '@/responses/eneo/query.response';
import { CursorPaginatedResponseSessionMetadataPublic, SessionFeedback, SessionPublic } from '@/responses/eneo/session.response';
import EneoApiService from '@/services/eneo-api.service';
import { logger } from '@/utils/logger';
import { Response } from 'express';
import { Body, Controller, Delete, Get, HttpError, Param, Post, QueryParam, Req, Res, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Stream } from 'stream';

@Controller()
@UseBefore(authMiddleware)
export class ConversationController {
  private apiService = new EneoApiService();
  private basePath = getApiBase('eneo-sundsvall');

  @Post('/conversations')
  @OpenAPI({
    summary: 'Chat with an assistant or group chat',
    description: `Provide either an assistant_id or a group_chat_id to start a new conversation with an assistant or group chat.\n
      Provide session_id to continue a conversation.`,
  })
  @ResponseSchema(AskResponse)
  async conversation(
    @Req() req: RequestWithUser,
    @Body() body: ConversationRequestDto,
    @Res() response: Response<AskResponseInterface | Stream>,
  ): Promise<Response<AskResponseInterface> | Stream> {
    if (!body.assistant_id && !body.group_chat_id && !body.session_id) {
      throw new HttpError(400, 'No assistant id, group chat id, or session id provided');
    }

    const url = `${this.basePath}/conversations/`;
    const responseType = body?.stream ? 'stream' : 'json';
    const data: ConversationRequest = body;
    try {
      if (responseType === 'json') {
        const res = await this.apiService.post<AskResponseInterface, ConversationRequest>({ url, data, responseType }, req);
        return response.send(res.data);
      } else {
        const res = await this.apiService.post<Stream, ConversationRequest>({ url, data, responseType }, req);
        const datastream = res.data;
        datastream.on('data', (buf: Buffer) => {
          return buf;
        });

        datastream.on('end', () => {
          return response.end();
        });
        return res.data;
      }
    } catch (e: any) {
      logger.error('Error sending question to conversation.', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Error sending question to conversation.');
    }
  }

  @Get('/conversations')
  @OpenAPI({
    summary: 'List conversations',
    description: `Gets conversations (sessions) for an assistant or group chat.\n
    Provide either an assistant_id or a group_chat_id.`,
  })
  @ResponseSchema(CursorPaginatedResponseSessionMetadataPublic)
  async get_conversations(
    @Req() req: RequestWithUser,
    @QueryParam('assistant_id') assistant_id: string,
    @QueryParam('group_chat_id') group_chat_id: string,
    @QueryParam('limit') limit: number,
    @QueryParam('cursor') cursor: string,
    @QueryParam('previous') previous: boolean,
    @Res() response: Response<CursorPaginatedResponseSessionMetadataPublicInterface>,
  ): Promise<Response<CursorPaginatedResponseSessionMetadataPublicInterface>> {
    if (!assistant_id && !group_chat_id) {
      throw new HttpError(400, 'No assistant id or group chat id provided');
    }
    if (assistant_id && group_chat_id) {
      throw new HttpError(400, 'Both assistant id and group chat id provided');
    }

    const url = `${this.basePath}/conversations/`;

    try {
      const res = await this.apiService.get<CursorPaginatedResponseSessionMetadataPublicInterface>(
        {
          url,
          params: {
            assistant_id,
            group_chat_id,
            limit,
            cursor,
            previous,
          },
        },
        req,
      );
      return response.send(res.data);
    } catch (e: any) {
      logger.error('Error getting conversations.', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not get conversations');
    }
  }

  @Get('/conversations/:session_id')
  @OpenAPI({
    summary: 'Get conversation by session id',
    description: 'Get a specific conversation (session) by its session id.',
  })
  @ResponseSchema(SessionPublic)
  async get_conversation(
    @Req() req: RequestWithUser,
    @Param('session_id') session_id: string,
    @Res() response: Response<SessionPublicInterface>,
  ): Promise<Response<SessionPublicInterface>> {
    const url = `${this.basePath}/conversations/${session_id}/`;

    try {
      const res = await this.apiService.get<SessionPublicInterface>({ url }, req);
      return response.send(res.data);
    } catch (e: any) {
      logger.error('Error getting conversation.', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not get conversation');
    }
  }

  @Delete('/conversations/:session_id')
  @OpenAPI({
    summary: 'Delete a conversation',
  })
  async delete_conversation(@Req() req: RequestWithUser, @Param('session_id') session_id: string, @Res() response: Response): Promise<Response> {
    const url = `${this.basePath}/conversations/${session_id}/`;
    try {
      await this.apiService.delete({ url }, req);
      return response.status(204).send();
    } catch (e: any) {
      logger.error('Error deleting conversation.', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not delete conversation');
    }
  }

  @Post('/conversations/:session_id/feedback')
  @OpenAPI({
    summary: 'Leave feedback for a conversation',
  })
  @ResponseSchema(SessionPublic)
  @UseBefore(validationMiddleware(SessionFeedback, 'body'))
  async give_feedback(
    @Req() req: RequestWithUser,
    @Param('session_id') session_id: string,
    @Body() body: SessionFeedback,
    @Res() response: Response<SessionPublic>,
  ): Promise<Response<SessionPublicInterface>> {
    if (!body || !body?.value) {
      throw new HttpError(400, 'Empty body');
    }
    const url = `${this.basePath}/conversations/${session_id}/feedback/`;

    try {
      const res = await this.apiService.post<SessionPublicInterface, SessionFeedbackInterface>({ url, data: body }, req);
      return response.send(res.data);
    } catch (e: any) {
      logger.error('Error leaving feedback', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not leave feedback');
    }
  }

  @Post('/conversations/:session_id/title')
  @OpenAPI({
    summary: 'Set title for a conversation',
  })
  @ResponseSchema(SessionPublic)
  async set_title(
    @Req() req: RequestWithUser,
    @Param('session_id') session_id: string,
    @Res() response: Response<SessionPublicInterface>,
  ): Promise<Response<SessionPublicInterface>> {
    const url = `${this.basePath}/conversations/${session_id}/title/`;
    try {
      const res = await this.apiService.post<SessionPublicInterface, undefined>({ url }, req);
      return response.send(res.data);
    } catch (e: any) {
      logger.error('Error setting conversation title.', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not set conversation title');
    }
  }
}
