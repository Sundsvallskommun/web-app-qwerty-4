//@ts-nocheck
import {
  CrawlType,
  IntricWebsitesPresentationWebsiteModelsCrawlRunPublic as EneoWebsitesPresentationWebsiteModelsCrawlRunPublicInterface,
  PaginatedPermissionsWebsitePublic as PaginatedPermissionsWebsitePublicInterface,
  ResourcePermission,
  Status,
  UpdateInterval,
  WebsiteMetadata as WebsiteMetadataInterface,
  WebsitePublic as WebsitePublicInterface,
  EmbeddingModelPublic as EmbeddingModelPublicInterface,
} from '@/data-contracts/eneo-sundsvall/data-contracts';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { DatesAndId, PaginatedPermissionsDefaults } from './common';
import { EmbeddingModelPublic } from './models.response';

export class EneoWebsitesPresentationWebsiteModelsCrawlRunPublic
  extends DatesAndId
  implements EneoWebsitesPresentationWebsiteModelsCrawlRunPublicInterface
{
  @IsNumber()
  @IsNullable()
  pages_crawled: number | null;
  @IsNumber()
  @IsNullable()
  files_downloaded: number | null;
  @IsNumber()
  @IsNullable()
  pages_failed: number | null;
  @IsNumber()
  @IsNullable()
  files_failed: number | null;
  @IsEnum(Status)
  status: Status;
  @IsString()
  @IsNullable()
  result_location: string | null;
  @IsString()
  @IsNullable()
  finished_at: string | null;
}

export class WebsiteMetadata implements WebsiteMetadataInterface {
  @IsNumber()
  size: number;
}

export class WebsitePublic extends DatesAndId implements WebsitePublicInterface {
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsString()
  @IsNullable()
  name: string | null;
  @IsString()
  url: string;
  @IsString()
  space_id: string;
  @IsBoolean()
  download_files: boolean;
  @IsEnum(CrawlType)
  crawl_type: CrawlType;
  @IsEnum(UpdateInterval)
  update_interval: UpdateInterval;
  @ValidateNested()
  @Type(() => EneoWebsitesPresentationWebsiteModelsCrawlRunPublic)
  @IsNullable()
  latest_crawl: EneoWebsitesPresentationWebsiteModelsCrawlRunPublicInterface;
  @ValidateNested()
  @Type(() => EmbeddingModelPublic)
  embedding_model: EmbeddingModelPublicInterface;
  @ValidateNested()
  @Type(() => WebsiteMetadata)
  metadata: WebsiteMetadataInterface;
  @IsBoolean()
  requires_http_auth: boolean;
  @IsBoolean()
  is_auto_disabled: boolean;
}

export class PaginatedPermissionsWebsitePublic extends PaginatedPermissionsDefaults implements PaginatedPermissionsWebsitePublicInterface {
  @ValidateNested({ each: true })
  @Type(() => WebsitePublic)
  items: WebsitePublicInterface[];
}
