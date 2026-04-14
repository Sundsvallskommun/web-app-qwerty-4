//@ts-nocheck
import {
  CollectionMetadata as CollectionMetadataInterface,
  CollectionPublic as CollectionPublicInterface,
  ResourcePermission,
  PaginatedPermissionsCollectionPublic as PaginatedPermissionsCollectionPublicInterface,
  EmbeddingModelPublic as EmbeddingModelPublicInterface,
} from '@/data-contracts/eneo-sundsvall/data-contracts';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { DatesAndId, PaginatedPermissionsDefaults } from './common';
import { EmbeddingModelPublic } from './models.response';

export class CollectionMetadata implements CollectionMetadataInterface {
  @IsNumber()
  num_info_blobs: number;
  @IsNumber()
  size: number;
}

export class CollectionPublic extends DatesAndId implements CollectionPublicInterface {
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsString()
  name: string;
  @ValidateNested()
  @Type(() => EmbeddingModelPublic)
  embedding_model: EmbeddingModelPublicInterface;
  @ValidateNested()
  @Type(() => CollectionMetadata)
  metadata: CollectionMetadataInterface;
  @IsString()
  space_id: string;
}

export class PaginatedPermissionsCollectionPublic extends PaginatedPermissionsDefaults implements PaginatedPermissionsCollectionPublicInterface {
  @ValidateNested({ each: true })
  @Type(() => CollectionPublic)
  items: CollectionPublicInterface[];
}
