/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED FROM CONTRACT INTERFACES          ##
 * ---------------------------------------------------------------
 */

import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { IsNullable } from '@/utils/custom-validation-classes';

export class Account {
  @IsNullable()
  @IsOptional()
  @IsString()
  domain?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  loginname?: string | null;
  @IsOptional()
  @IsInt()
  companyId?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  emailAddress?: string | null;
}

export class Manager {
  @IsOptional()
  @IsString()
  personId?: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  givenname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  middlename?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  lastname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  loginname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  emailAddress?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  referenceNumber?: string | null;
}

export class EmploymentV2 {
  @IsOptional()
  @IsInt()
  companyId?: number;
  @IsOptional()
  @IsString()
  startDate?: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  endDate?: string | null;
  @IsOptional()
  @IsInt()
  employmentType?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  title?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  managerCode?: string | null;
  @IsOptional()
  @IsInt()
  orgId?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  orgName?: string | null;
  @IsOptional()
  @IsInt()
  topOrgId?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  topOrgName?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  benefitGroupId?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  formOfEmploymentId?: string | null;
  @IsOptional()
  @IsBoolean()
  isManual?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  paTeam?: string | null;
  @IsOptional()
  @IsBoolean()
  isMainEmployment?: boolean;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  isManager?: boolean | null;
  @IsOptional()
  @ValidateNested()
  @Type(() => Manager)
  manager?: Manager;
  @IsOptional()
  @ValidateNested()
  @Type(() => Manager)
  hiringManager?: Manager;
  @IsNullable()
  @IsOptional()
  @IsString()
  aid?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  empRowId?: string | null;
  @IsOptional()
  @IsInt()
  employmentId?: number;
}

export class ReferenceNumberCompany {
  @IsNullable()
  @IsOptional()
  @IsString()
  referenceNumber?: string | null;
  @IsOptional()
  @IsInt()
  companyId?: number;
}

export class Employeev2 {
  @IsOptional()
  @IsString()
  personId?: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  personNumber?: string | null;
  @IsOptional()
  @IsBoolean()
  isClassified?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  givenname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  middlename?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  lastname?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Account)
  accounts?: Account[] | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ReferenceNumberCompany)
  referenceNumbers?: ReferenceNumberCompany[] | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EmploymentV2)
  employments?: EmploymentV2[] | null;
}

export class ManagerEmployee {
  @IsOptional()
  @IsString()
  personId?: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  hireDate?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  retireDate?: string | null;
}

export class ManagerEmployeeEmploymentDetail {
  @IsOptional()
  @IsInt()
  employmentId?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  title?: string | null;
  @IsOptional()
  @IsBoolean()
  isMainEmployment?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  orgName?: string | null;
}

export class ManagerEmployeeDetail {
  @IsOptional()
  @IsString()
  personId?: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  fullName?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  birthdate?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ManagerEmployeeEmploymentDetail)
  employments?: ManagerEmployeeEmploymentDetail[] | null;
}

export class ManagerEmployeeDetailPagedOffsetResponse {
  @IsOptional()
  @IsInt()
  pageNumber?: number;
  @IsOptional()
  @IsInt()
  pageSize?: number;
  @IsOptional()
  @IsInt()
  totalRecords?: number;
  @IsOptional()
  @IsInt()
  totalPages?: number;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ManagerEmployeeDetail)
  data?: ManagerEmployeeDetail[] | null;
}

export class ModelPostPersonImage {
  @IsNullable()
  @IsOptional()
  @IsString()
  title?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  imageData?: string | null;
}

export class NewEmployment {
  @IsOptional()
  @IsInt()
  companyId?: number;
  @IsOptional()
  @IsString()
  startDate?: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  endDate?: string | null;
  @IsOptional()
  @IsInt()
  employmentType?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  title?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  managerCode?: string | null;
  @IsOptional()
  @IsInt()
  orgId?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  orgName?: string | null;
  @IsOptional()
  @IsInt()
  topOrgId?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  topOrgName?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  benefitGroupId?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  formOfEmploymentId?: string | null;
  @IsOptional()
  @IsBoolean()
  isManual?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  paTeam?: string | null;
  @IsOptional()
  @IsBoolean()
  isMainEmployment?: boolean;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  isManager?: boolean | null;
  @IsOptional()
  @ValidateNested()
  @Type(() => Manager)
  manager?: Manager;
  @IsOptional()
  @ValidateNested()
  @Type(() => Manager)
  hiringManager?: Manager;
  @IsNullable()
  @IsOptional()
  @IsString()
  aid?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  empRowId?: string | null;
  @IsOptional()
  @IsInt()
  employmentId?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  eventType?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  eventInfo?: string | null;
}

export class NewEmployee {
  @IsOptional()
  @IsString()
  personId?: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  personNumber?: string | null;
  @IsOptional()
  @IsBoolean()
  isClassified?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  givenname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  middlename?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  lastname?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Account)
  accounts?: Account[] | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ReferenceNumberCompany)
  referenceNumbers?: ReferenceNumberCompany[] | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => NewEmployment)
  employments?: NewEmployment[] | null;
}

export class PortalPersonData {
  @IsOptional()
  @IsString()
  personid?: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  givenname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  lastname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  fullname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  address?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  postalCode?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  city?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  workPhone?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  mobilePhone?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  extraMobilePhone?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  aboutMe?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  email?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  mailNickname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  company?: string | null;
  @IsOptional()
  @IsInt()
  companyId?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  orgTree?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  referenceNumber?: string | null;
  @IsOptional()
  @IsBoolean()
  isManager?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  loginName?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  fullOrgTree?: string | null;
}

export class ProblemDetails {
  @IsNullable()
  @IsOptional()
  @IsString()
  type?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  title?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  status?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  detail?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  instance?: string | null;
}

export class UserProfile {
  @IsOptional()
  @IsString()
  userId?: string;
  @IsOptional()
  @IsString()
  personId?: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  personNumber?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  givenname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  lastname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  workMobile?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  workPhone?: string | null;
  @IsOptional()
  @IsInt()
  companyId?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  company?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  title?: string | null;
  @IsOptional()
  @IsString()
  managerPersonId?: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  managerCode?: string | null;
  @IsOptional()
  @IsString()
  hireDate?: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  retiredate?: string | null;
  @IsOptional()
  @IsInt()
  orgId?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  orgName?: string | null;
  @IsOptional()
  @IsInt()
  topOrgId?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  topOrgName?: string | null;
  @IsOptional()
  @IsBoolean()
  isExternal?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  loginname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  displayname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  emailAddress?: string | null;
  @IsOptional()
  @IsInt()
  accountTypeId?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  accountType?: string | null;
  @IsOptional()
  @IsInt()
  mcId?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  municipalityId?: string | null;
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
  @IsOptional()
  @IsString()
  createdDT?: string;
  @IsOptional()
  @IsString()
  updatedDT?: string;
}
