import { ConversationRequest, ModelId as ModelIdInterface, UseTools as UseToolsInterface } from '@/data-contracts/eneo-sundsvall/data-contracts';
import { ModelId, UseTools } from '@/responses/eneo/common';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';

export class ConversationRequestDto implements ConversationRequest {
  @IsString()
  @IsOptional()
  assistant_id?: string;
  @IsString()
  @IsOptional()
  group_chat_id?: string;
  @IsString()
  @IsOptional()
  session_id?: string;
  @IsString()
  question: string;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  files?: ModelIdInterface[];
  @IsBoolean()
  @IsOptional()
  stream?: boolean;
  @IsOptional()
  @IsNullable()
  @ValidateNested()
  @Type(() => UseTools)
  use_tools?: UseToolsInterface | null;
  @IsBoolean()
  @IsOptional()
  use_web_search?: boolean;
}
