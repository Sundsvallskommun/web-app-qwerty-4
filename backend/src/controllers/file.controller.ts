import { getApiBase } from '@/config/api-config';
import {
  FilePublic as FilePublicInterface,
  PaginatedResponseFilePublic as PaginatedResponseFilePublicInterface,
} from '@/data-contracts/eneo-sundsvall/data-contracts';
import { UploadFileDto } from '@/dtos/file.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import { FilePublic, PaginatedResponseFilePublic } from '@/responses/eneo/file.response';
import EneoApiService from '@/services/eneo-api.service';
import { fileUploadOptions } from '@/utils/fileUploadOptions';
import { formDataFromMulterFiles } from '@/utils/formDataFromMulterFile';
import { logger } from '@/utils/logger';
import { Response } from 'express';
import { Body, Controller, Delete, Get, HttpError, Param, Post, Req, Res, UploadedFile, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@UseBefore(authMiddleware)
@Controller()
export class FileController {
  private apiService = new EneoApiService();
  private basePath = `${getApiBase('eneo-sundsvall')}/files/`;

  @Get('/files')
  @OpenAPI({
    summary: 'Get files',
  })
  @ResponseSchema(PaginatedResponseFilePublic)
  async get_files(
    @Req() req: RequestWithUser,
    @Res() response: Response<PaginatedResponseFilePublicInterface>,
  ): Promise<Response<PaginatedResponseFilePublicInterface>> {
    try {
      const url = `${this.basePath}`;
      const res = await this.apiService.get<PaginatedResponseFilePublicInterface>(
        {
          url,
        },
        req,
      );
      return response.send(res.data);
    } catch (e) {
      logger.error('Error getting files', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Internal server error');
    }
  }

  @Get('/files/:id')
  @OpenAPI({
    summary: 'Get file',
  })
  @ResponseSchema(FilePublic)
  async get_file(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Res() response: Response<FilePublicInterface>,
  ): Promise<Response<FilePublicInterface>> {
    try {
      const url = `${this.basePath}${id}`;
      const res = await this.apiService.get<FilePublicInterface>({ url }, req);
      return response.send(res.data);
    } catch (e) {
      logger.error('Error getting file', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Internal server error');
    }
  }

  @Post('/files')
  @OpenAPI({
    summary: 'Upload file',
  })
  @ResponseSchema(FilePublic)
  async upload_file(
    @Req() req: RequestWithUser,
    @Body() _body: UploadFileDto,
    @UploadedFile('upload_file', { options: fileUploadOptions, required: true }) file: Express.Multer.File,
    @Res() response: Response<FilePublicInterface>,
  ): Promise<Response<FilePublicInterface>> {
    const data = formDataFromMulterFiles([file], 'upload_file');

    try {
      const url = `${this.basePath}`;
      const res = await this.apiService.post<FilePublicInterface, any>(
        { url, data, headers: { Accept: 'multipart/form-data', 'Content-Type': 'multipart/form-data' } },
        req,
      );
      return response.send(res.data);
    } catch (e) {
      logger.error('Error uploading file', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Internal server error');
    }
  }

  @Delete('/files/:id')
  @OpenAPI({
    summary: 'Delete file',
  })
  async delete_file(@Req() req: RequestWithUser, @Param('id') id: string, @Res() response: Response): Promise<Response> {
    try {
      const url = `${this.basePath}${id}/`;
      const res = await this.apiService.delete({ url }, req);
      if (res) {
        return response.send();
      }
    } catch (e) {
      logger.error('Error deleting file', e);
      throw new HttpError(e?.code ?? 500, e?.message ?? 'Internal server error');
    }
  }
}
