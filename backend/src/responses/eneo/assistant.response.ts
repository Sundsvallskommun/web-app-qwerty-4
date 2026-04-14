//@ts-nocheck
import {
  AssistantPublic as AssistantPublicInterface,
  AssistantSparse as AssistantSparseInterface,
  AssistantType,
  CollectionPublic as CollectionPublicInterface,
  EmbeddingModelPublicLegacy as EmbeddingModelPublicLegacyInterface,
  FilePublic as FilePublicInterface,
  FileRestrictions as FileRestrictionsInterface,
  IntegrationKnowledgeMetaData as IntegrationKnowledgeMetaDataInterface,
  IntegrationKnowledgePublicIntegrationTypeEnum,
  IntegrationKnowledgePublic as IntegrationKnowledgePublicInterface,
  PaginatedResponseAssistantPublic as PaginatedResponseAssistantPublicInterface,
  PromptPublic as PromptPublicInterface,
  ResourcePermission,
  UserSparse as UserSparseInterface,
  WebsitePublic as WebsitePublicInterface,
  CompletionModelSparse as CompletionModelSparseInterface,
  DefaultAssistant as DefaultAssistantInterface,
} from '@/data-contracts/eneo-sundsvall/data-contracts';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { DatesAndId, ModelKwargs, ModelKwargsInterface, UseTools, UseToolsInterface } from './common';
import { FilePublic, FileRestrictions } from './file.response';
import { CollectionPublic } from './group.response';
import { CompletionModelSparse, EmbeddingModelPublicLegacy } from './models.response';
import { WebsitePublic } from './website.response';
import { UserSparse } from './user.response';

class PromptPublic extends DatesAndId implements PromptPublicInterface {
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsString()
  @IsOptional()
  @IsNullable()
  description?: string | null;
  @IsBoolean()
  @IsOptional()
  @IsNullable()
  is_selected?: boolean | null;
  @ValidateNested()
  @Type(() => UserSparse)
  user: UserSparseInterface;
  @IsString()
  text: string;
}

class IntegrationKnowledgeMetaData implements IntegrationKnowledgeMetaDataInterface {
  @IsNumber()
  size: number;
}

class IntegrationKnowledgePublic extends DatesAndId implements IntegrationKnowledgePublicInterface {
  @IsString()
  name: string;
  @IsString()
  url: string;
  @IsString()
  tenant_id: string;
  @IsString()
  space_id: string;
  @IsString()
  user_integration_id: string;
  @ValidateNested()
  @Type(() => EmbeddingModelPublicLegacy)
  embedding_model: EmbeddingModelPublicLegacyInterface;
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @ValidateNested()
  @Type(() => IntegrationKnowledgeMetaData)
  metadata: IntegrationKnowledgeMetaDataInterface;
  @IsEnum(IntegrationKnowledgePublicIntegrationTypeEnum)
  integration_type: IntegrationKnowledgePublicIntegrationTypeEnum;
  task: any;
}

class MetadataJson {
  @IsBoolean()
  @IsOptional()
  pinned?: boolean;
}

class AssistantCommon extends DatesAndId {
  @IsString()
  name: string;
  @ValidateNested()
  @Type(() => ModelKwargs)
  completion_model_kwargs: ModelKwargsInterface;
  @IsBoolean()
  logging_enabled: boolean;
  @IsEnum(ResourcePermission, { each: true })
  @IsOptional()
  permissions?: ResourcePermission[];
  @IsBoolean()
  @IsOptional()
  published?: boolean;
  @IsString()
  @IsOptional()
  @IsNullable()
  description?: string | null;
  @IsOptional()
  @IsNullable()
  @ValidateNested()
  @Type(() => MetadataJson)
  metadata_json?: MetadataJson | null;
  @IsEnum(AssistantType)
  type: AssistantType;
  @IsString()
  @IsOptional()
  icon_id?: string;
}

export class AssistantSparse extends AssistantCommon implements AssistantSparseInterface {
  @IsString()
  user_id: string;
}

export class AssistantPublic extends AssistantCommon implements AssistantPublicInterface {
  @ValidateNested()
  @Type(() => PromptPublic)
  @IsOptional()
  @IsNullable()
  prompt?: PromptPublicInterface | null;
  @IsString()
  space_id: string;
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  attachments: FilePublicInterface[];
  @ValidateNested()
  @Type(() => FileRestrictions)
  allowed_attachments: FileRestrictionsInterface;
  @ValidateNested({ each: true })
  @Type(() => CollectionPublic)
  groups: CollectionPublicInterface[];
  @ValidateNested({ each: true })
  @Type(() => WebsitePublic)
  websites: WebsitePublicInterface[];
  @ValidateNested({ each: true })
  @Type(() => IntegrationKnowledgePublic)
  integration_knowledge_list: IntegrationKnowledgePublicInterface[];
  @ValidateNested()
  @Type(() => CompletionModelSparse)
  completion_model: CompletionModelSparseInterface;
  @ValidateNested()
  @Type(() => UserSparse)
  user: UserSparseInterface;
  @ValidateNested()
  @Type(() => UseTools)
  tools: UseToolsInterface;
  @IsBoolean()
  insight_enabled: boolean;
  @IsNumber()
  @IsOptional()
  @IsNullable()
  data_retention_days?: number | null;
}

export class DefaultAssistant extends AssistantPublic implements DefaultAssistantInterface {}

export class PaginatedResponseAssistantPublic implements PaginatedResponseAssistantPublicInterface {
  @ValidateNested({ each: true })
  @Type(() => AssistantPublic)
  items: AssistantPublicInterface[];
  @IsInt()
  count: number;
}
