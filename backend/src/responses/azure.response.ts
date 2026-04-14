//@ts-nocheck
import ApiResponse from '@/interfaces/api-service.interface';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

export class AzureTokenData {
  @IsString()
  token: string;

  @IsString()
  region: string;
}

export class ApiResponseAzureToken implements ApiResponse<AzureTokenData> {
  @ValidateNested()
  @Type(() => AzureTokenData)
  data: AzureTokenData;

  @IsString()
  message: string;
}
