import {
  InfoBlobMetadata as InfoBlobMetadataInterface,
  InfoBlobPublicNoText as InfoBlobPublicNoTextInterface,
  InfoBlobPublic as InfoBlobPublicInterface,
  PaginatedResponseInfoBlobPublicNoText as PaginatedResponseInfoBlobPublicNoTextInterface,
  PaginatedResponseInfoBlobPublic as PaginatedResponseInfoBlobPublicInterface,
  JobPublic as JobPublicInterface,
  Status,
  Task,
} from '@/data-contracts/eneo-sundsvall/data-contracts';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { DatesAndId } from './common';

export class InfoBlobMetadata implements InfoBlobMetadataInterface {
  @IsString()
  @IsOptional()
  @IsNullable()
  url?: string;
  @IsString()
  @IsOptional()
  @IsNullable()
  title?: string;
  @IsString()
  embedding_model_id: string;
  @IsNumber()
  size: number;
}

export class InfoBlobPublicNoText extends DatesAndId implements InfoBlobPublicNoTextInterface {
  @ValidateNested()
  @Type(() => InfoBlobMetadata)
  metadata: InfoBlobMetadataInterface;
  @IsString()
  @IsOptional()
  @IsNullable()
  group_id?: string | null;
  @IsString()
  @IsOptional()
  @IsNullable()
  website_id?: string | null;
}

export class InfoBlobPublic extends InfoBlobPublicNoText implements InfoBlobPublicInterface {
  @IsString()
  text: string;
}

export class PaginatedResponseInfoBlobPublicNoText implements PaginatedResponseInfoBlobPublicNoTextInterface {
  @ValidateNested({ each: true })
  @Type(() => InfoBlobPublicNoText)
  items: InfoBlobPublicNoTextInterface[];
  @IsInt()
  count: number;
}

export class PaginatedResponseInfoBlobPublic implements PaginatedResponseInfoBlobPublicInterface {
  @ValidateNested({ each: true })
  @Type(() => InfoBlobPublic)
  items: InfoBlobPublicInterface[];
  @IsInt()
  count: number;
}

export class JobPublic extends DatesAndId implements JobPublicInterface {
  @IsString()
  @IsOptional()
  @IsNullable()
  name?: string | null;
  @IsEnum(Status)
  status: Status;
  @IsEnum(Task)
  task: Task;
  @IsString()
  @IsOptional()
  @IsNullable()
  result_location?: string | null;
  @IsString()
  @IsOptional()
  @IsNullable()
  finished_at?: string | null;
}
