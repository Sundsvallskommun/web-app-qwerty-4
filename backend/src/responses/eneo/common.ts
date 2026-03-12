import {
  ModelKwargs as ModelKwargsInterface,
  PaginatedPermissionsAppSparse,
  ResourcePermission,
  SecurityClassificationPublic as SecurityClassificationPublicInterface,
  ToolAssistant as ToolAssistantInterface,
  UseTools as UseToolsInterface,
  ModelId as ModelIdInterface,
  WebSearchResultPublic as WebSearchResultPublicInterface,
} from '@/data-contracts/eneo-sundsvall/data-contracts';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class DatesAndId {
  @IsString()
  @IsOptional()
  @IsNullable()
  created_at?: string | null;
  @IsString()
  @IsOptional()
  @IsNullable()
  updated_at?: string | null;
  @IsString()
  id: string;
}

export class ModelId implements ModelIdInterface {
  @IsString()
  id: string;
}

class ToolAssistant implements ToolAssistantInterface {
  @IsString()
  id: string;
  @IsString()
  handle: string;
}

export class UseTools implements UseToolsInterface {
  @ValidateNested({ each: true })
  @Type(() => ToolAssistant)
  assistants: ToolAssistantInterface[];
}

export class ModelKwargs implements ModelKwargsInterface {
  @IsNumber()
  @IsOptional()
  @IsNullable()
  temperature?: number | null;
  @IsNumber()
  @IsOptional()
  @IsNullable()
  top_p?: number | null;
}

export class PaginatedDefaults implements Pick<PaginatedPermissionsAppSparse, 'count' | 'permissions'> {
  @IsInt()
  count: number;
}
export class PaginatedPermissionsDefaults extends PaginatedDefaults implements Pick<PaginatedPermissionsAppSparse, 'count' | 'permissions'> {
  @IsEnum(ResourcePermission, { each: true })
  @IsOptional()
  permissions?: ResourcePermission[];
}
export class SecurityClassificationPublic extends DatesAndId implements SecurityClassificationPublicInterface {
  @IsString()
  name: string;
  @IsString()
  @IsNullable()
  description: string | null;
  @IsNumber()
  security_level: number;
}

export class WebSearchResultPublic implements WebSearchResultPublicInterface {
  @IsString()
  id: string;
  @IsString()
  title: string;
  @IsString()
  url: string;
}

export type { ModelKwargsInterface, SecurityClassificationPublicInterface, UseToolsInterface, WebSearchResultPublicInterface };
