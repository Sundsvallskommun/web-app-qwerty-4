import {
  AskResponse as AskResponseInterface,
  CompletionModelPublic as CompletionModelPublicInterface,
  FilePublic as FilePublicInterface,
  InfoBlobAskAssistantPublic as InfoBlobAskAssistantPublicInterface,
  InfoBlobMetadata as InfoBlobMetadataInterface,
  UseTools as UseToolsInterface,
} from '@/data-contracts/eneo-sundsvall/data-contracts';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { DatesAndId, UseTools, WebSearchResultPublic, WebSearchResultPublicInterface } from './common';
import { FilePublic } from './file.response';
import { InfoBlobMetadata } from './info-blob.response';
import { CompletionModelPublic } from './models.response';

class InfoBlobAskAssistantPublic extends DatesAndId implements InfoBlobAskAssistantPublicInterface {
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
  @IsNumber()
  score: number;
}

export class AskResponse implements AskResponseInterface {
  @IsString()
  session_id: string;
  @IsString()
  question: string;
  @IsString()
  answer: string;
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  files: FilePublicInterface[];
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  generated_files: FilePublicInterface[];
  @ValidateNested({ each: true })
  @Type(() => InfoBlobAskAssistantPublic)
  references: InfoBlobAskAssistantPublicInterface[];
  @ValidateNested()
  @Type(() => UseTools)
  tools: UseToolsInterface;
  @ValidateNested({ each: true })
  @Type(() => WebSearchResultPublic)
  web_search_references: WebSearchResultPublicInterface[];
  @ValidateNested()
  @Type(() => CompletionModelPublic)
  @IsOptional()
  @IsNullable()
  model?: CompletionModelPublicInterface | null;
}
