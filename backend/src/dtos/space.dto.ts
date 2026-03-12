import {
  CreateSpaceAssistantRequest,
  TemplateCreate as TemplateCreateInterface,
  AdditionalField as AdditionalFieldInterface,
  WizardType,
} from '@/data-contracts/eneo-sundsvall/data-contracts';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Type } from 'class-transformer';
import { IsEnum, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

class AdditionalField implements AdditionalFieldInterface {
  @IsEnum(WizardType)
  type: WizardType;
  @IsObject({ each: true })
  value: Record<string, string>[];
}
class TemplateCreate implements TemplateCreateInterface {
  @IsString()
  id: string;
  @ValidateNested({ each: true })
  @Type(() => AdditionalField)
  @IsNullable()
  additional_fields: AdditionalFieldInterface[];
}

export class CreateSpaceAssistantDto implements CreateSpaceAssistantRequest {
  @IsString()
  name: string;
  @ValidateNested()
  @Type(() => TemplateCreate)
  @IsOptional()
  @IsNullable()
  from_template?: TemplateCreateInterface;
}
