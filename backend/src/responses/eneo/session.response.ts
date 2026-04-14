//@ts-nocheck
import {
  CursorPaginatedResponseSessionMetadataPublic as CursorPaginatedResponseSessionMetadataPublicInterface,
  FilePublic as FilePublicInterface,
  InfoBlobPublicNoText as InfoBlobPublicNoTextInterface,
  Message as MessageInterface,
  SessionFeedback as SessionFeedbackInterface,
  SessionFeedbackValueEnum,
  SessionMetadataPublic as SessionMetadataPublicInterface,
  SessionPublic as SessionPublicInterface,
  CompletionModel as CompletionModelInterface,
} from '@/data-contracts/eneo-sundsvall/data-contracts';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { DatesAndId, UseTools, UseToolsInterface, WebSearchResultPublic, WebSearchResultPublicInterface } from './common';
import { InfoBlobPublicNoText } from './info-blob.response';
import { FilePublic } from './file.response';
import { CompletionModel } from './models.response';

class SessionMetadataPublic extends DatesAndId implements SessionMetadataPublicInterface {
  @IsString()
  name: string;
}

export class CursorPaginatedResponseSessionMetadataPublic implements CursorPaginatedResponseSessionMetadataPublicInterface {
  @ValidateNested({ each: true })
  @Type(() => SessionMetadataPublic)
  items: SessionMetadataPublicInterface[];
  @IsNumber()
  @IsOptional()
  @IsNullable()
  limit?: number | null;
  @IsString()
  @IsOptional()
  @IsNullable()
  next_cursor?: string | null;
  @IsString()
  @IsOptional()
  @IsNullable()
  previous_cursor?: string | null;
  @IsNumber()
  total_count: number;
  @IsNumber()
  count: number;
}

class Message implements MessageInterface {
  @IsString()
  @IsOptional()
  @IsNullable()
  created_at?: string | null;
  @IsString()
  @IsOptional()
  @IsNullable()
  updated_at?: string | null;
  @IsString()
  @IsOptional()
  @IsNullable()
  id?: string;
  @IsString()
  question: string;
  @IsString()
  answer: string;
  @ValidateNested()
  @Type(() => CompletionModel)
  @IsNullable()
  @IsOptional()
  completion_model?: CompletionModelInterface | null;
  @ValidateNested({ each: true })
  @Type(() => InfoBlobPublicNoText)
  references: InfoBlobPublicNoTextInterface[];
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  files: FilePublicInterface[];
  @ValidateNested({ each: true })
  @Type(() => UseTools)
  tools: UseToolsInterface;
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  generated_files: FilePublicInterface[];
  @ValidateNested({ each: true })
  @Type(() => WebSearchResultPublic)
  web_search_references: WebSearchResultPublicInterface[];
}

export class SessionFeedback implements SessionFeedbackInterface {
  @IsEnum(SessionFeedbackValueEnum)
  value: SessionFeedbackValueEnum;
  @IsString()
  @IsOptional()
  @IsNullable()
  text?: string | null;
}

export class SessionPublic extends DatesAndId implements SessionPublicInterface {
  @IsString()
  name: string;
  @ValidateNested({ each: true })
  @Type(() => Message)
  messages: MessageInterface[];
  @ValidateNested()
  @Type(() => SessionFeedback)
  @IsOptional()
  @IsNullable()
  feedback?: SessionFeedbackInterface | null;
}
