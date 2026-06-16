import { getApiBase } from '@/config/api-config';
import { GroupChatPublic as GroupChatPublicInterface } from '@/data-contracts/eneo-sundsvall/data-contracts';
import { GroupChatPublic } from '@/data-contracts/eneo-sundsvall/data-contracts.classes';
import { RequestWithUser } from '@/interfaces/auth.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import EneoApiService from '@/services/eneo-api.service';
import { logger } from '@/utils/logger';
import { Response } from 'express';
import { Controller, Get, HttpError, Param, Req, Res, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@UseBefore(authMiddleware)
@Controller()
export class GroupChatController {
  private apiService = new EneoApiService();
  private basePath = `${getApiBase('eneo-sundsvall')}/group-chats/`;

  @Get('/group-chats/:id')
  @OpenAPI({
    summary: 'Get group chat from Eneo',
  })
  @ResponseSchema(GroupChatPublic)
  async get_group_chat_by_id(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Res() response: Response<GroupChatPublicInterface>,
  ): Promise<Response<GroupChatPublicInterface>> {
    const url = `${this.basePath}${id}/`;

    try {
      const res = await this.apiService.get<GroupChatPublicInterface>({ url }, req);
      return response.send(res.data);
    } catch (e: any) {
      logger.error('Error getting group chat: ', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not get group chat');
    }
  }
}
