//@ts-nocheck
import {
  SpaceSparse as SpaceSparseInterface,
  PaginatedResponseSpaceSparse as PaginatedResponseSpaceSparseInterface,
  ResourcePermission,
  SpacePublic as SpacePublicInterface,
  PaginatedPermissionsAssistantSparse as PaginatedPermissionsAssistantSparseInterface,
  AssistantSparse as AssistantSparseInterface,
  Applications as ApplicationsInterface,
  PaginatedPermissionsGroupChatSparse as PaginatedPermissionsGroupChatSparseInterface,
  GroupChatSparse as GroupChatSparseInterface,
  PaginatedPermissionsServiceSparse as PaginatedPermissionsServiceSparseInterface,
  ServiceSparse as ServiceSparseInterface,
  PaginatedPermissionsAppSparse as PaginatedPermissionsAppSparseInterface,
  AppSparse as AppSparseInterface,
  Knowledge as KnowledgeInterface,
  SpaceMember as SpaceMemberInterface,
  EmbeddingModelPublic as EmbeddingModelPublicInterface,
  CompletionModelPublic as CompletionModelPublicInterface,
  TranscriptionModelPublic as TranscriptionModelPublicInterface,
  SpaceRoleValue,
  PaginatedPermissionsSpaceMember as PaginatedPermissionsSpaceMemberInterface,
  DefaultAssistant as DefaultAssistantInterface,
  SpaceRole as SpaceRoleInterface,
  SpaceGroupMember as SpaceGroupMemberInterface,
  PaginatedPermissionsSpaceGroupMember as PaginatedPermissionsSpaceGroupMemberInterface,
} from '@/data-contracts/eneo-sundsvall/data-contracts';
import { IsBoolean, IsDateString, IsEnum, IsIn, IsInt, IsOptional, IsString, Validate, ValidateNested } from 'class-validator';
import {
  DatesAndId,
  PaginatedDefaults,
  PaginatedPermissionsDefaults,
  SecurityClassificationPublic,
  SecurityClassificationPublicInterface,
} from './common';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Type } from 'class-transformer';
import { AssistantPublic, AssistantSparse, DefaultAssistant } from './assistant.response';
import { GroupChatSparse } from './group-chat.response';
import { ServiceSparse } from './service.response';
import { AppSparse } from './app.response';
import { Knowledge } from './knowledge.response';
import { CompletionModelPublic, EmbeddingModelPublic, TranscriptionModelPublic } from './models.response';

class SpaceGroupMember extends DatesAndId implements SpaceGroupMemberInterface {
  @IsString()
  name: string;
  @IsEnum(SpaceRoleValue)
  role: SpaceRoleValue;
  @IsInt()
  @IsOptional()
  user_count?: number;
}

class PaginatedPermissionsSpaceGroupMember implements PaginatedPermissionsSpaceGroupMemberInterface {
  @IsEnum(ResourcePermission, { each: true })
  @IsOptional()
  permissions?: ResourcePermission[];
  @ValidateNested({ each: true })
  @Type(() => SpaceGroupMember)
  items: SpaceGroupMemberInterface[];
  @IsInt()
  count: number;
}

class SpaceSparse extends DatesAndId implements SpaceSparseInterface {
  @IsEnum(ResourcePermission, { each: true })
  @IsOptional()
  permissions?: ResourcePermission[];
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  @IsNullable()
  description: string;
  @IsBoolean()
  personal: boolean;
  @IsBoolean()
  @IsOptional()
  organization: boolean;
  @IsOptional()
  @ValidateNested()
  @Type(() => Applications)
  applications?: ApplicationsInterface;
}

class PaginatedPermissionsAssistantSparse extends PaginatedPermissionsDefaults implements PaginatedPermissionsAssistantSparseInterface {
  @ValidateNested({ each: true })
  @Type(() => AssistantSparse)
  items: AssistantSparseInterface[];
}

