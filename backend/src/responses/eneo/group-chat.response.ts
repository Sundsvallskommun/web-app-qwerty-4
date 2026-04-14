//@ts-nocheck
import { GroupChatSparse as GroupChatSparseInterface, ResourcePermission } from '@/data-contracts/eneo-sundsvall/data-contracts';
import { IsNullable } from '@/utils/custom-validation-classes';
import { IsBoolean, IsEnum, IsObject, IsOptional, IsString } from 'class-validator';

export class GroupChatSparse implements GroupChatSparseInterface {
  @IsEnum(ResourcePermission, { each: true })
  @IsOptional()
  permissions?: ResourcePermission[];
  @IsString()
  created_at: string;
  @IsString()
  updated_at: string;
  @IsString()
  name: string;
  @IsString()
  id: string;
  @IsString()
  user_id: string;
  @IsBoolean()
  published: boolean;
  @IsString()
  type: 'group-chat';
  @IsObject()
  @IsOptional()
  @IsNullable()
  metadata_json: object | null;
}
