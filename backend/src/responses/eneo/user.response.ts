import {
  UserPublic as UserPublicInterface,
  UserSparse as UserSparseInterface,
  RolePublic as RolePublicInterface,
  Permission,
  PredefinedRolePublic as PredefinedRolePublicInterface,
  UserGroupRead as UserGroupReadInterface,
} from '@/data-contracts/eneo-sundsvall/data-contracts';
import { DatesAndId } from './common';
import { IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Type } from 'class-transformer';

class RolePublic extends DatesAndId implements RolePublicInterface {
  @IsString()
  name: string;
  @IsEnum(Permission, { each: true })
  permissions: Permission[];
}

class PredefinedRolePublic extends RolePublic implements PredefinedRolePublicInterface {}

class UserGroupRead extends DatesAndId implements UserGroupReadInterface {
  @IsString()
  name: string;
}

export class UserSparse extends DatesAndId implements UserSparseInterface {
  @IsString()
  email: string;
  @IsString()
  @IsOptional()
  @IsNullable()
  username?: string | null;
}

export class UserPublic extends UserSparse implements UserPublicInterface {
  @IsNumber()
  @IsOptional()
  quota_used?: number;
  @IsString()
  @IsOptional()
  @IsNullable()
  truncated_api_key?: string | null;
  @IsNumber()
  @IsOptional()
  @IsNullable()
  quota_limit?: number | null;
  @ValidateNested({ each: true })
  @Type(() => RolePublic)
  roles: RolePublicInterface[];
  @ValidateNested({ each: true })
  @Type(() => PredefinedRolePublic)
  predefined_roles: PredefinedRolePublicInterface[];
  @ValidateNested({ each: true })
  @Type(() => UserGroupRead)
  user_groups: UserGroupReadInterface[];
}
