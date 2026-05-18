/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED FROM CONTRACT INTERFACES          ##
 * ---------------------------------------------------------------
 */

import { Type } from 'class-transformer';
import { Allow, IsDefined, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';

export class Problem {
  @IsOptional()
  @IsString()
  instance?: string;
  @IsOptional()
  @IsString()
  type?: string;
  @IsOptional()
  @IsString()
  title?: string;
  @IsOptional()
  @IsString()
  detail?: string;
  @IsOptional()
  @IsInt()
  status?: number;
}

export class Configuration {
  @IsOptional()
  @IsString()
  application?: string;
  @IsOptional()
  @IsString()
  namespace?: string;
  @IsDefined()
  @Allow()
  data!: Record<string, string[]>;
  @IsOptional()
  @IsString()
  createdAt?: string;
  @IsOptional()
  @IsString()
  updatedAt?: string;
}

export class ThrowableProblem {
  @IsOptional()
  @IsString()
  type?: string;
  @IsOptional()
  @IsString()
  title?: string;
  @IsOptional()
  @IsInt()
  status?: number;
  @IsOptional()
  @IsString()
  detail?: string;
  @IsOptional()
  @IsString()
  instance?: string;
  @IsOptional()
  @Allow()
  causeAsProblem?: any;
}

export class Violation {
  @IsOptional()
  @IsString()
  field?: string;
  @IsOptional()
  @IsString()
  message?: string;
}

export class ConstraintViolationProblem {
  @IsOptional()
  @IsString()
  type?: string;
  @IsOptional()
  @IsInt()
  status?: number;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Violation)
  violations?: Violation[];
  @IsOptional()
  @IsString()
  title?: string;
  @IsOptional()
  @IsString()
  instance?: string;
  @IsOptional()
  @IsString()
  detail?: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => ThrowableProblem)
  causeAsProblem?: ThrowableProblem;
}
