import { getApiBase } from '@/config/api-config';
import { RequestWithUser } from '@/interfaces/auth.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import EneoApiService from '@/services/eneo-api.service';
import { logger } from '@/utils/logger';
import { Response } from 'express';
import { Controller, Get, HttpError, Param, Req, Res, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@UseBefore(authMiddleware)
@Controller()
export class IconController {
  private apiService = new EneoApiService();
  private basePath = `${getApiBase('eneo-sundsvall')}/icons/`;

  @Get('/icons/:id')
  @OpenAPI({
    summary: 'Get icon',
  })
  async get_icon(@Req() req: RequestWithUser, @Param('id') id: string, @Res() response: Response<Buffer>): Promise<Response<Buffer>> {
    try {
      const url = `${this.basePath}${id}/`;
      const res = await this.apiService.get<Buffer>(
        {
          url,
          responseType: 'arraybuffer',
        },
        req,
      );

      response.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

      return response.send(res.data);
    } catch (e: any) {
      logger.error('Error getting icon', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Internal server error');
    }
  }
}
