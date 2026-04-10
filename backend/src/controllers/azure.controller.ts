import { AZURE_REGION } from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import ApiResponse from '@/interfaces/api-service.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import { ApiResponseAzureToken } from '@/responses/azure.response';
import { getToken } from '@/services/azure.service';
import { logger } from '@/utils/logger';
import { Response } from 'express';
import { Controller, Get, Res, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

interface AzureTokenResponse {
  token: string;
  region: string;
}

@Controller()
export class AzureController {
  @UseBefore(authMiddleware)
  @Get('/azure/login')
  @OpenAPI({
    summary: 'Get auth token for Azure Speech services',
  })
  @ResponseSchema(ApiResponseAzureToken)
  async getAzureToken(@Res() res: Response<ApiResponse<AzureTokenResponse>>): Promise<Response<ApiResponse<AzureTokenResponse>>> {
    try {
      const token: string = await getToken();
      const region = AZURE_REGION;
      return res.send({ data: { token, region }, message: 'success' });
    } catch (error) {
      logger.error('Error getting Azure token', error);
      throw new HttpException(error?.status ?? error?.httpCode ?? 500, error?.message ?? 'Could not fetch Azure Speech token');
    }
  }
}
