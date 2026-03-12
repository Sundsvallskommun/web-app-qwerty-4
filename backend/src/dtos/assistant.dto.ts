import {
  AssistantGuard as AssistantGuardType,
  ModelId as ModelIdInterface,
  ModelKwargs as ModelKwargsInterface,
  PartialAssistantUpdatePublic,
  PromptCreate,
} from '@/data-contracts/eneo-sundsvall/data-contracts';
import { ModelId, ModelKwargs } from '@/responses/eneo/common';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';

export class NewPrompt implements PromptCreate {
  @IsString()
  text: string;
  @IsString()
  @IsOptional()
  @IsNullable()
  description?: string | null;
}

export class AssistantGuard implements AssistantGuardType {
  @IsBoolean()
  @IsOptional()
  guardrail_active?: boolean;
  @IsString()
  @IsOptional()
  guardrail_string?: string;
  @IsString()
  @IsOptional()
  on_fail_message?: string;
}
export class UpdateAssistantDto implements PartialAssistantUpdatePublic {
  @IsString()
  @IsOptional()
  @IsNullable()
  name: string | null;
  @IsOptional()
  @Type(() => NewPrompt)
  @ValidateNested()
  prompt: PromptCreate;
  @IsNullable()
  @IsOptional()
  @Type(() => ModelId)
  completion_model: ModelIdInterface;
  @IsOptional()
  @IsNullable()
  @ValidateNested()
  @Type(() => ModelKwargs)
  completion_model_kwargs?: ModelKwargsInterface | null;
  @Type(() => ModelId)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsNullable()
  groups?: ModelIdInterface[] | null;
  @Type(() => ModelId)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsNullable()
  websites?: ModelIdInterface[] | null;
  @IsBoolean()
  @IsOptional()
  @IsNullable()
  logging_enabled?: boolean | null;
  @IsString()
  @IsOptional()
  @IsNullable()
  space_id?: string | null;
  @IsOptional()
  @IsNullable()
  @Type(() => AssistantGuard)
  guardrail?: AssistantGuardType | null;
  @IsOptional()
  @IsNullable()
  @Type(() => ModelId)
  @ValidateNested({ each: true })
  attachments?: ModelIdInterface[] | null;
  @IsOptional()
  @IsNullable()
  @IsString()
  description?: string | null;
}