class PaginatedPermissionsGroupChatSparse extends PaginatedPermissionsDefaults implements PaginatedPermissionsGroupChatSparseInterface {
  @ValidateNested({ each: true })
  @Type(() => GroupChatSparse)
  items: GroupChatSparseInterface[];
}

class PaginatedPermissionsServiceSparse extends PaginatedPermissionsDefaults implements PaginatedPermissionsServiceSparseInterface {
  @ValidateNested({ each: true })
  @Type(() => ServiceSparse)
  items: ServiceSparseInterface[];
}

class PaginatedPermissionsAppSparse extends PaginatedPermissionsDefaults implements PaginatedPermissionsAppSparseInterface {
  @ValidateNested({ each: true })
  @Type(() => AppSparse)
  items: AppSparseInterface[];
}

export class Applications implements ApplicationsInterface {
  @ValidateNested()
  @Type(() => PaginatedPermissionsAssistantSparse)
  assistants: PaginatedPermissionsAssistantSparseInterface;
  @ValidateNested()
  @Type(() => PaginatedPermissionsGroupChatSparse)
  group_chats: PaginatedPermissionsGroupChatSparseInterface;
  @ValidateNested()
  @Type(() => PaginatedPermissionsServiceSparse)
  services: PaginatedPermissionsServiceSparseInterface;
  @ValidateNested()
  @Type(() => PaginatedPermissionsAppSparse)
  apps: PaginatedPermissionsAppSparseInterface;
}

class SpaceMember extends DatesAndId implements SpaceMemberInterface {
  @IsString()
  email: string;
  @IsString()
  @IsOptional()
  @IsNullable()
  username?: string | null;
  @IsEnum(SpaceRoleValue)
  role: SpaceRoleValue;
}

class PaginatedPermissionsSpaceMember extends PaginatedPermissionsDefaults implements PaginatedPermissionsSpaceMemberInterface {
  @ValidateNested({ each: true })
  @Type(() => SpaceMember)
  items: SpaceMemberInterface[];
}

class SpaceRole implements SpaceRoleInterface {
  @IsEnum(SpaceRoleValue)
  value: SpaceRoleValue;
  @IsString()
  label: string;
}

export class SpacePublic extends SpaceSparse implements SpacePublicInterface {
  @ValidateNested()
  @Type(() => Applications)
  applications: ApplicationsInterface;
  @ValidateNested({ each: true })
  @Type(() => EmbeddingModelPublic)
  embedding_models: EmbeddingModelPublicInterface[];
  @ValidateNested({ each: true })
  @Type(() => CompletionModelPublic)
  completion_models: CompletionModelPublicInterface[];
  @ValidateNested({ each: true })
  @Type(() => TranscriptionModelPublic)
  transcription_models: TranscriptionModelPublicInterface[];
  @ValidateNested()
  @Type(() => Knowledge)
  knowledge: KnowledgeInterface;
  @ValidateNested()
  @Type(() => PaginatedPermissionsSpaceMember)
  members: PaginatedPermissionsSpaceMemberInterface;
  @ValidateNested()
  @Type(() => DefaultAssistant)
  default_assistant: DefaultAssistantInterface;
  @ValidateNested({ each: true })
  @Type(() => SpaceRole)
  available_roles: SpaceRoleInterface[];
  @ValidateNested()
  @Type(() => SecurityClassificationPublic)
  @IsNullable()
  security_classification: SecurityClassificationPublicInterface | null;
  @ValidateNested()
  @Type(() => PaginatedPermissionsSpaceGroupMember)
  group_members: PaginatedPermissionsSpaceGroupMemberInterface;
}

export class PaginatedResponseSpaceSparse extends PaginatedDefaults implements PaginatedResponseSpaceSparseInterface {
  @ValidateNested({ each: true })
  @Type(() => SpaceSparse)
  items: SpaceSparseInterface[];
}
