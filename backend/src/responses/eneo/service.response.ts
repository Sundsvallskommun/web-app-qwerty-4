import {
  ModelKwargs as ModelKwargsInterface,
  ResourcePermission,
  ServiceSparse as ServiceSparseInterface,
  ServiceSparseOutputFormatEnum,
} from '@/data-contracts/eneo-sundsvall/data-contracts';
import { DatesAndId, ModelKwargs } from './common';
import { IsEnum, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Type } from 'class-transformer';

export class ServiceSparse extends DatesAndId implements ServiceSparseInterface {
  @IsEnum(ServiceSparseOutputFormatEnum)
  @IsOptional()
  @IsNullable()
  output_format?: ServiceSparseOutputFormatEnum | null;
  @IsObject()
  @IsOptional()
  @IsNullable()
  json_schema?: object | null;
  @IsString()
  name: string;
  @IsString()
  prompt: string;
  @ValidateNested()
  @Type(() => ModelKwargs)
  @IsOptional()
  @IsNullable()
  completion_model_kwargs?: ModelKwargsInterface | null;
  @IsEnum(ResourcePermission, { each: true })
  @IsOptional()
  permissions?: ResourcePermission[];
  @IsString()
  user_id: string;
}
