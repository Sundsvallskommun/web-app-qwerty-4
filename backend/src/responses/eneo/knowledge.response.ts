import {
  Knowledge as KnowledgeInterface,
  PaginatedPermissionsCollectionPublic as PaginatedPermissionsCollectionPublicInterface,
  PaginatedPermissionsWebsitePublic as PaginatedPermissionsWebsitePublicInterface,
  IntegrationKnowledgePublic as IntegrationKnowledgePublicInterface,
  EmbeddingModelPublicLegacy as EmbeddingModelPublicLegacyInterface,
  ResourcePermission,
  IntegrationKnowledgeMetaData as IntegrationKnowledgeMetaDataInterface,
  IntegrationKnowledgePublicIntegrationTypeEnum,
  PaginatedPermissionsIntegrationKnowledgePublic as PaginatedPermissionsIntegrationKnowledgePublicInterface,
} from '@/data-contracts/eneo-sundsvall/data-contracts';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PaginatedPermissionsCollectionPublic } from './group.response';
import { PaginatedPermissionsWebsitePublic } from './website.response';
import { EmbeddingModelPublicLegacy } from './models.response';
import { PaginatedPermissionsDefaults } from './common';

class IntegrationKnowledgeMetaData implements IntegrationKnowledgeMetaDataInterface {
  @IsNumber()
  size: number;
}

export class IntegrationKnowledgePublic implements IntegrationKnowledgePublicInterface {
  @IsString()
  id: string;
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
  @IsOptional()
  permissions?: ResourcePermission[];
  @ValidateNested()
  @Type(() => IntegrationKnowledgeMetaData)
  metadata: IntegrationKnowledgeMetaDataInterface;
  @IsEnum(IntegrationKnowledgePublicIntegrationTypeEnum)
  integration_type: IntegrationKnowledgePublicIntegrationTypeEnum;
  task: any;
}

export class PaginatedPermissionsIntegrationKnowledgePublic
  extends PaginatedPermissionsDefaults
  implements PaginatedPermissionsIntegrationKnowledgePublicInterface
{
  @ValidateNested({ each: true })
  @Type(() => IntegrationKnowledgePublic)
  items: IntegrationKnowledgePublicInterface[];
}

export class Knowledge implements KnowledgeInterface {
  @ValidateNested()
  @Type(() => PaginatedPermissionsCollectionPublic)
  groups: PaginatedPermissionsCollectionPublicInterface;
  @ValidateNested()
  @Type(() => PaginatedPermissionsWebsitePublic)
  websites: PaginatedPermissionsWebsitePublicInterface;
  @ValidateNested()
  @Type(() => PaginatedPermissionsIntegrationKnowledgePublic)
  integration_knowledge_list: PaginatedPermissionsIntegrationKnowledgePublicInterface;
}
