import { AppSparse as AppSparseInterface, ResourcePermission } from '@/data-contracts/eneo-sundsvall/data-contracts';
import { DatesAndId } from './common';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { IsNullable } from '@/utils/custom-validation-classes';

export class AppSparse extends DatesAndId implements AppSparseInterface {
  @IsEnum(ResourcePermission, { each: true })
  @IsOptional()
  permissions?: ResourcePermission[];
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  @IsNullable()
  description?: string | null;
  @IsBoolean()
  published: boolean;
  @IsString()
  user_id: string;
}
