/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED FROM CONTRACT INTERFACES          ##
 * ---------------------------------------------------------------
 */

import { ActionType, ActorType, AnalysisJobStatus, ApiKeyNotificationTargetType, ApiKeyOwnership, ApiKeyPermission, ApiKeyScopeType, ApiKeySearchMatchReason, ApiKeyState, ApiKeyStateReasonCode, ApiKeyType, AssistantType, AvailabilityResponseDisabledReasonEnum, CategoryType, ContentDisposition, CrawlType, CreateSpaceIntegrationKnowledgeBatchResultStatusEnum, CreateSpaceServiceResponseOutputFormatEnum, EntityType, ErrorCodes, ExpiringKeySummaryItemSeverityEnum, ExportJobRequestFormatEnum, FederationInfoEncryptionStatusEnum, HelperKind, HelperRunStatus, InputFieldType, IntegrationKnowledgePublicIntegrationTypeEnum, IntegrationType, IntricEventType, IntricTenantsPresentationTenantCredentialsRouterCredentialInfoEncryptionStatusEnum, IntricTenantsPresentationTenantSelfCredentialsRouterCredentialInfoEncryptionStatusEnum, McpServerCreateHttpAuthTypeEnum, McpServerUpdateHttpAuthTypeEnum, ModelKwargCapabilityControlEnum, Modules, Outcome, PartialServiceUpdatePublicOutputFormatEnum, Permission, ResourcePermission, ResourcePermissionLevel, ServiceCreatePublicOutputFormatEnum, ServicePublicWithUserOutputFormatEnum, ServiceSparseOutputFormatEnum, SessionFeedbackValueEnum, SpaceRoleValue, Status, Task, TenantState, UpdateInterval, UserState, WizardType } from './data-contracts';
import { Type } from 'class-transformer';
import { Allow, IsBoolean, IsDefined, IsEnum, IsInt, IsOptional, IsString, ValidateIf, ValidateNested } from 'class-validator';
import { IsNullable } from '@/utils/custom-validation-classes';

export class ARQHealth {
  @IsNullable()
  @IsOptional()
  @IsInt()
  heartbeat_ttl_seconds?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  age_seconds?: number | null;
  @IsOptional()
  @IsInt()
  j_complete?: number;
  @IsOptional()
  @IsInt()
  j_failed?: number;
  @IsOptional()
  @IsInt()
  j_retried?: number;
  @IsOptional()
  @IsInt()
  j_ongoing?: number;
  @IsOptional()
  @IsInt()
  queued?: number;
}

export class AcceptedFileType {
  @IsDefined()
  @IsString()
  mimetype!: string;
  @IsDefined()
  @IsInt()
  size_limit!: number;
}

export class AccessJustificationRequest {
  @IsDefined()
  @IsString()
  category!: string;
  @IsDefined()
  @IsString()
  description!: string;
}

export class AccessJustificationResponse {
  @IsOptional()
  @IsString()
  status?: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  message?: string | null;
}

export class AccessToken {
  @IsDefined()
  @IsString()
  access_token!: string;
  @IsDefined()
  @IsString()
  token_type!: string;
}

export class AccessTokenResponse {
  @IsDefined()
  @IsString()
  access_token!: string;
}

export class ActionConfig {
  @IsDefined()
  @IsEnum(ActionType)
  action!: ActionType;
  @IsDefined()
  @IsBoolean()
  enabled!: boolean;
  @IsDefined()
  @IsEnum(CategoryType)
  category!: CategoryType;
}

export class ActionConfigResponse {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ActionConfig)
  actions!: ActionConfig[];
}

export class ActionUpdate {
  @IsDefined()
  @IsString()
  action!: string;
  @IsDefined()
  @IsBoolean()
  enabled!: boolean;
}

export class ActionConfigUpdateRequest {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ActionUpdate)
  updates!: ActionUpdate[];
}

export class AddSpaceGroupMemberRequest {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsEnum(SpaceRoleValue)
  role!: SpaceRoleValue;
}

export class AddSpaceMemberRequest {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsEnum(SpaceRoleValue)
  role!: SpaceRoleValue;
}

export class AdditionalField {
  @IsDefined()
  @IsEnum(WizardType)
  type!: WizardType;
  @IsDefined()
  @Allow()
  value!: Record<string, string>[];
}

export class AllowedOriginCreate {
  @IsDefined()
  @IsString()
  url!: string;
  @IsDefined()
  @IsString()
  tenant_id!: string;
}

export class AllowedOriginInDB {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  url!: string;
  @IsDefined()
  @IsString()
  tenant_id!: string;
}

export class AllowedOriginPublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  url!: string;
}

export class AnalysisJobStatusResponse {
  @IsDefined()
  @IsString()
  job_id!: string;
  @IsDefined()
  @IsEnum(AnalysisJobStatus)
  status!: AnalysisJobStatus;
  @IsNullable()
  @IsOptional()
  @IsString()
  answer?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  error?: string | null;
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsDefined()
  @IsString()
  updated_at!: string;
}

export class ApiKey {
  @IsDefined()
  @IsString()
  truncated_key!: string;
  @IsDefined()
  @IsString()
  key!: string;
}

export class ResourcePermissions {
  @IsOptional()
  @IsEnum(ResourcePermissionLevel)
  assistants?: ResourcePermissionLevel;
  @IsOptional()
  @IsEnum(ResourcePermissionLevel)
  apps?: ResourcePermissionLevel;
  @IsOptional()
  @IsEnum(ResourcePermissionLevel)
  spaces?: ResourcePermissionLevel;
  @IsOptional()
  @IsEnum(ResourcePermissionLevel)
  knowledge?: ResourcePermissionLevel;
  @IsOptional()
  @IsEnum(ResourcePermissionLevel)
  conversations?: ResourcePermissionLevel;
  @IsOptional()
  @IsEnum(ResourcePermissionLevel)
  files?: ResourcePermissionLevel;
  @IsOptional()
  @IsEnum(ResourcePermissionLevel)
  jobs?: ResourcePermissionLevel;
  @IsOptional()
  @IsEnum(ResourcePermissionLevel)
  prompts?: ResourcePermissionLevel;
}

export class ApiKeyCreateRequest {
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsDefined()
  @IsEnum(ApiKeyType)
  key_type!: ApiKeyType;
  @IsOptional()
  @IsEnum(ApiKeyPermission)
  permission?: ApiKeyPermission;
  @IsDefined()
  @IsEnum(ApiKeyScopeType)
  scope_type!: ApiKeyScopeType;
  @IsNullable()
  @IsOptional()
  @IsString()
  scope_id?: string | null;
  @IsOptional()
  @IsEnum(ApiKeyOwnership)
  ownership?: ApiKeyOwnership;
  @IsNullable()
  @IsOptional()
  @IsString({ each: true })
  allowed_origins?: string[] | null;
  @IsNullable()
  @IsOptional()
  @IsString({ each: true })
  allowed_ips?: string[] | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  expires_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  rate_limit?: number | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ResourcePermissions)
  resource_permissions?: ResourcePermissions | null;
}

export class ApiKeyUserSnapshot {
  @IsDefined()
  @IsString()
  id!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  email?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  username?: string | null;
}

export class ApiKeyV2 {
  @IsDefined()
  @IsString()
  id!: string;
  @IsOptional()
  @IsEnum(ApiKeyOwnership)
  ownership?: ApiKeyOwnership;
  @IsNullable()
  @IsOptional()
  @IsString()
  owner_user_id?: string | null;
  @IsDefined()
  @IsString()
  key_prefix!: string;
  @IsDefined()
  @IsString()
  key_suffix!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsDefined()
  @IsEnum(ApiKeyType)
  key_type!: ApiKeyType;
  @IsDefined()
  @IsEnum(ApiKeyPermission)
  permission!: ApiKeyPermission;
  @IsDefined()
  @IsEnum(ApiKeyScopeType)
  scope_type!: ApiKeyScopeType;
  @IsNullable()
  @IsOptional()
  @IsString()
  scope_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString({ each: true })
  allowed_origins?: string[] | null;
  @IsNullable()
  @IsOptional()
  @IsString({ each: true })
  allowed_ips?: string[] | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  resource_permissions?: Record<string, string> | null;
  @IsDefined()
  @IsEnum(ApiKeyState)
  state!: ApiKeyState;
  @IsNullable()
  @IsOptional()
  @IsString()
  expires_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  last_used_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  revoked_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsEnum(ApiKeyStateReasonCode)
  revoked_reason_code?: ApiKeyStateReasonCode | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  revoked_reason_text?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  suspended_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsEnum(ApiKeyStateReasonCode)
  suspended_reason_code?: ApiKeyStateReasonCode | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  suspended_reason_text?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  rotation_grace_until?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  rate_limit?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  rotated_from_key_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  created_by_user_id?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ApiKeyUserSnapshot)
  owner_user?: ApiKeyUserSnapshot | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ApiKeyUserSnapshot)
  created_by_user?: ApiKeyUserSnapshot | null;
  @IsNullable()
  @IsOptional()
  @IsEnum(ApiKeySearchMatchReason, { each: true })
  search_match_reasons?: ApiKeySearchMatchReason[] | null;
}

export class ApiKeyCreatedResponse {
  @IsDefined()
  @ValidateNested()
  @Type(() => ApiKeyV2)
  api_key!: ApiKeyV2;
  @IsDefined()
  @IsString()
  secret!: string;
}

export class ApiKeyCreationConstraints {
  @IsOptional()
  @IsBoolean()
  require_expiration?: boolean;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_expiration_days?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_rate_limit?: number | null;
  @IsOptional()
  @IsInt()
  rotation_grace_hours?: number;
}

export class ApiKeyErrorResponse {
  @IsDefined()
  @IsString()
  code!: string;
  @IsDefined()
  @IsString()
  message!: string;
}

export class ApiKeyExactLookupRequest {
  @IsDefined()
  @IsString()
  secret!: string;
}

export class ApiKeyExactLookupResponse {
  @IsDefined()
  @ValidateNested()
  @Type(() => ApiKeyV2)
  api_key!: ApiKeyV2;
  @IsOptional()
  @IsEnum(ApiKeySearchMatchReason)
  match_reason?: ApiKeySearchMatchReason;
}

export class ApiKeyExtendRequest {
  @IsNullable()
  @IsOptional()
  @IsString()
  expires_at?: string | null;
}

export class ApiKeyListResponse {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ApiKeyV2)
  items!: ApiKeyV2[];
  @IsNullable()
  @IsOptional()
  @IsInt()
  limit?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  next_cursor?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  previous_cursor?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  total_count?: number | null;
}

export class ApiKeyNotificationPolicyResponse {
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
  @IsOptional()
  @IsInt({ each: true })
  default_days_before_expiry?: number[];
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_days_before_expiry?: number | null;
  @IsOptional()
  @IsBoolean()
  allow_auto_follow_published_assistants?: boolean;
  @IsOptional()
  @IsBoolean()
  allow_auto_follow_published_apps?: boolean;
}

export class ApiKeyNotificationPolicyUpdate {
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  enabled?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsInt({ each: true })
  default_days_before_expiry?: number[] | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_days_before_expiry?: number | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  allow_auto_follow_published_assistants?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  allow_auto_follow_published_apps?: boolean | null;
}

export class ApiKeyNotificationPreferencesResponse {
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
  @IsOptional()
  @IsInt({ each: true })
  days_before_expiry?: number[];
  @IsOptional()
  @IsBoolean()
  auto_follow_published_assistants?: boolean;
  @IsOptional()
  @IsBoolean()
  auto_follow_published_apps?: boolean;
}

export class ApiKeyNotificationPreferencesUpdate {
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  enabled?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsInt({ each: true })
  days_before_expiry?: number[] | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  auto_follow_published_assistants?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  auto_follow_published_apps?: boolean | null;
}

export class ApiKeyNotificationSubscription {
  @IsDefined()
  @IsEnum(ApiKeyNotificationTargetType)
  target_type!: ApiKeyNotificationTargetType;
  @IsDefined()
  @IsString()
  target_id!: string;
}

export class ApiKeyNotificationSubscriptionListResponse {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ApiKeyNotificationSubscription)
  items!: ApiKeyNotificationSubscription[];
}

export class ApiKeyPolicyResponse {
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_delegation_depth?: number | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  revocation_cascade_enabled?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  require_expiration?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_expiration_days?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  auto_expire_unused_days?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_rate_limit_override?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  rotation_grace_hours?: number | null;
}

export class ApiKeyPolicyUpdate {
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_delegation_depth?: number | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  revocation_cascade_enabled?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  require_expiration?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_expiration_days?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  auto_expire_unused_days?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_rate_limit_override?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  rotation_grace_hours?: number | null;
}

export class ApiKeyRotateRequest {
  @IsOptional()
  @IsBoolean()
  update_expiration?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  expires_at?: string | null;
  @IsOptional()
  @IsBoolean()
  disable_grace_period?: boolean;
}

export class ApiKeyStateChangeRequest {
  @IsNullable()
  @IsOptional()
  @IsEnum(ApiKeyStateReasonCode)
  reason_code?: ApiKeyStateReasonCode | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  reason_text?: string | null;
}

export class ApiKeyUpdateRequest {
  @IsNullable()
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsEnum(ApiKeyPermission)
  permission?: ApiKeyPermission | null;
  @IsNullable()
  @IsOptional()
  @IsString({ each: true })
  allowed_origins?: string[] | null;
  @IsNullable()
  @IsOptional()
  @IsString({ each: true })
  allowed_ips?: string[] | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  expires_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  rate_limit?: number | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ResourcePermissions)
  resource_permissions?: ResourcePermissions | null;
}

export class ApiKeyUsageEvent {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  timestamp!: string;
  @IsDefined()
  @IsString()
  action!: string;
  @IsDefined()
  @IsString()
  outcome!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  ip_address?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  user_agent?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  request_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  request_path?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  method?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  origin?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  error_message?: string | null;
}

export class ApiKeyUsageSummary {
  @IsDefined()
  @IsInt()
  total_events!: number;
  @IsDefined()
  @IsInt()
  used_events!: number;
  @IsDefined()
  @IsInt()
  auth_failed_events!: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  last_seen_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  last_success_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  last_failure_at?: string | null;
  @IsOptional()
  @IsBoolean()
  sampled_used_events?: boolean;
}

export class ApiKeyUsageResponse {
  @IsDefined()
  @ValidateNested()
  @Type(() => ApiKeyUsageSummary)
  summary!: ApiKeyUsageSummary;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ApiKeyUsageEvent)
  items!: ApiKeyUsageEvent[];
  @IsDefined()
  @IsInt()
  limit!: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  next_cursor?: string | null;
}

export class ApiKeyV2InDB {
  @IsDefined()
  @IsString()
  id!: string;
  @IsOptional()
  @IsEnum(ApiKeyOwnership)
  ownership?: ApiKeyOwnership;
  @IsNullable()
  @IsOptional()
  @IsString()
  owner_user_id?: string | null;
  @IsDefined()
  @IsString()
  key_prefix!: string;
  @IsDefined()
  @IsString()
  key_suffix!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsDefined()
  @IsEnum(ApiKeyType)
  key_type!: ApiKeyType;
  @IsDefined()
  @IsEnum(ApiKeyPermission)
  permission!: ApiKeyPermission;
  @IsDefined()
  @IsEnum(ApiKeyScopeType)
  scope_type!: ApiKeyScopeType;
  @IsNullable()
  @IsOptional()
  @IsString()
  scope_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString({ each: true })
  allowed_origins?: string[] | null;
  @IsNullable()
  @IsOptional()
  @IsString({ each: true })
  allowed_ips?: string[] | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  resource_permissions?: Record<string, string> | null;
  @IsDefined()
  @IsEnum(ApiKeyState)
  state!: ApiKeyState;
  @IsNullable()
  @IsOptional()
  @IsString()
  expires_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  last_used_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  revoked_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsEnum(ApiKeyStateReasonCode)
  revoked_reason_code?: ApiKeyStateReasonCode | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  revoked_reason_text?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  suspended_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsEnum(ApiKeyStateReasonCode)
  suspended_reason_code?: ApiKeyStateReasonCode | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  suspended_reason_text?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  rotation_grace_until?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  rate_limit?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  rotated_from_key_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  created_by_user_id?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ApiKeyUserSnapshot)
  owner_user?: ApiKeyUserSnapshot | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ApiKeyUserSnapshot)
  created_by_user?: ApiKeyUserSnapshot | null;
  @IsNullable()
  @IsOptional()
  @IsEnum(ApiKeySearchMatchReason, { each: true })
  search_match_reasons?: ApiKeySearchMatchReason[] | null;
  @IsDefined()
  @IsString()
  tenant_id!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  created_by_key_id?: string | null;
  @IsOptional()
  @IsInt()
  delegation_depth?: number;
  @IsDefined()
  @IsString()
  key_hash!: string;
  @IsDefined()
  @IsString()
  hash_version!: string;
}

export class CompletionModelPublicAppTemplate {
  @IsDefined()
  @IsString()
  id!: string;
}

export class PromptPublicAppTemplate {
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  text!: string | null;
}

export class AppInTemplatePublic {
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @ValidateNested()
  @Type(() => CompletionModelPublicAppTemplate)
  completion_model!: CompletionModelPublicAppTemplate | null;
  @IsDefined()
  @Allow()
  completion_model_kwargs!: Record<string, any>;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @ValidateNested()
  @Type(() => PromptPublicAppTemplate)
  prompt!: PromptPublicAppTemplate | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  input_description!: string | null;
  @IsDefined()
  @IsString()
  input_type!: string;
}

export class ModelKwargCapability {
  @IsOptional()
  @IsBoolean()
  supported?: boolean;
  @IsNullable()
  @IsOptional()
  @IsEnum(ModelKwargCapabilityControlEnum)
  control?: ModelKwargCapabilityControlEnum | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  minimum?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  maximum?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  step?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString({ each: true })
  options?: string[] | null;
}

export class SupportedModelKwargs {
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelKwargCapability)
  temperature?: ModelKwargCapability;
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelKwargCapability)
  top_p?: ModelKwargCapability;
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelKwargCapability)
  reasoning_effort?: ModelKwargCapability;
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelKwargCapability)
  verbosity?: ModelKwargCapability;
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelKwargCapability)
  presence_penalty?: ModelKwargCapability;
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelKwargCapability)
  frequency_penalty?: ModelKwargCapability;
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelKwargCapability)
  top_k?: ModelKwargCapability;
}

export class CompletionModelSparse {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  nickname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  family?: string | null;
  @IsDefined()
  @IsInt()
  max_input_tokens!: number;
  @IsDefined()
  @IsInt()
  max_output_tokens!: number;
  @IsDefined()
  @IsBoolean()
  is_deprecated!: boolean;
  @IsNullable()
  @IsOptional()
  @IsInt()
  nr_billion_parameters?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hf_link?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  stability?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hosting?: string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  open_source?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  deployment_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  org?: string | null;
  @IsDefined()
  @IsBoolean()
  vision!: boolean;
  @IsDefined()
  @IsBoolean()
  reasoning!: boolean;
  @IsOptional()
  @IsBoolean()
  supports_tool_calling?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  base_url?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  litellm_model_name?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => SupportedModelKwargs)
  model_kwargs_capabilities?: SupportedModelKwargs | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_cost_per_token?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  output_cost_per_token?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_type?: string | null;
  @IsDefined()
  @IsInt()
  token_limit!: number;
  @IsDefined()
  @ValidateNested()
  @Type(() => SupportedModelKwargs)
  supported_model_kwargs!: SupportedModelKwargs;
}

export class FilePublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  mimetype!: string;
  @IsDefined()
  @IsInt()
  size!: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  transcription?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  token_count?: number | null;
}

export class Limit {
  @IsDefined()
  @IsInt()
  max_files!: number;
  @IsDefined()
  @IsInt()
  max_size!: number;
}

export class FileRestrictions {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AcceptedFileType)
  accepted_file_types!: AcceptedFileType[];
  @IsDefined()
  @ValidateNested()
  @Type(() => Limit)
  limit!: Limit;
}

export class InputFieldPublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AcceptedFileType)
  accepted_file_types!: AcceptedFileType[];
  @IsDefined()
  @ValidateNested()
  @Type(() => Limit)
  limit!: Limit;
  @IsDefined()
  @IsEnum(InputFieldType)
  type!: InputFieldType;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
}

export class ModelKwargs {
  @IsNullable()
  @IsOptional()
  @IsInt()
  temperature?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  top_p?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  reasoning_effort?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  verbosity?: string | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  response_format?: Record<string, any> | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  presence_penalty?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  frequency_penalty?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  top_k?: number | null;
}

export class UserSparse {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  email!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  username?: string | null;
}

export class PromptPublic {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  is_selected?: boolean | null;
  @IsDefined()
  @ValidateNested()
  @Type(() => UserSparse)
  user!: UserSparse;
  @IsDefined()
  @IsString()
  text!: string;
}

export class SecurityClassificationPublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  description!: string | null;
  @IsDefined()
  @IsInt()
  security_level!: number;
}

export class TranscriptionModelPublic {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  nickname!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  family?: string | null;
  @IsDefined()
  @IsBoolean()
  is_deprecated!: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  stability?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hosting?: string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  open_source?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hf_link?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  org?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  cost_per_minute?: string | null;
  @IsOptional()
  @IsBoolean()
  can_access?: boolean;
  @IsOptional()
  @IsBoolean()
  is_locked?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  lock_reason?: string | null;
  @IsOptional()
  @IsBoolean()
  is_org_enabled?: boolean;
  @IsOptional()
  @IsBoolean()
  is_org_default?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  credential_provider?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => SecurityClassificationPublic)
  security_classification?: SecurityClassificationPublic | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  tenant_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_type?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  deprecation_date?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  migrated_to_model_id?: string | null;
}

export class AppPublic {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  description!: string | null;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => InputFieldPublic)
  input_fields!: InputFieldPublic[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  attachments!: FilePublic[];
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @ValidateNested()
  @Type(() => PromptPublic)
  prompt!: PromptPublic | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => CompletionModelSparse)
  completion_model?: CompletionModelSparse | null;
  @IsDefined()
  @ValidateNested()
  @Type(() => ModelKwargs)
  completion_model_kwargs!: ModelKwargs;
  @IsDefined()
  @ValidateNested()
  @Type(() => FileRestrictions)
  allowed_attachments!: FileRestrictions;
  @IsDefined()
  @IsBoolean()
  published!: boolean;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => TranscriptionModelPublic)
  transcription_model?: TranscriptionModelPublic | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  data_retention_days?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_id?: string | null;
}

export class AppRunInput {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  files!: FilePublic[];
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  text!: string | null;
}

export class AppRunPublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => AppRunInput)
  input!: AppRunInput;
  @IsDefined()
  @IsEnum(Status)
  status!: Status;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  finished_at!: string | null;
  @IsDefined()
  @ValidateNested()
  @Type(() => UserSparse)
  user!: UserSparse;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  output!: string | null;
}

export class AppRunSparse {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => AppRunInput)
  input!: AppRunInput;
  @IsDefined()
  @IsEnum(Status)
  status!: Status;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  finished_at!: string | null;
  @IsDefined()
  @ValidateNested()
  @Type(() => UserSparse)
  user!: UserSparse;
}

export class AppSparse {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsDefined()
  @IsBoolean()
  published!: boolean;
  @IsDefined()
  @IsString()
  user_id!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_id?: string | null;
}

export class TemplateWizard {
  @IsOptional()
  @IsBoolean()
  required?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  title?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
}

export class AppTemplateWizard {
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @ValidateNested()
  @Type(() => TemplateWizard)
  attachments!: TemplateWizard | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @ValidateNested()
  @Type(() => TemplateWizard)
  collections!: TemplateWizard | null;
}

export class AppTemplateAdminCreate {
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsDefined()
  @IsString()
  category!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  prompt?: string | null;
  @IsOptional()
  @Allow()
  completion_model_kwargs?: Record<string, any>;
  @IsNullable()
  @IsOptional()
  @IsString()
  completion_model_id?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => AppTemplateWizard)
  wizard?: AppTemplateWizard | null;
  @IsDefined()
  @IsString()
  input_type!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_name?: string | null;
}

export class AppTemplateAdminPublic {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  description!: string;
  @IsDefined()
  @IsString()
  category!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  prompt_text?: string | null;
  @IsOptional()
  @Allow()
  completion_model_kwargs?: Record<string, any>;
  @IsNullable()
  @IsOptional()
  @IsString()
  completion_model_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  completion_model_name?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => AppTemplateWizard)
  wizard?: AppTemplateWizard | null;
  @IsDefined()
  @IsString()
  input_type!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_description?: string | null;
  @IsDefined()
  @IsString()
  organization!: string;
  @IsDefined()
  @IsString()
  tenant_id!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  deleted_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  deleted_by_user_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  restored_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  restored_by_user_id?: string | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  original_snapshot?: Record<string, any> | null;
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsDefined()
  @IsString()
  updated_at!: string;
  @IsOptional()
  @IsInt()
  usage_count?: number;
  @IsOptional()
  @IsBoolean()
  is_default?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_name?: string | null;
}

export class AppTemplateAdminListPublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AppTemplateAdminPublic)
  items!: AppTemplateAdminPublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class AppTemplateAdminUpdate {
  @IsNullable()
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  category?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  prompt?: string | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  completion_model_kwargs?: Record<string, any> | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  completion_model_id?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => AppTemplateWizard)
  wizard?: AppTemplateWizard | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_type?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_name?: string | null;
}

export class AppTemplateOrganization {
  @IsDefined()
  @IsString()
  name!: string;
}

export class AppTemplatePublic {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsDefined()
  @IsString()
  updated_at!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  description!: string | null;
  @IsDefined()
  @IsString()
  category!: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => AppInTemplatePublic)
  app!: AppInTemplatePublic;
  @IsDefined()
  @IsString()
  type!: "app";
  @IsDefined()
  @ValidateNested()
  @Type(() => AppTemplateWizard)
  wizard!: AppTemplateWizard;
  @IsDefined()
  @ValidateNested()
  @Type(() => AppTemplateOrganization)
  organization!: AppTemplateOrganization;
  @IsOptional()
  @IsBoolean()
  is_default?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_name?: string | null;
}

export class AppTemplateListPublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AppTemplatePublic)
  items!: AppTemplatePublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class AppTemplateToggleDefaultRequest {
  @IsDefined()
  @IsBoolean()
  is_default!: boolean;
}

export class InputField {
  @IsDefined()
  @IsEnum(InputFieldType)
  type!: InputFieldType;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
}

export class ModelId {
  @IsDefined()
  @IsString()
  id!: string;
}

export class PromptCreate {
  @IsDefined()
  @IsString()
  text!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
}

export class AppUpdateRequest {
  @IsNullable()
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => InputField)
  input_fields?: InputField[] | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  attachments?: ModelId[] | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => PromptCreate)
  prompt?: PromptCreate | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  completion_model?: ModelId | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelKwargs)
  completion_model_kwargs?: ModelKwargs | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  transcription_model?: ModelId | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  data_retention_days?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_id?: string | null;
}

export class PaginatedPermissionsAppSparse {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AppSparse)
  items!: AppSparse[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class AssistantSparse {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelKwargs)
  completion_model_kwargs?: ModelKwargs | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  logging_enabled?: boolean | null;
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsDefined()
  @IsString()
  user_id!: string;
  @IsOptional()
  @IsBoolean()
  published?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  metadata_json?: Record<string, any> | null;
  @IsDefined()
  @IsEnum(AssistantType)
  type!: AssistantType;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  completion_model_id?: string | null;
}

export class PaginatedPermissionsAssistantSparse {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AssistantSparse)
  items!: AssistantSparse[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class GroupChatSparse {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsDefined()
  @IsString()
  updated_at!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  user_id!: string;
  @IsDefined()
  @IsBoolean()
  published!: boolean;
  @IsDefined()
  @IsString()
  type!: "group-chat";
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @Allow()
  metadata_json!: Record<string, any> | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_id?: string | null;
}

export class PaginatedPermissionsGroupChatSparse {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => GroupChatSparse)
  items!: GroupChatSparse[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class ServiceSparse {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsNullable()
  @IsOptional()
  @IsEnum(ServiceSparseOutputFormatEnum)
  output_format?: ServiceSparseOutputFormatEnum | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  json_schema?: Record<string, any> | null;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  prompt!: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelKwargs)
  completion_model_kwargs?: ModelKwargs;
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsDefined()
  @IsString()
  user_id!: string;
}

export class PaginatedPermissionsServiceSparse {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ServiceSparse)
  items!: ServiceSparse[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class Applications {
  @IsDefined()
  @ValidateNested()
  @Type(() => PaginatedPermissionsAssistantSparse)
  assistants!: PaginatedPermissionsAssistantSparse;
  @IsDefined()
  @ValidateNested()
  @Type(() => PaginatedPermissionsGroupChatSparse)
  group_chats!: PaginatedPermissionsGroupChatSparse;
  @IsDefined()
  @ValidateNested()
  @Type(() => PaginatedPermissionsServiceSparse)
  services!: PaginatedPermissionsServiceSparse;
  @IsDefined()
  @ValidateNested()
  @Type(() => PaginatedPermissionsAppSparse)
  apps!: PaginatedPermissionsAppSparse;
}

export class AskAnalysis {
  @IsDefined()
  @IsString()
  question!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  completion_model_id?: string | null;
  @IsOptional()
  @IsBoolean()
  stream?: boolean;
}

export class ToolAssistant {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  handle!: string;
}

export class UseTools {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ToolAssistant)
  assistants!: ToolAssistant[];
}

export class AskAssistant {
  @IsDefined()
  @IsString()
  question!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  session_id?: string | null;
  @IsOptional()
  @IsString({ each: true })
  files?: string[];
  @IsOptional()
  @IsBoolean()
  stream?: boolean;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => UseTools)
  tools?: UseTools | null;
}

export class CompletionModelPublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  nickname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  family?: string | null;
  @IsDefined()
  @IsInt()
  max_input_tokens!: number;
  @IsDefined()
  @IsInt()
  max_output_tokens!: number;
  @IsDefined()
  @IsBoolean()
  is_deprecated!: boolean;
  @IsNullable()
  @IsOptional()
  @IsInt()
  nr_billion_parameters?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hf_link?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  stability?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hosting?: string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  open_source?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  deployment_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  org?: string | null;
  @IsDefined()
  @IsBoolean()
  vision!: boolean;
  @IsDefined()
  @IsBoolean()
  reasoning!: boolean;
  @IsOptional()
  @IsBoolean()
  supports_tool_calling?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  base_url?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  litellm_model_name?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => SupportedModelKwargs)
  model_kwargs_capabilities?: SupportedModelKwargs | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_cost_per_token?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  output_cost_per_token?: string | null;
  @IsOptional()
  @IsBoolean()
  is_org_enabled?: boolean;
  @IsOptional()
  @IsBoolean()
  is_org_default?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  tenant_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_type?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  migrated_to_model_id?: string | null;
  @IsOptional()
  @IsBoolean()
  can_access?: boolean;
  @IsOptional()
  @IsBoolean()
  is_locked?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  lock_reason?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  credential_provider?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => SecurityClassificationPublic)
  security_classification?: SecurityClassificationPublic | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  deprecation_date?: string | null;
  @IsDefined()
  @IsInt()
  token_limit!: number;
  @IsDefined()
  @ValidateNested()
  @Type(() => SupportedModelKwargs)
  supported_model_kwargs!: SupportedModelKwargs;
}

export class InfoBlobMetadata {
  @IsNullable()
  @IsOptional()
  @IsString()
  url?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  title?: string | null;
  @IsDefined()
  @IsString()
  embedding_model_id!: string;
  @IsDefined()
  @IsInt()
  size!: number;
}

export class InfoBlobAskAssistantPublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => InfoBlobMetadata)
  metadata!: InfoBlobMetadata;
  @IsNullable()
  @IsOptional()
  @IsString()
  group_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  website_id?: string | null;
  @IsDefined()
  @IsInt()
  score!: number;
}

export class WebSearchResultPublic {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  title!: string;
  @IsDefined()
  @IsString()
  url!: string;
}

export class AskResponse {
  @IsDefined()
  @IsString()
  session_id!: string;
  @IsDefined()
  @IsString()
  question!: string;
  @IsDefined()
  @IsString()
  answer!: string;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  files!: FilePublic[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  generated_files!: FilePublic[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => InfoBlobAskAssistantPublic)
  references!: InfoBlobAskAssistantPublic[];
  @IsDefined()
  @ValidateNested()
  @Type(() => UseTools)
  tools!: UseTools;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => WebSearchResultPublic)
  web_search_references!: WebSearchResultPublic[];
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => CompletionModelPublic)
  model?: CompletionModelPublic | null;
}

export class AssistantActivityStats {
  @IsDefined()
  @IsInt()
  active_assistant_count!: number;
  @IsDefined()
  @IsInt()
  total_trackable_assistants!: number;
  @IsDefined()
  @IsInt()
  active_assistant_pct!: number;
  @IsDefined()
  @IsInt()
  active_user_count!: number;
}

export class AssistantGuard {
  @IsOptional()
  @IsBoolean()
  guardrail_active?: boolean;
  @IsOptional()
  @IsString()
  guardrail_string?: string;
  @IsOptional()
  @IsString()
  on_fail_message?: string;
}

export class AssistantCreatePublic {
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelKwargs)
  completion_model_kwargs?: ModelKwargs | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  logging_enabled?: boolean | null;
  @IsDefined()
  @IsString()
  space_id!: string;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => PromptCreate)
  prompt?: PromptCreate | null;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  groups?: ModelId[];
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  websites?: ModelId[];
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  integration_knowledge_list?: ModelId[];
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  mcp_servers?: ModelId[];
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => AssistantGuard)
  guardrail?: AssistantGuard | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  completion_model?: ModelId | null;
}

export class CompletionModelPublicAssistantTemplate {
  @IsDefined()
  @IsString()
  id!: string;
}

export class PromptPublicAssistantTemplate {
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  text!: string | null;
}

export class AssistantInTemplatePublic {
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @ValidateNested()
  @Type(() => CompletionModelPublicAssistantTemplate)
  completion_model!: CompletionModelPublicAssistantTemplate | null;
  @IsOptional()
  @Allow()
  completion_model_kwargs?: Record<string, any>;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @ValidateNested()
  @Type(() => PromptPublicAssistantTemplate)
  prompt!: PromptPublicAssistantTemplate | null;
}

export class AssistantInsightQuestion {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  question!: string;
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsDefined()
  @IsString()
  session_id!: string;
}

export class AssistantMetadata {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  created_at!: string;
}

export class CollectionMetadata {
  @IsDefined()
  @IsInt()
  num_info_blobs!: number;
  @IsDefined()
  @IsInt()
  size!: number;
}

export class EmbeddingModelPublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  nickname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  family?: string | null;
  @IsDefined()
  @IsBoolean()
  is_deprecated!: boolean;
  @IsDefined()
  @IsBoolean()
  open_source!: boolean;
  @IsNullable()
  @IsOptional()
  @IsInt()
  dimensions?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_input?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hf_link?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  stability?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hosting?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  org?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  litellm_model_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_cost_per_token?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  output_cost_per_token?: string | null;
  @IsOptional()
  @IsBoolean()
  can_access?: boolean;
  @IsOptional()
  @IsBoolean()
  is_locked?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  lock_reason?: string | null;
  @IsOptional()
  @IsBoolean()
  is_org_enabled?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  credential_provider?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => SecurityClassificationPublic)
  security_classification?: SecurityClassificationPublic | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  tenant_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_type?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  deprecation_date?: string | null;
}

export class CollectionPublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => EmbeddingModelPublic)
  embedding_model!: EmbeddingModelPublic;
  @IsDefined()
  @ValidateNested()
  @Type(() => CollectionMetadata)
  metadata!: CollectionMetadata;
  @IsDefined()
  @IsString()
  space_id!: string;
}

export class EmbeddingModelPublicLegacy {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  family?: string | null;
  @IsDefined()
  @IsBoolean()
  is_deprecated!: boolean;
  @IsDefined()
  @IsBoolean()
  open_source!: boolean;
  @IsNullable()
  @IsOptional()
  @IsInt()
  dimensions?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_input?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_batch_size?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hf_link?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  stability?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hosting?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  org?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  litellm_model_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_cost_per_token?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  output_cost_per_token?: string | null;
  @IsOptional()
  @IsBoolean()
  is_org_enabled?: boolean;
  @IsOptional()
  @IsBoolean()
  can_access?: boolean;
  @IsOptional()
  @IsBoolean()
  is_locked?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  lock_reason?: string | null;
}

export class IntegrationKnowledgeMetaData {
  @IsDefined()
  @IsInt()
  size!: number;
  @IsNullable()
  @IsOptional()
  @Allow()
  last_sync_summary?: Record<string, any> | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  last_synced_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  sharepoint_subscription_expires_at?: string | null;
}

export class IntegrationKnowledgePublic {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  original_name?: string | null;
  @IsDefined()
  @IsString()
  url!: string;
  @IsDefined()
  @IsString()
  tenant_id!: string;
  @IsDefined()
  @IsString()
  space_id!: string;
  @IsDefined()
  @IsString()
  user_integration_id!: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => EmbeddingModelPublicLegacy)
  embedding_model!: EmbeddingModelPublicLegacy;
  @IsNullable()
  @IsOptional()
  @IsString()
  site_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  drive_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  resource_type?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  sharepoint_subscription_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  folder_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  folder_path?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  selected_item_type?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  wrapper_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  wrapper_name?: string | null;
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsDefined()
  @ValidateNested()
  @Type(() => IntegrationKnowledgeMetaData)
  metadata!: IntegrationKnowledgeMetaData;
  @IsDefined()
  @IsEnum(IntegrationKnowledgePublicIntegrationTypeEnum)
  integration_type!: IntegrationKnowledgePublicIntegrationTypeEnum;
  @IsDefined()
  @Allow()
  task!: any;
}

export class MCPServerPublicDict {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  description!: string | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  http_url!: string | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  http_auth_type!: string | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString({ each: true })
  tags!: string[] | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  icon_url!: string | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @Allow()
  security_classification!: Record<string, any> | null;
  @IsDefined()
  @Allow()
  tools!: Record<string, any>[];
}

export class MCPToolSetting {
  @IsDefined()
  @IsString()
  tool_id!: string;
  @IsDefined()
  @IsBoolean()
  is_enabled!: boolean;
}

export class ModelInfo {
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsInt()
  max_input_tokens!: number;
  @IsDefined()
  @IsInt()
  max_output_tokens!: number;
  @IsNullable()
  @IsOptional()
  @IsInt()
  prompt_tokens?: number | null;
  @IsDefined()
  @IsInt()
  token_limit!: number;
}

export class WebsiteMetadata {
  @IsDefined()
  @IsInt()
  size!: number;
}

export class IntricWebsitesPresentationWebsiteModelsCrawlRunPublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsInt()
  pages_crawled!: number | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsInt()
  files_downloaded!: number | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsInt()
  pages_failed!: number | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsInt()
  files_failed!: number | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  failure_summary?: Record<string, number> | null;
  @IsDefined()
  @IsEnum(Status)
  status!: Status;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  result_location!: string | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  finished_at!: string | null;
}

export class WebsitePublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  name!: string | null;
  @IsDefined()
  @IsString()
  url!: string;
  @IsDefined()
  @IsString()
  space_id!: string;
  @IsDefined()
  @IsBoolean()
  download_files!: boolean;
  @IsDefined()
  @IsEnum(CrawlType)
  crawl_type!: CrawlType;
  @IsDefined()
  @IsEnum(UpdateInterval)
  update_interval!: UpdateInterval;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @ValidateNested()
  @Type(() => IntricWebsitesPresentationWebsiteModelsCrawlRunPublic)
  latest_crawl!: IntricWebsitesPresentationWebsiteModelsCrawlRunPublic | null;
  @IsDefined()
  @ValidateNested()
  @Type(() => EmbeddingModelPublic)
  embedding_model!: EmbeddingModelPublic;
  @IsDefined()
  @ValidateNested()
  @Type(() => WebsiteMetadata)
  metadata!: WebsiteMetadata;
  @IsDefined()
  @IsBoolean()
  requires_http_auth!: boolean;
  @IsOptional()
  @IsInt()
  consecutive_failures?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  next_retry_at?: string | null;
  @IsDefined()
  @IsBoolean()
  is_auto_disabled!: boolean;
}

export class AssistantPublic {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => PromptPublic)
  prompt?: PromptPublic | null;
  @IsDefined()
  @IsString()
  space_id!: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => ModelKwargs)
  completion_model_kwargs!: ModelKwargs;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsBoolean()
  logging_enabled!: boolean | null;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  attachments!: FilePublic[];
  @IsDefined()
  @ValidateNested()
  @Type(() => FileRestrictions)
  allowed_attachments!: FileRestrictions;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => CollectionPublic)
  groups!: CollectionPublic[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => WebsitePublic)
  websites!: WebsitePublic[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => IntegrationKnowledgePublic)
  integration_knowledge_list!: IntegrationKnowledgePublic[];
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MCPServerPublicDict)
  mcp_servers?: MCPServerPublicDict[];
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MCPToolSetting)
  mcp_tools?: MCPToolSetting[];
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => CompletionModelSparse)
  completion_model?: CompletionModelSparse | null;
  @IsOptional()
  @IsBoolean()
  published?: boolean;
  @IsDefined()
  @ValidateNested()
  @Type(() => UserSparse)
  user!: UserSparse;
  @IsDefined()
  @ValidateNested()
  @Type(() => UseTools)
  tools!: UseTools;
  @IsDefined()
  @IsEnum(AssistantType)
  type!: AssistantType;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelInfo)
  model_info?: ModelInfo | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_id?: string | null;
  @IsDefined()
  @IsBoolean()
  insight_enabled!: boolean;
  @IsNullable()
  @IsOptional()
  @IsInt()
  data_retention_days?: number | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  metadata_json?: Record<string, any> | null;
  @IsOptional()
  @IsBoolean()
  is_help_assistant?: boolean;
}

export class AssistantTemplateWizard {
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @ValidateNested()
  @Type(() => TemplateWizard)
  attachments!: TemplateWizard | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @ValidateNested()
  @Type(() => TemplateWizard)
  collections!: TemplateWizard | null;
}

export class AssistantTemplateAdminCreate {
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsDefined()
  @IsString()
  category!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  prompt?: string | null;
  @IsOptional()
  @Allow()
  completion_model_kwargs?: Record<string, any>;
  @IsNullable()
  @IsOptional()
  @IsString()
  completion_model_id?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => AssistantTemplateWizard)
  wizard?: AssistantTemplateWizard | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_name?: string | null;
}

export class AssistantTemplateAdminPublic {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  description!: string;
  @IsDefined()
  @IsString()
  category!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  prompt_text?: string | null;
  @IsOptional()
  @Allow()
  completion_model_kwargs?: Record<string, any>;
  @IsNullable()
  @IsOptional()
  @IsString()
  completion_model_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  completion_model_name?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => AssistantTemplateWizard)
  wizard?: AssistantTemplateWizard | null;
  @IsDefined()
  @IsString()
  organization!: string;
  @IsDefined()
  @IsString()
  tenant_id!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  deleted_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  deleted_by_user_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  restored_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  restored_by_user_id?: string | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  original_snapshot?: Record<string, any> | null;
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsDefined()
  @IsString()
  updated_at!: string;
  @IsOptional()
  @IsInt()
  usage_count?: number;
  @IsOptional()
  @IsBoolean()
  is_default?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_name?: string | null;
}

export class AssistantTemplateAdminListPublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AssistantTemplateAdminPublic)
  items!: AssistantTemplateAdminPublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class AssistantTemplateAdminUpdate {
  @IsNullable()
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  category?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  prompt?: string | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  completion_model_kwargs?: Record<string, any> | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  completion_model_id?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => AssistantTemplateWizard)
  wizard?: AssistantTemplateWizard | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_name?: string | null;
}

export class AssistantTemplateOrganization {
  @IsDefined()
  @IsString()
  name!: string;
}

export class AssistantTemplatePublic {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsDefined()
  @IsString()
  updated_at!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  description!: string;
  @IsDefined()
  @IsString()
  category!: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => AssistantInTemplatePublic)
  assistant!: AssistantInTemplatePublic;
  @IsDefined()
  @IsString()
  type!: "assistant";
  @IsDefined()
  @ValidateNested()
  @Type(() => AssistantTemplateWizard)
  wizard!: AssistantTemplateWizard;
  @IsDefined()
  @ValidateNested()
  @Type(() => AssistantTemplateOrganization)
  organization!: AssistantTemplateOrganization;
  @IsOptional()
  @IsBoolean()
  is_default?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_name?: string | null;
}

export class AssistantTemplateListPublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AssistantTemplatePublic)
  items!: AssistantTemplatePublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class AssistantTemplateToggleDefaultRequest {
  @IsDefined()
  @IsBoolean()
  is_default!: boolean;
}

export class FormatLimit {
  @IsDefined()
  @IsString()
  mimetype!: string;
  @IsDefined()
  @IsInt()
  size!: number;
  @IsDefined()
  @IsString({ each: true })
  extensions!: string[];
  @IsDefined()
  @IsBoolean()
  vision!: boolean;
}

export class AttachmentLimits {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FormatLimit)
  formats!: FormatLimit[];
}

export class CategoryConfig {
  @IsDefined()
  @IsEnum(CategoryType)
  category!: CategoryType;
  @IsDefined()
  @IsBoolean()
  enabled!: boolean;
  @IsDefined()
  @IsInt()
  action_count!: number;
  @IsDefined()
  @IsString({ each: true })
  example_actions!: string[];
}

export class AuditConfigResponse {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => CategoryConfig)
  categories!: CategoryConfig[];
}

export class CategoryUpdate {
  @IsDefined()
  @IsString()
  category!: string;
  @IsDefined()
  @IsBoolean()
  enabled!: boolean;
}

export class AuditConfigUpdateRequest {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => CategoryUpdate)
  updates!: CategoryUpdate[];
}

export class AuditLogResponse {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  tenant_id!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  actor_id?: string | null;
  @IsDefined()
  @IsEnum(ActorType)
  actor_type!: ActorType;
  @IsDefined()
  @IsEnum(ActionType)
  action!: ActionType;
  @IsDefined()
  @IsEnum(EntityType)
  entity_type!: EntityType;
  @IsDefined()
  @IsString()
  entity_id!: string;
  @IsDefined()
  @IsString()
  timestamp!: string;
  @IsDefined()
  @IsString()
  description!: string;
  @IsDefined()
  @Allow()
  metadata!: Record<string, any>;
  @IsDefined()
  @IsEnum(Outcome)
  outcome!: Outcome;
  @IsNullable()
  @IsOptional()
  @IsString()
  ip_address?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  user_agent?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  request_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  error_message?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  deleted_at?: string | null;
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsDefined()
  @IsString()
  updated_at!: string;
}

export class AuditLogListResponse {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AuditLogResponse)
  logs!: AuditLogResponse[];
  @IsDefined()
  @IsInt()
  total_count!: number;
  @IsDefined()
  @IsInt()
  page!: number;
  @IsDefined()
  @IsInt()
  page_size!: number;
  @IsDefined()
  @IsInt()
  total_pages!: number;
}

export class AuthCallbackParams {
  @IsDefined()
  @IsString()
  auth_code!: string;
  @IsDefined()
  @IsString()
  tenant_integration_id!: string;
}

export class AuthUrlPublic {
  @IsDefined()
  @IsString()
  auth_url!: string;
}

export class AvailabilityResponse {
  @IsDefined()
  @IsBoolean()
  available!: boolean;
  @IsNullable()
  @IsOptional()
  @IsEnum(AvailabilityResponseDisabledReasonEnum)
  disabled_reason?: AvailabilityResponseDisabledReasonEnum | null;
}

export class BodyLoginApiV1UsersLoginTokenPost {
  @IsNullable()
  @IsOptional()
  @IsString()
  grant_type?: string | null;
  @IsDefined()
  @IsString()
  username!: string;
  @IsDefined()
  @IsString()
  password!: string;
  @IsOptional()
  @IsString()
  scope?: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  client_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  client_secret?: string | null;
}

export class BodyCreateIconApiV1IconsPost {
  @IsDefined()
  @Allow()
  file!: File;
}

export class BodyUploadFileApiV1FilesPost {
  @IsDefined()
  @Allow()
  upload_file!: File;
}

export class BodyUploadFileApiV1GroupsIdInfoBlobsUploadPost {
  @IsDefined()
  @Allow()
  file!: File;
}

export class BulkCrawlRequest {
  @IsDefined()
  @IsString({ each: true })
  website_ids!: string[];
}

export class BulkCrawlResponse {
  @IsDefined()
  @IsInt()
  total!: number;
  @IsDefined()
  @IsInt()
  queued!: number;
  @IsDefined()
  @IsInt()
  failed!: number;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => IntricWebsitesPresentationWebsiteModelsCrawlRunPublic)
  crawl_runs!: IntricWebsitesPresentationWebsiteModelsCrawlRunPublic[];
  @IsDefined()
  @Allow()
  errors!: Record<string, string>[];
}

export class CallbackRequest {
  @IsDefined()
  @IsString()
  code!: string;
  @IsDefined()
  @IsString()
  state!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  code_verifier?: string | null;
}

export class CollectionUpdate {
  @IsDefined()
  @IsString()
  name!: string;
}

export class CompletionModel {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  nickname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  family?: string | null;
  @IsDefined()
  @IsInt()
  max_input_tokens!: number;
  @IsDefined()
  @IsInt()
  max_output_tokens!: number;
  @IsDefined()
  @IsBoolean()
  is_deprecated!: boolean;
  @IsNullable()
  @IsOptional()
  @IsInt()
  nr_billion_parameters?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hf_link?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  stability?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hosting?: string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  open_source?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  deployment_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  org?: string | null;
  @IsDefined()
  @IsBoolean()
  vision!: boolean;
  @IsDefined()
  @IsBoolean()
  reasoning!: boolean;
  @IsOptional()
  @IsBoolean()
  supports_tool_calling?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  base_url?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  litellm_model_name?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => SupportedModelKwargs)
  model_kwargs_capabilities?: SupportedModelKwargs | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_cost_per_token?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  output_cost_per_token?: string | null;
  @IsOptional()
  @IsBoolean()
  is_org_enabled?: boolean;
  @IsOptional()
  @IsBoolean()
  is_org_default?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  tenant_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_type?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  migrated_to_model_id?: string | null;
  @IsDefined()
  @IsInt()
  token_limit!: number;
  @IsDefined()
  @ValidateNested()
  @Type(() => SupportedModelKwargs)
  supported_model_kwargs!: SupportedModelKwargs;
}

export class CompletionModelCreate {
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  nickname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  family?: string | null;
  @IsDefined()
  @IsInt()
  max_input_tokens!: number;
  @IsDefined()
  @IsInt()
  max_output_tokens!: number;
  @IsDefined()
  @IsBoolean()
  is_deprecated!: boolean;
  @IsNullable()
  @IsOptional()
  @IsInt()
  nr_billion_parameters?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hf_link?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  stability?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hosting?: string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  open_source?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  deployment_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  org?: string | null;
  @IsDefined()
  @IsBoolean()
  vision!: boolean;
  @IsDefined()
  @IsBoolean()
  reasoning!: boolean;
  @IsOptional()
  @IsBoolean()
  supports_tool_calling?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  base_url?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  litellm_model_name?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => SupportedModelKwargs)
  model_kwargs_capabilities?: SupportedModelKwargs | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_cost_per_token?: number | string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  output_cost_per_token?: number | string | null;
}

export class CompletionModelSecurityStatus {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  nickname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  family?: string | null;
  @IsDefined()
  @IsInt()
  max_input_tokens!: number;
  @IsDefined()
  @IsInt()
  max_output_tokens!: number;
  @IsDefined()
  @IsBoolean()
  is_deprecated!: boolean;
  @IsNullable()
  @IsOptional()
  @IsInt()
  nr_billion_parameters?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hf_link?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  stability?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hosting?: string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  open_source?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  deployment_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  org?: string | null;
  @IsDefined()
  @IsBoolean()
  vision!: boolean;
  @IsDefined()
  @IsBoolean()
  reasoning!: boolean;
  @IsOptional()
  @IsBoolean()
  supports_tool_calling?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  base_url?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  litellm_model_name?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => SupportedModelKwargs)
  model_kwargs_capabilities?: SupportedModelKwargs | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_cost_per_token?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  output_cost_per_token?: string | null;
  @IsOptional()
  @IsBoolean()
  is_org_enabled?: boolean;
  @IsOptional()
  @IsBoolean()
  is_org_default?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  tenant_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_type?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  migrated_to_model_id?: string | null;
  @IsOptional()
  @IsBoolean()
  can_access?: boolean;
  @IsOptional()
  @IsBoolean()
  is_locked?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  lock_reason?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  credential_provider?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => SecurityClassificationPublic)
  security_classification?: SecurityClassificationPublic | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  deprecation_date?: string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  meets_security_classification?: boolean | null;
  @IsDefined()
  @IsInt()
  token_limit!: number;
  @IsDefined()
  @ValidateNested()
  @Type(() => SupportedModelKwargs)
  supported_model_kwargs!: SupportedModelKwargs;
}

export class CompletionModelUpdateFlags {
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  is_org_enabled?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  is_org_default?: boolean | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  security_classification?: ModelId | null;
}

export class ContinueTurnRequest {
  @IsDefined()
  @IsString()
  question!: string;
  @IsOptional()
  @IsBoolean()
  stream?: boolean;
}

export class ConversationInsightResponse {
  @IsDefined()
  @IsInt()
  total_conversations!: number;
  @IsDefined()
  @IsInt()
  total_questions!: number;
}

export class ConversationRenameRequest {
  @IsDefined()
  @IsString()
  name!: string;
}

export class ConversationRequest {
  @IsNullable()
  @IsOptional()
  @IsString()
  session_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  assistant_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  group_chat_id?: string | null;
  @IsDefined()
  @IsString()
  question!: string;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  files?: ModelId[];
  @IsOptional()
  @IsBoolean()
  stream?: boolean;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => UseTools)
  tools?: UseTools | null;
  @IsOptional()
  @IsBoolean()
  use_web_search?: boolean;
  @IsOptional()
  @IsBoolean()
  require_tool_approval?: boolean;
}

export class Counts {
  @IsDefined()
  @IsInt()
  assistants!: number;
  @IsDefined()
  @IsInt()
  sessions!: number;
  @IsDefined()
  @IsInt()
  questions!: number;
}

export class CrawlerActivity {
  @IsNullable()
  @IsOptional()
  @IsInt()
  db_in_progress?: number | null;
  @IsOptional()
  @IsBoolean()
  db_query_ok?: boolean;
  @IsOptional()
  @IsInt()
  arq_ongoing?: number;
  @IsNullable()
  @IsOptional()
  @IsInt()
  delta?: number | null;
}

export class DebugInfo {
  @IsOptional()
  @IsString()
  arq_raw?: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  arq_timestamp?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  watchdog_timestamp?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  redis_db?: number | null;
  @IsOptional()
  @IsString()
  queue_name?: string;
}

export class FeederLeader {
  @IsNullable()
  @IsOptional()
  @IsString()
  leader_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  leader_ttl_seconds?: number | null;
  @IsOptional()
  @IsString()
  status?: string;
}

export class HealthThresholds {
  @IsDefined()
  @IsInt()
  feeder_interval_seconds!: number;
  @IsDefined()
  @IsInt()
  watchdog_stale_threshold_seconds!: number;
  @IsDefined()
  @IsInt()
  heartbeat_ttl_expected_seconds!: number;
}

export class PendingQueueSummary {
  @IsOptional()
  @IsInt()
  total?: number;
  @IsOptional()
  @IsInt()
  tenant_count?: number;
  @IsOptional()
  @Allow()
  top_tenants?: Record<string, number>;
}

export class WatchdogMetrics {
  @IsNullable()
  @IsOptional()
  @IsInt()
  age_seconds?: number | null;
  @IsOptional()
  @IsInt()
  zombies_reconciled?: number;
  @IsOptional()
  @IsInt()
  expired_killed?: number;
  @IsOptional()
  @IsInt()
  rescued?: number;
  @IsOptional()
  @IsInt()
  early_zombies_failed?: number;
  @IsOptional()
  @IsInt()
  long_running_failed?: number;
  @IsOptional()
  @IsInt()
  slots_released?: number;
}

export class CrawlerHealthResponse {
  @IsDefined()
  @IsString()
  status!: string;
  @IsOptional()
  @IsString({ each: true })
  status_flags?: string[];
  @IsOptional()
  @IsString()
  status_reason?: string;
  @IsDefined()
  @IsString()
  response_timestamp_utc!: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => CrawlerActivity)
  crawler_activity?: CrawlerActivity;
  @IsOptional()
  @ValidateNested()
  @Type(() => ARQHealth)
  arq?: ARQHealth;
  @IsOptional()
  @ValidateNested()
  @Type(() => WatchdogMetrics)
  watchdog?: WatchdogMetrics;
  @IsOptional()
  @ValidateNested()
  @Type(() => FeederLeader)
  feeder?: FeederLeader;
  @IsOptional()
  @ValidateNested()
  @Type(() => PendingQueueSummary)
  pending?: PendingQueueSummary;
  @IsDefined()
  @ValidateNested()
  @Type(() => HealthThresholds)
  thresholds!: HealthThresholds;
  @IsOptional()
  @ValidateNested()
  @Type(() => DebugInfo)
  debug?: DebugInfo;
}

export class CrawlerSettingsResponse {
  @IsDefined()
  @IsString()
  tenant_id!: string;
  @IsDefined()
  @Allow()
  settings!: Record<string, any>;
  @IsDefined()
  @IsString({ each: true })
  overrides!: string[];
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
}

export class CrawlerSettingsUpdate {
  @IsNullable()
  @IsOptional()
  @IsInt()
  crawl_max_length?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  download_timeout?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  download_max_size?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  dns_timeout?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  retry_times?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  closespider_itemcount?: number | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  obey_robots?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  autothrottle_enabled?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  tenant_worker_concurrency_limit?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  crawl_stale_threshold_minutes?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  crawl_heartbeat_interval_seconds?: number | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  crawl_feeder_enabled?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  crawl_feeder_interval_seconds?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  crawl_feeder_batch_size?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  crawl_job_max_age_seconds?: number | null;
}

export class CreateGroupRequest {
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => ModelId)
  embedding_model!: ModelId;
}

export class TemplateCreate {
  @IsDefined()
  @IsString()
  id!: string;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AdditionalField)
  additional_fields!: AdditionalField[] | null;
}

export class CreateSpaceAppRequest {
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => TemplateCreate)
  from_template?: TemplateCreate | null;
}

export class CreateSpaceAssistantRequest {
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => TemplateCreate)
  from_template?: TemplateCreate | null;
}

export class CreateSpaceGroupsRequest {
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  embedding_model?: ModelId | null;
}

export class CreateSpaceIntegrationKnowledge {
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => ModelId)
  embedding_model!: ModelId;
  @IsDefined()
  @IsString()
  url!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  key?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  folder_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  folder_path?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  selected_item_type?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  resource_type?: string | null;
}

export class CreateSpaceIntegrationKnowledgeBatchItem {
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  url!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  key?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  folder_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  folder_path?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  selected_item_type?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  resource_type?: string | null;
}

export class CreateSpaceIntegrationKnowledgeBatchRequest {
  @IsDefined()
  @ValidateNested()
  @Type(() => ModelId)
  embedding_model!: ModelId;
  @IsNullable()
  @IsOptional()
  @IsString()
  wrapper_name?: string | null;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => CreateSpaceIntegrationKnowledgeBatchItem)
  items!: CreateSpaceIntegrationKnowledgeBatchItem[];
}

export class JobPublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsDefined()
  @IsEnum(Status)
  status!: Status;
  @IsDefined()
  @IsEnum(Task)
  task!: Task;
  @IsNullable()
  @IsOptional()
  @IsString()
  result_location?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  finished_at?: string | null;
}

export class CreateSpaceIntegrationKnowledgeBatchResult {
  @IsDefined()
  @IsInt()
  index!: number;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsEnum(CreateSpaceIntegrationKnowledgeBatchResultStatusEnum)
  status!: CreateSpaceIntegrationKnowledgeBatchResultStatusEnum;
  @IsNullable()
  @IsOptional()
  @IsString()
  integration_knowledge_id?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => JobPublic)
  job?: JobPublic | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  error?: string | null;
}

export class CreateSpaceIntegrationKnowledgeBatchResponse {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => CreateSpaceIntegrationKnowledgeBatchResult)
  items!: CreateSpaceIntegrationKnowledgeBatchResult[];
  @IsDefined()
  @IsInt()
  created_count!: number;
  @IsDefined()
  @IsInt()
  failed_count!: number;
}

export class CreateSpaceRequest {
  @IsDefined()
  @IsString()
  name!: string;
}

export class CreateSpaceServiceRequest {
  @IsDefined()
  @IsString()
  name!: string;
}

export class GroupMetadata {
  @IsDefined()
  @IsInt()
  num_info_blobs!: number;
  @IsDefined()
  @IsInt()
  size!: number;
}

export class GroupPublicWithMetadata {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => EmbeddingModelPublic)
  embedding_model!: EmbeddingModelPublic;
  @IsDefined()
  @IsString()
  space_id!: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => GroupMetadata)
  metadata!: GroupMetadata;
}

export class CreateSpaceServiceResponse {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  prompt!: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => ModelKwargs)
  completion_model_kwargs!: ModelKwargs;
  @IsNullable()
  @IsOptional()
  @IsEnum(CreateSpaceServiceResponseOutputFormatEnum)
  output_format?: CreateSpaceServiceResponseOutputFormatEnum | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  json_schema?: Record<string, any> | null;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => GroupPublicWithMetadata)
  groups!: GroupPublicWithMetadata[];
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @ValidateNested()
  @Type(() => CompletionModelSparse)
  completion_model!: CompletionModelSparse | null;
  @IsOptional()
  @IsBoolean()
  published?: boolean;
  @IsDefined()
  @ValidateNested()
  @Type(() => UserSparse)
  user!: UserSparse;
}

export class CursorPaginatedResponseApiKeyV2 {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ApiKeyV2)
  items!: ApiKeyV2[];
  @IsNullable()
  @IsOptional()
  @IsInt()
  limit?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  next_cursor?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  previous_cursor?: string | null;
  @IsDefined()
  @IsInt()
  total_count!: number;
  @IsDefined()
  @IsInt()
  count!: number;
}

export class CursorPaginatedResponseAssistantInsightQuestion {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AssistantInsightQuestion)
  items!: AssistantInsightQuestion[];
  @IsNullable()
  @IsOptional()
  @IsInt()
  limit?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  next_cursor?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  previous_cursor?: string | null;
  @IsDefined()
  @IsInt()
  total_count!: number;
  @IsDefined()
  @IsInt()
  count!: number;
}

export class SessionMetadataPublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  id!: string;
}

export class CursorPaginatedResponseSessionMetadataPublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => SessionMetadataPublic)
  items!: SessionMetadataPublic[];
  @IsNullable()
  @IsOptional()
  @IsInt()
  limit?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  next_cursor?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  previous_cursor?: string | null;
  @IsDefined()
  @IsInt()
  total_count!: number;
  @IsDefined()
  @IsInt()
  count!: number;
}

export class CursorPaginatedResponseUserSparse {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => UserSparse)
  items!: UserSparse[];
  @IsNullable()
  @IsOptional()
  @IsInt()
  limit?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  next_cursor?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  previous_cursor?: string | null;
  @IsDefined()
  @IsInt()
  total_count!: number;
  @IsDefined()
  @IsInt()
  count!: number;
}

export class DefaultAssistant {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => PromptPublic)
  prompt?: PromptPublic | null;
  @IsDefined()
  @IsString()
  space_id!: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => ModelKwargs)
  completion_model_kwargs!: ModelKwargs;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsBoolean()
  logging_enabled!: boolean | null;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  attachments!: FilePublic[];
  @IsDefined()
  @ValidateNested()
  @Type(() => FileRestrictions)
  allowed_attachments!: FileRestrictions;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => CollectionPublic)
  groups!: CollectionPublic[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => WebsitePublic)
  websites!: WebsitePublic[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => IntegrationKnowledgePublic)
  integration_knowledge_list!: IntegrationKnowledgePublic[];
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MCPServerPublicDict)
  mcp_servers?: MCPServerPublicDict[];
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MCPToolSetting)
  mcp_tools?: MCPToolSetting[];
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => CompletionModelSparse)
  completion_model?: CompletionModelSparse | null;
  @IsOptional()
  @IsBoolean()
  published?: boolean;
  @IsDefined()
  @ValidateNested()
  @Type(() => UserSparse)
  user!: UserSparse;
  @IsDefined()
  @ValidateNested()
  @Type(() => UseTools)
  tools!: UseTools;
  @IsDefined()
  @IsEnum(AssistantType)
  type!: AssistantType;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelInfo)
  model_info?: ModelInfo | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_id?: string | null;
  @IsOptional()
  @IsBoolean()
  insight_enabled?: boolean;
  @IsNullable()
  @IsOptional()
  @IsInt()
  data_retention_days?: number | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  metadata_json?: Record<string, any> | null;
  @IsOptional()
  @IsBoolean()
  is_help_assistant?: boolean;
}

export class SpaceDashboard {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  description!: string | null;
  @IsDefined()
  @IsBoolean()
  personal!: boolean;
  @IsDefined()
  @IsBoolean()
  organization!: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_id?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => Applications)
  applications?: Applications | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => DefaultAssistant)
  default_assistant?: DefaultAssistant | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  data_retention_days?: number | null;
}

export class PaginatedResponseSpaceDashboard {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => SpaceDashboard)
  items!: SpaceDashboard[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class Dashboard {
  @IsDefined()
  @ValidateNested()
  @Type(() => PaginatedResponseSpaceDashboard)
  spaces!: PaginatedResponseSpaceDashboard;
}

export class DeleteCredentialResponse {
  @IsDefined()
  @IsString()
  tenant_id!: string;
  @IsDefined()
  @IsString()
  provider!: string;
  @IsDefined()
  @IsString()
  message!: string;
}

export class DeleteFederationResponse {
  @IsDefined()
  @IsString()
  tenant_id!: string;
  @IsDefined()
  @IsString()
  message!: string;
}

export class DeleteResponse {
  @IsDefined()
  @IsBoolean()
  success!: boolean;
}

export class DeleteSettingsResponse {
  @IsDefined()
  @IsString()
  tenant_id!: string;
  @IsDefined()
  @IsString()
  message!: string;
  @IsDefined()
  @IsString({ each: true })
  deleted_keys!: string[];
}

export class EmbeddingModelCreate {
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  family?: string | null;
  @IsDefined()
  @IsBoolean()
  is_deprecated!: boolean;
  @IsDefined()
  @IsBoolean()
  open_source!: boolean;
  @IsNullable()
  @IsOptional()
  @IsInt()
  dimensions?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_input?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_batch_size?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hf_link?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  stability?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hosting?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  org?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  litellm_model_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_cost_per_token?: number | string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  output_cost_per_token?: number | string | null;
}

export class EmbeddingModelLegacy {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  family?: string | null;
  @IsDefined()
  @IsBoolean()
  is_deprecated!: boolean;
  @IsDefined()
  @IsBoolean()
  open_source!: boolean;
  @IsNullable()
  @IsOptional()
  @IsInt()
  dimensions?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_input?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_batch_size?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hf_link?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  stability?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hosting?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  org?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  litellm_model_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_cost_per_token?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  output_cost_per_token?: string | null;
  @IsOptional()
  @IsBoolean()
  is_org_enabled?: boolean;
}

export class EmbeddingModelSecurityStatus {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  nickname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  family?: string | null;
  @IsDefined()
  @IsBoolean()
  is_deprecated!: boolean;
  @IsDefined()
  @IsBoolean()
  open_source!: boolean;
  @IsNullable()
  @IsOptional()
  @IsInt()
  dimensions?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_input?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hf_link?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  stability?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hosting?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  org?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  litellm_model_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_cost_per_token?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  output_cost_per_token?: string | null;
  @IsOptional()
  @IsBoolean()
  can_access?: boolean;
  @IsOptional()
  @IsBoolean()
  is_locked?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  lock_reason?: string | null;
  @IsOptional()
  @IsBoolean()
  is_org_enabled?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  credential_provider?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => SecurityClassificationPublic)
  security_classification?: SecurityClassificationPublic | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  tenant_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_type?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  deprecation_date?: string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  meets_security_classification?: boolean | null;
}

export class EmbeddingModelSparse {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  family?: string | null;
  @IsDefined()
  @IsBoolean()
  is_deprecated!: boolean;
  @IsDefined()
  @IsBoolean()
  open_source!: boolean;
  @IsNullable()
  @IsOptional()
  @IsInt()
  dimensions?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_input?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_batch_size?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hf_link?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  stability?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hosting?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  org?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  litellm_model_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_cost_per_token?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  output_cost_per_token?: string | null;
}

export class EmbeddingModelUpdate {
  @IsOptional()
  @IsBoolean()
  is_org_enabled?: boolean;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  security_classification?: ModelId | null;
}

export class EmbeddingModelUpdateFlags {
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  is_org_enabled?: boolean | null;
}

export class ExpiringKeySummaryItem {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  key_suffix?: string | null;
  @IsDefined()
  @IsEnum(ApiKeyScopeType)
  scope_type!: ApiKeyScopeType;
  @IsNullable()
  @IsOptional()
  @IsString()
  scope_id?: string | null;
  @IsDefined()
  @IsString()
  expires_at!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  suspended_at?: string | null;
  @IsDefined()
  @IsEnum(ExpiringKeySummaryItemSeverityEnum)
  severity!: ExpiringKeySummaryItemSeverityEnum;
}

export class ExpiringKeysSummary {
  @IsDefined()
  @IsInt()
  total_count!: number;
  @IsDefined()
  @Allow()
  counts_by_severity!: Record<string, number>;
  @IsNullable()
  @IsOptional()
  @IsString()
  earliest_expiration?: string | null;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ExpiringKeySummaryItem)
  items!: ExpiringKeySummaryItem[];
  @IsDefined()
  @IsBoolean()
  truncated!: boolean;
  @IsDefined()
  @IsString()
  generated_at!: string;
}

export class ExportJobRequest {
  @IsNullable()
  @IsOptional()
  @IsString()
  user_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  actor_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsEnum(ActionType)
  action?: ActionType | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  from_date?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  to_date?: string | null;
  @IsOptional()
  @IsEnum(ExportJobRequestFormatEnum)
  format?: ExportJobRequestFormatEnum;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_records?: number | null;
}

export class ExportJobResponse {
  @IsDefined()
  @IsString()
  job_id!: string;
  @IsDefined()
  @IsString()
  status!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  message?: string | null;
}

export class ExportJobStatusResponse {
  @IsDefined()
  @IsString()
  job_id!: string;
  @IsDefined()
  @IsString()
  status!: string;
  @IsDefined()
  @IsInt()
  progress!: number;
  @IsDefined()
  @IsInt()
  total_records!: number;
  @IsDefined()
  @IsInt()
  processed_records!: number;
  @IsDefined()
  @IsString()
  format!: string;
  @IsNullable()
  @IsOptional()
  @IsInt()
  file_size_bytes?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  error_message?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  download_url?: string | null;
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  started_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  completed_at?: string | null;
  @IsDefined()
  @IsString()
  expires_at!: string;
}

export class FavoriteProvidersUpdate {
  @IsDefined()
  @IsString({ each: true })
  providers!: string[];
}

export class FederationInfo {
  @IsDefined()
  @IsString()
  provider!: string;
  @IsDefined()
  @IsString()
  client_id!: string;
  @IsDefined()
  @IsString()
  masked_secret!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  issuer?: string | null;
  @IsDefined()
  @IsString({ each: true })
  allowed_domains!: string[];
  @IsDefined()
  @IsString({ each: true })
  additional_redirect_uris!: string[];
  @IsDefined()
  @IsString()
  configured_at!: string;
  @IsDefined()
  @IsEnum(FederationInfoEncryptionStatusEnum)
  encryption_status!: FederationInfoEncryptionStatusEnum;
}

export class FederationStatusResponse {
  @IsDefined()
  @IsBoolean()
  has_single_tenant_federation!: boolean;
  @IsDefined()
  @IsBoolean()
  has_multi_tenant_federation!: boolean;
  @IsDefined()
  @IsBoolean()
  has_global_oidc_config!: boolean;
  @IsDefined()
  @IsInt()
  tenant_count!: number;
}

export class GeneralError {
  @IsDefined()
  @IsString()
  message!: string;
  @IsDefined()
  @IsEnum(ErrorCodes)
  intric_error_code!: ErrorCodes;
  @IsNullable()
  @IsOptional()
  @IsString()
  code?: string | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  context?: Record<string, any> | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  request_id?: string | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  details?: Record<string, any> | null;
}

export class GetModelsResponse {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => CompletionModelPublic)
  completion_models!: CompletionModelPublic[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => EmbeddingModelPublicLegacy)
  embedding_models!: EmbeddingModelPublicLegacy[];
}

export class GroupChatAssistantPublic {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  handle!: string;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  default_description!: string | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  user_description!: string | null;
}

export class GroupChatAssistantUpdateSchema {
  @IsDefined()
  @IsString()
  id!: string;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  user_description!: string | null;
}

export class GroupChatCreate {
  @IsDefined()
  @IsString()
  name!: string;
}

export class GroupChatTools {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => GroupChatAssistantPublic)
  assistants!: GroupChatAssistantPublic[];
}

export class GroupChatPublic {
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsDefined()
  @IsString()
  updated_at!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  space_id!: string;
  @IsDefined()
  @IsBoolean()
  allow_mentions!: boolean;
  @IsDefined()
  @IsBoolean()
  show_response_label!: boolean;
  @IsDefined()
  @IsBoolean()
  published!: boolean;
  @IsDefined()
  @IsBoolean()
  insight_enabled!: boolean;
  @IsDefined()
  @ValidateNested()
  @Type(() => GroupChatTools)
  tools!: GroupChatTools;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  attachments!: FilePublic[];
  @IsDefined()
  @ValidateNested()
  @Type(() => FileRestrictions)
  allowed_attachments!: FileRestrictions;
  @IsDefined()
  @IsString()
  type!: "group-chat";
  @IsDefined()
  @IsEnum(ResourcePermission, { each: true })
  permissions!: ResourcePermission[];
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @Allow()
  metadata_json!: Record<string, any> | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_id?: string | null;
}

export class GroupChatUpdateTools {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => GroupChatAssistantUpdateSchema)
  assistants!: GroupChatAssistantUpdateSchema[];
}

export class GroupChatUpdateSchema {
  @IsNullable()
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  space_id?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => GroupChatUpdateTools)
  tools?: GroupChatUpdateTools | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  allow_mentions?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  show_response_label?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  insight_enabled?: boolean | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  metadata_json?: Record<string, any> | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_id?: string | null;
}

export class GroupPublicBase {
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
}

export class ValidationError {
  @IsDefined()
  @IsString({ each: true })
  loc!: (string | number)[];
  @IsDefined()
  @IsString()
  msg!: string;
  @IsDefined()
  @IsString()
  type!: string;
}

export class HTTPValidationError {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ValidationError)
  detail?: ValidationError[];
}

export class HelperRunPublic {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsEnum(HelperKind)
  kind!: HelperKind;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  assistant_id!: string | null;
  @IsDefined()
  @IsString()
  target_type!: string;
  @IsDefined()
  @IsString()
  target_id!: string;
  @IsDefined()
  @IsString()
  session_id!: string;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  actor_user_id!: string | null;
  @IsDefined()
  @IsEnum(HelperRunStatus)
  status!: HelperRunStatus;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  completed_at!: string | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  created_at!: string | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  updated_at!: string | null;
}

export class HelperRunResponsePublic {
  @IsDefined()
  @ValidateNested()
  @Type(() => HelperRunPublic)
  run!: HelperRunPublic;
  @IsDefined()
  @IsString()
  answer!: string;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => InfoBlobAskAssistantPublic)
  references!: InfoBlobAskAssistantPublic[];
  @IsNullable()
  @IsOptional()
  @IsString()
  error?: string | null;
}

export class HelperTemplatePublic {
  @IsDefined()
  @IsEnum(HelperKind)
  kind!: HelperKind;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  description!: string;
}

export class IconPublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
}

export class InfoBlobMetadataUpsertPublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  url?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  title?: string | null;
}

export class InfoBlobAddPublic {
  @IsDefined()
  @IsString()
  text!: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => InfoBlobMetadataUpsertPublic)
  metadata?: InfoBlobMetadataUpsertPublic;
}

export class InfoBlobLimits {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FormatLimit)
  formats!: FormatLimit[];
}

export class InfoBlobPublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => InfoBlobMetadata)
  metadata!: InfoBlobMetadata;
  @IsNullable()
  @IsOptional()
  @IsString()
  group_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  website_id?: string | null;
  @IsDefined()
  @IsString()
  text!: string;
}

export class InfoBlobPublicNoText {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => InfoBlobMetadata)
  metadata!: InfoBlobMetadata;
  @IsNullable()
  @IsOptional()
  @IsString()
  group_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  website_id?: string | null;
}

export class InfoBlobUpdatePublic {
  @IsDefined()
  @ValidateNested()
  @Type(() => InfoBlobMetadataUpsertPublic)
  metadata!: InfoBlobMetadataUpsertPublic;
}

export class InfoBlobUpsertRequest {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => InfoBlobAddPublic)
  info_blobs!: InfoBlobAddPublic[];
}

export class InitiateAuthResponse {
  @IsDefined()
  @IsString()
  authorization_url!: string;
  @IsDefined()
  @IsString()
  state!: string;
}

export class Integration {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  description!: string;
  @IsDefined()
  @IsEnum(IntegrationType)
  integration_type!: IntegrationType;
}

export class IntegrationList {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => Integration)
  items!: Integration[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class IntegrationPreviewData {
  @IsDefined()
  @IsString()
  key!: string;
  @IsDefined()
  @IsString()
  type!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  url!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  category?: string | null;
}

export class IntegrationPreviewDataList {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => IntegrationPreviewData)
  items!: IntegrationPreviewData[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedPermissionsCollectionPublic {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => CollectionPublic)
  items!: CollectionPublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedPermissionsIntegrationKnowledgePublic {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => IntegrationKnowledgePublic)
  items!: IntegrationKnowledgePublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedPermissionsWebsitePublic {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => WebsitePublic)
  items!: WebsitePublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class Knowledge {
  @IsDefined()
  @ValidateNested()
  @Type(() => PaginatedPermissionsCollectionPublic)
  groups!: PaginatedPermissionsCollectionPublic;
  @IsDefined()
  @ValidateNested()
  @Type(() => PaginatedPermissionsWebsitePublic)
  websites!: PaginatedPermissionsWebsitePublic;
  @IsDefined()
  @ValidateNested()
  @Type(() => PaginatedPermissionsIntegrationKnowledgePublic)
  integration_knowledge_list!: PaginatedPermissionsIntegrationKnowledgePublic;
}

export class Limits {
  @IsDefined()
  @ValidateNested()
  @Type(() => InfoBlobLimits)
  info_blobs!: InfoBlobLimits;
  @IsDefined()
  @ValidateNested()
  @Type(() => AttachmentLimits)
  attachments!: AttachmentLimits;
}

export class LoggingDetailsPublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  context?: string | null;
  @IsDefined()
  @Allow()
  model_kwargs!: Record<string, any>;
  @IsDefined()
  @Allow()
  json_body!: any;
}

export class MCPConnectionStatus {
  @IsDefined()
  @IsBoolean()
  success!: boolean;
  @IsOptional()
  @IsInt()
  tools_discovered?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  error_message?: string | null;
}

export class MCPServerCreate {
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  http_url!: string;
  @IsOptional()
  @IsEnum(McpServerCreateHttpAuthTypeEnum)
  http_auth_type?: McpServerCreateHttpAuthTypeEnum;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  http_auth_config_schema?: Record<string, any> | null;
  @IsNullable()
  @IsOptional()
  @IsString({ each: true })
  tags?: string[] | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_url?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  documentation_url?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  security_classification?: ModelId | null;
}

export class MCPServerPublic {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  description!: string | null;
  @IsDefined()
  @IsString()
  http_url!: string;
  @IsDefined()
  @IsString()
  http_auth_type!: string;
  @IsDefined()
  @IsBoolean()
  has_credentials!: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  credential_preview?: string | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString({ each: true })
  tags!: string[] | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  icon_url!: string | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  documentation_url!: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => SecurityClassificationPublic)
  security_classification?: SecurityClassificationPublic | null;
}

export class MCPServerCreateResponse {
  @IsDefined()
  @ValidateNested()
  @Type(() => MCPServerPublic)
  server!: MCPServerPublic;
  @IsDefined()
  @ValidateNested()
  @Type(() => MCPConnectionStatus)
  connection!: MCPConnectionStatus;
}

export class MCPServerSettingsCreate {
  @IsNullable()
  @IsOptional()
  @Allow()
  env_vars?: Record<string, any> | null;
}

export class MCPServerToolPublic {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  mcp_server_id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  description!: string | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @Allow()
  input_schema!: Record<string, any> | null;
  @IsDefined()
  @IsBoolean()
  is_enabled_by_default!: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  pending_description?: string | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  pending_input_schema?: Record<string, any> | null;
  @IsOptional()
  @IsBoolean()
  requires_approval?: boolean;
  @IsOptional()
  @IsBoolean()
  removed_from_remote?: boolean;
}

export class MCPServerSettingsPublic {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  description!: string | null;
  @IsDefined()
  @IsString()
  http_url!: string;
  @IsDefined()
  @IsString()
  http_auth_type!: string;
  @IsDefined()
  @IsBoolean()
  has_credentials!: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  credential_preview?: string | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString({ each: true })
  tags!: string[] | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  icon_url!: string | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  documentation_url!: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => SecurityClassificationPublic)
  security_classification?: SecurityClassificationPublic | null;
  @IsDefined()
  @IsString()
  mcp_server_id!: string;
  @IsDefined()
  @IsBoolean()
  is_org_enabled!: boolean;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MCPServerToolPublic)
  tools?: MCPServerToolPublic[];
  @IsDefined()
  @IsInt()
  tools_count!: number;
  @IsDefined()
  @IsBoolean()
  is_available!: boolean;
}

export class MCPServerSettingsUpdate {
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  is_org_enabled?: boolean | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  env_vars?: Record<string, any> | null;
}

export class MCPServerToolList {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => MCPServerToolPublic)
  items!: MCPServerToolPublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class ToolChangePublic {
  @IsDefined()
  @ValidateNested()
  @Type(() => MCPServerToolPublic)
  tool!: MCPServerToolPublic;
  @IsDefined()
  @IsString()
  change_type!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  current_description?: string | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  current_input_schema?: Record<string, any> | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  pending_description?: string | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  pending_input_schema?: Record<string, any> | null;
}

export class MCPServerToolSyncResponse {
  @IsDefined()
  @ValidateNested()
  @Type(() => MCPConnectionStatus)
  connection!: MCPConnectionStatus;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ToolChangePublic)
  new_tools?: ToolChangePublic[];
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ToolChangePublic)
  changed_tools?: ToolChangePublic[];
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ToolChangePublic)
  removed_tools?: ToolChangePublic[];
  @IsOptional()
  @IsInt()
  unchanged_count?: number;
  @IsDefined()
  @IsBoolean()
  has_pending_changes!: boolean;
}

export class MCPServerToolUpdate {
  @IsDefined()
  @IsBoolean()
  is_enabled!: boolean;
}

export class MCPServerUpdate {
  @IsNullable()
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  http_url?: string | null;
  @IsNullable()
  @IsOptional()
  @IsEnum(McpServerUpdateHttpAuthTypeEnum)
  http_auth_type?: McpServerUpdateHttpAuthTypeEnum | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  http_auth_config_schema?: Record<string, any> | null;
  @IsNullable()
  @IsOptional()
  @IsString({ each: true })
  tags?: string[] | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_url?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  documentation_url?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  security_classification?: ModelId | null;
}

export class ToolCallInfo {
  @IsDefined()
  @IsString()
  server_name!: string;
  @IsDefined()
  @IsString()
  tool_name!: string;
  @IsNullable()
  @IsOptional()
  @Allow()
  arguments?: Record<string, any> | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  tool_call_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  approved?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  result_status?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  result?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  mcp_tool_name?: string | null;
}

export class Message {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  id?: string | null;
  @IsDefined()
  @IsString()
  question!: string;
  @IsDefined()
  @IsString()
  answer!: string;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => CompletionModel)
  completion_model?: CompletionModel | null;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => InfoBlobPublicNoText)
  references!: InfoBlobPublicNoText[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  files!: FilePublic[];
  @IsDefined()
  @ValidateNested()
  @Type(() => UseTools)
  tools!: UseTools;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  generated_files!: FilePublic[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => WebSearchResultPublic)
  web_search_references!: WebSearchResultPublic[];
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ToolCallInfo)
  tool_calls?: ToolCallInfo[];
  @IsOptional()
  @IsInt()
  num_tokens_question?: number;
  @IsOptional()
  @IsInt()
  num_tokens_answer?: number;
}

export class MessageLogging {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  id?: string | null;
  @IsDefined()
  @IsString()
  question!: string;
  @IsDefined()
  @IsString()
  answer!: string;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => CompletionModel)
  completion_model?: CompletionModel | null;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => InfoBlobPublicNoText)
  references!: InfoBlobPublicNoText[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  files!: FilePublic[];
  @IsDefined()
  @ValidateNested()
  @Type(() => UseTools)
  tools!: UseTools;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  generated_files!: FilePublic[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => WebSearchResultPublic)
  web_search_references!: WebSearchResultPublic[];
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ToolCallInfo)
  tool_calls?: ToolCallInfo[];
  @IsOptional()
  @IsInt()
  num_tokens_question?: number;
  @IsOptional()
  @IsInt()
  num_tokens_answer?: number;
  @IsDefined()
  @ValidateNested()
  @Type(() => LoggingDetailsPublic)
  logging_details!: LoggingDetailsPublic;
}

export class MetadataCount {
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsDefined()
  @IsInt()
  count!: number;
}

export class QuestionMetadata {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  assistant_id?: string | null;
  @IsDefined()
  @IsString()
  session_id!: string;
}

export class SessionMetadata {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  assistant_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  group_chat_id?: string | null;
}

export class MetadataStatistics {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AssistantMetadata)
  assistants!: AssistantMetadata[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => SessionMetadata)
  sessions!: SessionMetadata[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => QuestionMetadata)
  questions!: QuestionMetadata[];
}

export class MetadataStatisticsAggregated {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => MetadataCount)
  assistants!: MetadataCount[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => MetadataCount)
  sessions!: MetadataCount[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => MetadataCount)
  questions!: MetadataCount[];
}

export class MigrationResult {
  @IsDefined()
  @IsBoolean()
  success!: boolean;
  @IsDefined()
  @IsInt()
  migrated_count!: number;
  @IsDefined()
  @IsInt()
  failed_count!: number;
  @IsDefined()
  @Allow()
  details!: Record<string, number>;
  @IsDefined()
  @IsInt()
  duration!: number;
  @IsDefined()
  @IsString()
  migration_id!: string;
  @IsOptional()
  @IsString({ each: true })
  warnings?: string[];
  @IsOptional()
  @IsBoolean()
  auto_recalculated?: boolean;
  @IsOptional()
  @IsBoolean()
  requires_manual_recalculation?: boolean;
}

export class ModelMigrationHistory {
  @IsDefined()
  @IsString()
  id!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  from_model_id?: string | null;
  @IsDefined()
  @IsString()
  from_model_name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  to_model_id?: string | null;
  @IsDefined()
  @IsString()
  to_model_name!: string;
  @IsDefined()
  @IsInt()
  migrated_count!: number;
  @IsDefined()
  @IsString()
  status!: string;
  @IsDefined()
  @IsString()
  initiated_by_id!: string;
  @IsDefined()
  @IsString()
  initiated_by_name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  started_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  completed_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  duration?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  error_message?: string | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  migration_details?: Record<string, number> | null;
  @IsNullable()
  @IsOptional()
  @IsString({ each: true })
  warnings?: string[] | null;
}

export class ModelMigrationRequest {
  @IsDefined()
  @IsString()
  to_model_id!: string;
  @IsNullable()
  @IsOptional()
  @IsString({ each: true })
  entity_types?: string[] | null;
  @IsOptional()
  @IsBoolean()
  confirm_migration?: boolean;
  @IsOptional()
  @IsBoolean()
  force_override?: boolean;
}

export class ModelProviderCreate {
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  provider_type!: string;
  @IsDefined()
  @Allow()
  credentials!: Record<string, any>;
  @IsOptional()
  @Allow()
  config?: Record<string, any>;
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

export class ModelProviderPublic {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  tenant_id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  provider_type!: string;
  @IsDefined()
  @Allow()
  config!: Record<string, any>;
  @IsDefined()
  @IsBoolean()
  is_active!: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  masked_api_key?: string | null;
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsDefined()
  @IsString()
  updated_at!: string;
}

export class ModelProviderUpdate {
  @IsNullable()
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  credentials?: Record<string, any> | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  config?: Record<string, any> | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  is_active?: boolean | null;
}

export class ModelUsage {
  @IsDefined()
  @IsString()
  model_id!: string;
  @IsDefined()
  @IsString()
  model_name!: string;
  @IsDefined()
  @IsString()
  model_nickname!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  model_org?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  model_provider?: string | null;
  @IsDefined()
  @IsInt()
  input_token_usage!: number;
  @IsDefined()
  @IsInt()
  output_token_usage!: number;
  @IsDefined()
  @IsInt()
  total_token_usage!: number;
  @IsDefined()
  @IsInt()
  request_count!: number;
}

export class ModelUsageDetail {
  @IsDefined()
  @IsString()
  entity_id!: string;
  @IsDefined()
  @IsString()
  entity_name!: string;
  @IsDefined()
  @IsString()
  entity_type!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  space_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  space_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  owner_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  owner_name?: string | null;
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  last_used?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  usage_count?: number | null;
}

export class ModelUsageStatistics {
  @IsDefined()
  @IsString()
  model_id!: string;
  @IsDefined()
  @IsInt()
  total_usage!: number;
  @IsDefined()
  @IsInt()
  assistants_count!: number;
  @IsDefined()
  @IsInt()
  apps_count!: number;
  @IsDefined()
  @IsInt()
  services_count!: number;
  @IsDefined()
  @IsInt()
  questions_count!: number;
  @IsDefined()
  @IsInt()
  assistant_templates_count!: number;
  @IsDefined()
  @IsInt()
  app_templates_count!: number;
  @IsDefined()
  @IsInt()
  spaces_count!: number;
  @IsDefined()
  @IsString()
  last_updated!: string;
}

export class ModelUsageSummary {
  @IsDefined()
  @IsString()
  model_id!: string;
  @IsDefined()
  @IsString()
  model_name!: string;
  @IsDefined()
  @IsString()
  model_nickname!: string;
  @IsDefined()
  @IsBoolean()
  is_enabled!: boolean;
  @IsDefined()
  @IsInt()
  total_usage!: number;
  @IsDefined()
  @IsString()
  last_updated!: string;
}

export class TranscriptionModelSecurityStatus {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  nickname!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  family?: string | null;
  @IsDefined()
  @IsBoolean()
  is_deprecated!: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  stability?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hosting?: string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  open_source?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hf_link?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  org?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  cost_per_minute?: string | null;
  @IsOptional()
  @IsBoolean()
  can_access?: boolean;
  @IsOptional()
  @IsBoolean()
  is_locked?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  lock_reason?: string | null;
  @IsOptional()
  @IsBoolean()
  is_org_enabled?: boolean;
  @IsOptional()
  @IsBoolean()
  is_org_default?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  credential_provider?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => SecurityClassificationPublic)
  security_classification?: SecurityClassificationPublic | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  tenant_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  provider_type?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  deprecation_date?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  migrated_to_model_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  meets_security_classification?: boolean | null;
}

export class ModelsPresentation {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => CompletionModelSecurityStatus)
  completion_models!: CompletionModelSecurityStatus[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => EmbeddingModelSecurityStatus)
  embedding_models!: EmbeddingModelSecurityStatus[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => TranscriptionModelSecurityStatus)
  transcription_models!: TranscriptionModelSecurityStatus[];
}

export class ModuleBase {
  @IsDefined()
  @IsString()
  name!: Modules | string;
}

export class ModuleInDB {
  @IsDefined()
  @IsString()
  name!: Modules | string;
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
}

export class OIDCDebugToggleRequest {
  @IsDefined()
  @IsBoolean()
  enabled!: boolean;
  @IsNullable()
  @IsOptional()
  @IsInt()
  duration_minutes?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  reason?: string | null;
}

export class OIDCDebugToggleResponse {
  @IsDefined()
  @IsBoolean()
  enabled!: boolean;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  enabled_at!: string | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  enabled_by!: string | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  expires_at!: string | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  reason!: string | null;
  @IsDefined()
  @IsString()
  backend!: string;
}

export class OpenIdConnectLogin {
  @IsDefined()
  @IsString()
  code!: string;
  @IsDefined()
  @IsString()
  code_verifier!: string;
  @IsDefined()
  @IsString()
  redirect_uri!: string;
  @IsDefined()
  @IsString()
  client_id!: string;
  @IsOptional()
  @IsString()
  grant_type?: string;
  @IsOptional()
  @IsString()
  scope?: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  nonce?: string | null;
}

export class SpaceGroupMember {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsEnum(SpaceRoleValue)
  role!: SpaceRoleValue;
  @IsOptional()
  @IsInt()
  user_count?: number;
}

export class PaginatedPermissionsSpaceGroupMember {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => SpaceGroupMember)
  items!: SpaceGroupMember[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class SpaceMember {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  email!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  username?: string | null;
  @IsDefined()
  @IsEnum(SpaceRoleValue)
  role!: SpaceRoleValue;
}

export class PaginatedPermissionsSpaceMember {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => SpaceMember)
  items!: SpaceMember[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponse {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ModelUsageDetail)
  items!: ModelUsageDetail[];
  @IsDefined()
  @IsInt()
  total!: number;
  @IsDefined()
  @IsBoolean()
  has_more!: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  next_cursor?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  prev_cursor?: string | null;
}

export class PaginatedResponseAllowedOriginInDB {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AllowedOriginInDB)
  items!: AllowedOriginInDB[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseAllowedOriginPublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AllowedOriginPublic)
  items!: AllowedOriginPublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseAppRunSparse {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AppRunSparse)
  items!: AppRunSparse[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseAssistantPublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AssistantPublic)
  items!: AssistantPublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseCompletionModelPublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => CompletionModelPublic)
  items!: CompletionModelPublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseCrawlRunPublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => IntricWebsitesPresentationWebsiteModelsCrawlRunPublic)
  items!: IntricWebsitesPresentationWebsiteModelsCrawlRunPublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseEmbeddingModelLegacy {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => EmbeddingModelLegacy)
  items!: EmbeddingModelLegacy[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseEmbeddingModelPublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => EmbeddingModelPublic)
  items!: EmbeddingModelPublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseFilePublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  items!: FilePublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseGroupPublicWithMetadata {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => GroupPublicWithMetadata)
  items!: GroupPublicWithMetadata[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseHelperTemplatePublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => HelperTemplatePublic)
  items!: HelperTemplatePublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseInfoBlobPublicNoText {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => InfoBlobPublicNoText)
  items!: InfoBlobPublicNoText[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseInfoBlobPublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => InfoBlobPublic)
  items!: InfoBlobPublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseJobPublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => JobPublic)
  items!: JobPublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseMCPServerPublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => MCPServerPublic)
  items!: MCPServerPublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseMCPServerSettingsPublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => MCPServerSettingsPublic)
  items!: MCPServerSettingsPublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseMessage {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => Message)
  items!: Message[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseModuleInDB {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ModuleInDB)
  items!: ModuleInDB[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PromptSparse {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsDefined()
  @IsBoolean()
  is_selected!: boolean;
  @IsDefined()
  @ValidateNested()
  @Type(() => UserSparse)
  user!: UserSparse;
}

export class PaginatedResponsePromptSparse {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => PromptSparse)
  items!: PromptSparse[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class RoleAssignmentPublic {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  org_space_id!: string;
  @IsDefined()
  @IsEnum(HelperKind)
  kind!: HelperKind;
  @IsDefined()
  @IsString()
  assistant_id!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  assistant_name?: string | null;
  @IsDefined()
  @IsBoolean()
  is_enabled!: boolean;
  @IsDefined()
  @IsBoolean()
  is_visible_to_users!: boolean;
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsDefined()
  @IsString()
  updated_at!: string;
}

export class PaginatedResponseRoleAssignmentPublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => RoleAssignmentPublic)
  items!: RoleAssignmentPublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class RolePublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsEnum(Permission, { each: true })
  permissions!: Permission[];
  @IsNullable()
  @IsOptional()
  @IsString()
  predefined_source?: string | null;
}

export class PaginatedResponseRolePublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => RolePublic)
  items!: RolePublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class SemanticSearchResponse {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  info_blob_id!: string;
  @IsDefined()
  @IsString()
  text!: string;
  @IsDefined()
  @IsInt()
  score!: number;
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsDefined()
  @IsString()
  updated_at!: string;
}

export class PaginatedResponseSemanticSearchResponse {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => SemanticSearchResponse)
  items!: SemanticSearchResponse[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class UserPublicBase {
  @IsDefined()
  @IsString()
  email!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  username?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsOptional()
  @IsInt()
  quota_used?: number;
}

export class ServicePublicWithUser {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsNullable()
  @IsOptional()
  @IsEnum(ServicePublicWithUserOutputFormatEnum)
  output_format?: ServicePublicWithUserOutputFormatEnum | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  json_schema?: Record<string, any> | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  prompt!: string;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelKwargs)
  completion_model_kwargs?: ModelKwargs | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  space_id?: string | null;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => GroupPublicBase)
  groups!: GroupPublicBase[];
  @IsDefined()
  @ValidateNested()
  @Type(() => CompletionModelPublic)
  completion_model!: CompletionModelPublic;
  @IsDefined()
  @ValidateNested()
  @Type(() => UserPublicBase)
  user!: UserPublicBase;
}

export class PaginatedResponseServicePublicWithUser {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ServicePublicWithUser)
  items!: ServicePublicWithUser[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class ServiceRun {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  input!: string;
  @IsDefined()
  @Allow()
  output!: Record<string, any> | any[] | string;
  @IsDefined()
  @ValidateNested()
  @Type(() => CompletionModelPublic)
  completion_model!: CompletionModelPublic;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => InfoBlobPublic)
  references!: InfoBlobPublic[];
}

export class PaginatedResponseServiceRun {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ServiceRun)
  items!: ServiceRun[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseSpaceGroupMember {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => SpaceGroupMember)
  items!: SpaceGroupMember[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class SpaceSparse {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  description!: string | null;
  @IsDefined()
  @IsBoolean()
  personal!: boolean;
  @IsDefined()
  @IsBoolean()
  organization!: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_id?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => Applications)
  applications?: Applications | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => DefaultAssistant)
  default_assistant?: DefaultAssistant | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  data_retention_days?: number | null;
}

export class PaginatedResponseSpaceSparse {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => SpaceSparse)
  items!: SpaceSparse[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class TenantWithMaskedCredentials {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  privacy_policy?: string | null;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  display_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  slug?: string | null;
  @IsDefined()
  @IsInt()
  quota_limit!: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  domain?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  zitadel_org_id?: string | null;
  @IsOptional()
  @IsBoolean()
  provisioning?: boolean;
  @IsOptional()
  @IsEnum(TenantState)
  state?: TenantState;
  @IsOptional()
  @IsBoolean()
  security_enabled?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  default_role_id?: string | null;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModuleInDB)
  modules?: ModuleInDB[];
  @IsOptional()
  @Allow()
  api_credentials?: Record<string, any>;
  @IsOptional()
  @Allow()
  federation_config?: Record<string, any>;
  @IsOptional()
  @Allow()
  crawler_settings?: Record<string, any>;
  @IsOptional()
  @Allow()
  api_key_policy?: Record<string, any>;
  @IsOptional()
  @IsString({ each: true })
  favorite_providers?: string[];
}

export class PaginatedResponseTenantWithMaskedCredentials {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => TenantWithMaskedCredentials)
  items!: TenantWithMaskedCredentials[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseTranscriptionModelPublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => TranscriptionModelPublic)
  items!: TranscriptionModelPublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class UserGroupPublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UserSparse)
  users?: UserSparse[];
}

export class PaginatedResponseUserGroupPublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => UserGroupPublic)
  items!: UserGroupPublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class RoleInDB {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsEnum(Permission, { each: true })
  permissions!: Permission[];
  @IsDefined()
  @IsString()
  tenant_id!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  predefined_source?: string | null;
}

export class TenantInDB {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  privacy_policy?: string | null;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  display_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  slug?: string | null;
  @IsDefined()
  @IsInt()
  quota_limit!: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  domain?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  zitadel_org_id?: string | null;
  @IsOptional()
  @IsBoolean()
  provisioning?: boolean;
  @IsOptional()
  @IsEnum(TenantState)
  state?: TenantState;
  @IsOptional()
  @IsBoolean()
  security_enabled?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  default_role_id?: string | null;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModuleInDB)
  modules?: ModuleInDB[];
  @IsOptional()
  @Allow()
  api_credentials?: Record<string, any>;
  @IsOptional()
  @Allow()
  federation_config?: Record<string, any>;
  @IsOptional()
  @Allow()
  crawler_settings?: Record<string, any>;
  @IsOptional()
  @Allow()
  api_key_policy?: Record<string, any>;
  @IsOptional()
  @IsString({ each: true })
  favorite_providers?: string[];
}

export class UserGroupInDBRead {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  state?: string | null;
}

export class UserInDB {
  @IsDefined()
  @IsString()
  email!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  username?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  tenant_id!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  password?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  salt?: string | null;
  @IsOptional()
  @IsInt()
  used_tokens?: number;
  @IsOptional()
  @IsBoolean()
  email_verified?: boolean;
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
  @IsDefined()
  @IsEnum(UserState)
  state!: UserState;
  @IsNullable()
  @IsOptional()
  @IsInt()
  quota_limit?: number | null;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UserGroupInDBRead)
  user_groups?: UserGroupInDBRead[];
  @IsDefined()
  @ValidateNested()
  @Type(() => TenantInDB)
  tenant!: TenantInDB;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ApiKey)
  api_key?: ApiKey | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ApiKeyV2InDB)
  active_api_key?: ApiKeyV2InDB | null;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RoleInDB)
  roles?: RoleInDB[];
  @IsOptional()
  @IsInt()
  quota_used?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  deleted_at?: string | null;
  @IsDefined()
  @IsString({ each: true })
  modules!: string[];
  @IsDefined()
  @IsString({ each: true })
  user_groups_ids!: string[];
  @IsDefined()
  @IsEnum(Permission, { each: true })
  permissions!: Permission[];
}

export class PaginatedResponseUserInDB {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => UserInDB)
  items!: UserInDB[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseWebsitePublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => WebsitePublic)
  items!: WebsitePublic[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class PaginatedResponseStr {
  @IsDefined()
  @IsString({ each: true })
  items!: string[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class SkippedDetail {
  @IsDefined()
  @IsString()
  file!: string;
  @IsDefined()
  @IsString()
  reason!: string;
}

export class SyncMetadata {
  @IsOptional()
  @IsInt()
  files_processed?: number;
  @IsOptional()
  @IsInt()
  files_deleted?: number;
  @IsOptional()
  @IsInt()
  pages_processed?: number;
  @IsOptional()
  @IsInt()
  folders_processed?: number;
  @IsOptional()
  @IsInt()
  skipped_items?: number;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SkippedDetail)
  skipped_details?: SkippedDetail[];
}

export class SyncLog {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  integration_knowledge_id!: string;
  @IsDefined()
  @IsString()
  sync_type!: string;
  @IsDefined()
  @IsString()
  status!: string;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => SyncMetadata)
  metadata?: SyncMetadata | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  error_message?: string | null;
  @IsDefined()
  @IsString()
  started_at!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  completed_at?: string | null;
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsDefined()
  @IsInt()
  files_processed!: number;
  @IsDefined()
  @IsInt()
  files_deleted!: number;
  @IsDefined()
  @IsInt()
  pages_processed!: number;
  @IsDefined()
  @IsInt()
  folders_processed!: number;
  @IsDefined()
  @IsInt()
  skipped_items!: number;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => SkippedDetail)
  skipped_details!: SkippedDetail[];
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsInt()
  duration_seconds!: number | null;
  @IsDefined()
  @IsInt()
  total_items_processed!: number;
}

export class PaginatedSyncLogList {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => SyncLog)
  items!: SyncLog[];
  @IsDefined()
  @IsInt()
  total_count!: number;
  @IsDefined()
  @IsInt()
  page_size!: number;
  @IsDefined()
  @IsInt()
  offset!: number;
  @IsDefined()
  @IsInt()
  count!: number;
  @IsDefined()
  @IsInt()
  current_page!: number;
  @IsDefined()
  @IsInt()
  total_pages!: number;
  @IsDefined()
  @IsBoolean()
  has_next!: boolean;
  @IsDefined()
  @IsBoolean()
  has_previous!: boolean;
}

export class PaginationMetadata {
  @IsDefined()
  @IsInt()
  page!: number;
  @IsDefined()
  @IsInt()
  page_size!: number;
  @IsDefined()
  @IsInt()
  total_count!: number;
  @IsDefined()
  @IsInt()
  total_pages!: number;
  @IsDefined()
  @IsBoolean()
  has_next!: boolean;
  @IsDefined()
  @IsBoolean()
  has_previous!: boolean;
  @IsNullable()
  @IsOptional()
  @Allow()
  counts?: Record<string, number> | null;
}

export class UserGroupRead {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
}

export class UserAdminView {
  @IsDefined()
  @IsString()
  email!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  username?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsOptional()
  @IsInt()
  quota_used?: number;
  @IsDefined()
  @IsInt()
  used_tokens!: number;
  @IsDefined()
  @IsBoolean()
  email_verified!: boolean;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsInt()
  quota_limit!: number | null;
  @IsDefined()
  @IsBoolean()
  is_active!: boolean;
  @IsDefined()
  @IsEnum(UserState)
  state!: UserState;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => RolePublic)
  roles!: RolePublic[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => UserGroupRead)
  user_groups!: UserGroupRead[];
}

export class PaginatedUsersResponseUserAdminView {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => UserAdminView)
  items!: UserAdminView[];
  @IsDefined()
  @ValidateNested()
  @Type(() => PaginationMetadata)
  metadata!: PaginationMetadata;
}

export class PartialAssistantUpdatePublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelKwargs)
  completion_model_kwargs?: ModelKwargs | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  logging_enabled?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  space_id?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => PromptCreate)
  prompt?: PromptCreate | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  groups?: ModelId[] | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  websites?: ModelId[] | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  integration_knowledge_list?: ModelId[] | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  mcp_servers?: ModelId[] | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => AssistantGuard)
  guardrail?: AssistantGuard | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  completion_model?: ModelId | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  attachments?: ModelId[] | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MCPToolSetting)
  mcp_tools?: MCPToolSetting[] | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  insight_enabled?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  data_retention_days?: number | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  metadata_json?: Record<string, any> | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_id?: string | null;
}

export class PartialCompletionModelUpdate {
  @IsNullable()
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  nickname?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  family?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_input_tokens?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_output_tokens?: number | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  is_deprecated?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  nr_billion_parameters?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hf_link?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  stability?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hosting?: string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  open_source?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  deployment_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  org?: string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  vision?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  reasoning?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  supports_tool_calling?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  base_url?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  litellm_model_name?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => SupportedModelKwargs)
  model_kwargs_capabilities?: SupportedModelKwargs | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_cost_per_token?: number | string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  output_cost_per_token?: number | string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  id?: string | null;
}

export class PartialEmbeddingModelUpdate {
  @IsNullable()
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  family?: string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  is_deprecated?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  open_source?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  dimensions?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_input?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_batch_size?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hf_link?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  stability?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hosting?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  org?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  litellm_model_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_cost_per_token?: number | string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  output_cost_per_token?: number | string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  id?: string | null;
}

export class PartialPropUserUpdate {
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  role?: ModelId | null;
  @IsNullable()
  @IsOptional()
  @IsEnum(UserState)
  state?: UserState | null;
}

export class PartialServiceUpdatePublic {
  @IsNullable()
  @IsOptional()
  @IsEnum(PartialServiceUpdatePublicOutputFormatEnum)
  output_format?: PartialServiceUpdatePublicOutputFormatEnum | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  json_schema?: Record<string, any> | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  prompt?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelKwargs)
  completion_model_kwargs?: ModelKwargs | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  groups?: ModelId[] | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  completion_model?: ModelId | null;
}

export class PartialUpdateSpaceRequest {
  @IsNullable()
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  embedding_models?: ModelId[] | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  completion_models?: ModelId[] | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  transcription_models?: ModelId[] | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  mcp_servers?: ModelId[] | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MCPToolSetting)
  mcp_tools?: MCPToolSetting[] | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  security_classification?: ModelId | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  data_retention_days?: number | null;
}

export class PatchFederationRequest {
  @IsNullable()
  @IsOptional()
  @IsString()
  provider?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  discovery_endpoint?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  client_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  client_secret?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString({ each: true })
  allowed_domains?: string[] | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  canonical_public_origin?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  redirect_path?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString({ each: true })
  additional_redirect_uris?: string[] | null;
}

export class PermissionPublic {
  @IsDefined()
  @IsEnum(Permission)
  name!: Permission;
  @IsDefined()
  @IsString()
  description!: string;
}

export class PreflightRequest {
  @IsNullable()
  @IsOptional()
  @IsString()
  session_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  assistant_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  group_chat_id?: string | null;
  @IsOptional()
  @IsString()
  question?: string;
  @IsOptional()
  @IsString({ each: true })
  file_ids?: string[];
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => UseTools)
  tools?: UseTools | null;
}

export class PreflightResponse {
  @IsDefined()
  @IsInt()
  input_tokens!: number;
  @IsDefined()
  @IsInt()
  file_tokens!: number;
  @IsOptional()
  @IsInt()
  excluded_file_count?: number;
  @IsDefined()
  @IsString()
  model_name!: string;
  @IsDefined()
  @IsInt()
  context_window!: number;
}

export class PrivacyPolicy {
  @IsNullable()
  @IsOptional()
  @IsString()
  url?: string | null;
}

export class PromptUpdateRequest {
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
}

export class PropUserInvite {
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  role?: ModelId | null;
  @IsNullable()
  @IsOptional()
  @IsEnum(UserState)
  state?: UserState | null;
  @IsDefined()
  @IsString()
  email!: string;
}

export class RetentionPolicyResponse {
  @IsDefined()
  @IsString()
  tenant_id!: string;
  @IsDefined()
  @IsInt()
  retention_days!: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  last_purge_at?: string | null;
  @IsDefined()
  @IsInt()
  purge_count!: number;
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsDefined()
  @IsString()
  updated_at!: string;
}

export class RetentionPolicyUpdateRequest {
  @IsDefined()
  @IsInt()
  retention_days!: number;
}

export class RoleCreateRequest {
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsEnum(Permission, { each: true })
  permissions!: Permission[];
}

export class RoleUpdateRequest {
  @IsNullable()
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsEnum(Permission, { each: true })
  permissions?: Permission[] | null;
}

export class RolesPaginatedResponse {
  @IsDefined()
  @ValidateNested()
  @Type(() => PaginatedResponseRolePublic)
  roles!: PaginatedResponseRolePublic;
  @IsDefined()
  @ValidateNested()
  @Type(() => PaginatedResponseRolePublic)
  predefined_roles!: PaginatedResponseRolePublic;
}

export class RunAppRequest {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  files?: ModelId[];
  @IsNullable()
  @IsOptional()
  @IsString()
  text?: string | null;
}

export class RunService {
  @IsDefined()
  @IsString()
  input!: string;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  files?: ModelId[];
}

export class ScimTokenCreatedResponse {
  @IsDefined()
  @IsString()
  tenant_id!: string;
  @IsDefined()
  @IsString()
  token!: string;
}

export class ScimTokenStatusResponse {
  @IsDefined()
  @IsString()
  tenant_id!: string;
  @IsDefined()
  @IsBoolean()
  is_active!: boolean;
}

export class SecurityClassificationCreatePublic {
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsOptional()
  @IsBoolean()
  set_lowest_security?: boolean;
}

export class SecurityClassificationLevelsUpdateRequest {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  security_classifications!: ModelId[];
}

export class SecurityClassificationResponse {
  @IsDefined()
  @IsBoolean()
  security_enabled!: boolean;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => SecurityClassificationPublic)
  security_classifications!: SecurityClassificationPublic[];
}

export class SecurityClassificationSingleUpdate {
  @IsOptional()
  @IsString()
  name?: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
}

export class SecurityClassificationsListPublic {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => SecurityClassificationPublic)
  security_classifications!: SecurityClassificationPublic[];
}

export class SecurityEnableRequest {
  @IsDefined()
  @IsBoolean()
  enabled!: boolean;
}

export class SecurityEnableResponse {
  @IsDefined()
  @IsBoolean()
  security_enabled!: boolean;
}

export class SemanticSearchRequest {
  @IsDefined()
  @IsString()
  search_string!: string;
  @IsOptional()
  @IsInt()
  num_chunks?: number;
  @IsNullable()
  @IsOptional()
  @IsInt()
  autocut_cutoff?: number | null;
}

export class ServiceAccountAuthCallback {
  @IsDefined()
  @IsString()
  auth_code!: string;
  @IsDefined()
  @IsString()
  state!: string;
}

export class ServiceAccountAuthStart {
  @IsDefined()
  @IsString()
  client_id!: string;
  @IsDefined()
  @IsString()
  client_secret!: string;
  @IsDefined()
  @IsString()
  tenant_domain!: string;
}

export class ServiceAccountAuthStartResponse {
  @IsDefined()
  @IsString()
  auth_url!: string;
  @IsDefined()
  @IsString()
  state!: string;
}

export class ServiceCreatePublic {
  @IsNullable()
  @IsOptional()
  @IsEnum(ServiceCreatePublicOutputFormatEnum)
  output_format?: ServiceCreatePublicOutputFormatEnum | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  json_schema?: Record<string, any> | null;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  prompt!: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelKwargs)
  completion_model_kwargs?: ModelKwargs;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  groups?: ModelId[];
  @IsDefined()
  @ValidateNested()
  @Type(() => ModelId)
  completion_model!: ModelId;
}

export class ServiceOutput {
  @IsDefined()
  @Allow()
  output!: any;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  files?: FilePublic[];
}

export class SessionFeedback {
  @IsDefined()
  @IsEnum(SessionFeedbackValueEnum)
  value!: SessionFeedbackValueEnum;
  @IsNullable()
  @IsOptional()
  @IsString()
  text?: string | null;
}

export class SessionPublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => Message)
  messages!: Message[];
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => SessionFeedback)
  feedback?: SessionFeedback | null;
}

export class SetFederationRequest {
  @IsDefined()
  @IsString()
  provider!: string;
  @IsDefined()
  @IsString()
  discovery_endpoint!: string;
  @IsDefined()
  @IsString()
  client_id!: string;
  @IsDefined()
  @IsString()
  client_secret!: string;
  @IsOptional()
  @IsString({ each: true })
  allowed_domains?: string[];
  @IsNullable()
  @IsOptional()
  @IsString()
  canonical_public_origin?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  redirect_path?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString({ each: true })
  additional_redirect_uris?: string[] | null;
}

export class SetFederationResponse {
  @IsDefined()
  @IsString()
  tenant_id!: string;
  @IsDefined()
  @IsString()
  provider!: string;
  @IsDefined()
  @IsString()
  masked_secret!: string;
  @IsDefined()
  @IsString()
  message!: string;
}

export class SettingsPublic {
  @IsOptional()
  @Allow()
  chatbot_widget?: Record<string, any>;
  @IsOptional()
  @IsBoolean()
  using_templates?: boolean;
  @IsOptional()
  @IsBoolean()
  tenant_credentials_enabled?: boolean;
  @IsOptional()
  @IsBoolean()
  audit_logging_enabled?: boolean;
  @IsOptional()
  @IsBoolean()
  provisioning?: boolean;
  @IsOptional()
  @IsBoolean()
  api_key_expiry_notifications?: boolean;
}

export class SharePointSubscriptionPublic {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  user_integration_id!: string;
  @IsDefined()
  @IsString()
  site_id!: string;
  @IsDefined()
  @IsString()
  subscription_id!: string;
  @IsDefined()
  @IsString()
  drive_id!: string;
  @IsDefined()
  @IsString()
  expires_at!: string;
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsDefined()
  @IsBoolean()
  is_expired!: boolean;
  @IsDefined()
  @IsInt()
  expires_in_hours!: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  owner_email?: string | null;
  @IsDefined()
  @IsString()
  owner_type!: string;
}

export class SharePointTreeItem {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  type!: string;
  @IsDefined()
  @IsString()
  path!: string;
  @IsDefined()
  @IsBoolean()
  has_children!: boolean;
  @IsNullable()
  @IsOptional()
  @IsInt()
  size?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  modified?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  web_url?: string | null;
}

export class SharePointTreeResponse {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => SharePointTreeItem)
  items!: SharePointTreeItem[];
  @IsDefined()
  @IsString()
  current_path!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  parent_id?: string | null;
  @IsDefined()
  @IsString()
  drive_id!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  site_id?: string | null;
}

export class SignedURLRequest {
  @IsOptional()
  @IsInt()
  expires_in?: number;
  @IsOptional()
  @IsEnum(ContentDisposition)
  content_disposition?: ContentDisposition;
}

export class SignedURLResponse {
  @IsDefined()
  @IsString()
  url!: string;
  @IsDefined()
  @IsInt()
  expires_at!: number;
}

export class SpaceRole {
  @IsDefined()
  @IsEnum(SpaceRoleValue)
  value!: SpaceRoleValue;
  @IsDefined()
  @IsString()
  label!: string;
}

export class SpacePublic {
  @IsOptional()
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  description!: string | null;
  @IsDefined()
  @IsBoolean()
  personal!: boolean;
  @IsDefined()
  @IsBoolean()
  organization!: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  icon_id?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => Applications)
  applications?: Applications | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => DefaultAssistant)
  default_assistant?: DefaultAssistant | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  data_retention_days?: number | null;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => EmbeddingModelPublic)
  embedding_models!: EmbeddingModelPublic[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => CompletionModelPublic)
  completion_models!: CompletionModelPublic[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => TranscriptionModelPublic)
  transcription_models!: TranscriptionModelPublic[];
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MCPServerPublicDict)
  mcp_servers?: MCPServerPublicDict[];
  @IsDefined()
  @ValidateNested()
  @Type(() => Knowledge)
  knowledge!: Knowledge;
  @IsDefined()
  @ValidateNested()
  @Type(() => PaginatedPermissionsSpaceMember)
  members!: PaginatedPermissionsSpaceMember;
  @IsDefined()
  @ValidateNested()
  @Type(() => PaginatedPermissionsSpaceGroupMember)
  group_members!: PaginatedPermissionsSpaceGroupMember;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => SpaceRole)
  available_roles!: SpaceRole[];
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @ValidateNested()
  @Type(() => SecurityClassificationPublic)
  security_classification!: SecurityClassificationPublic | null;
}

export class StartRunRequest {
  @IsDefined()
  @IsEnum(HelperKind)
  kind!: HelperKind;
  @IsDefined()
  @IsString()
  target_type!: string;
  @IsDefined()
  @IsString()
  target_id!: string;
  @IsDefined()
  @IsString()
  question!: string;
  @IsOptional()
  @IsBoolean()
  stream?: boolean;
}

export class StorageSpaceMemberModel {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  email!: string;
  @IsDefined()
  @IsString()
  role!: string;
}

export class StorageSpaceInfoModel {
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsDefined()
  @IsString()
  update_at!: string;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsInt()
  size!: number;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => StorageSpaceMemberModel)
  members!: StorageSpaceMemberModel[];
}

export class StorageInfoModel {
  @IsDefined()
  @IsInt()
  count!: number;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => StorageSpaceInfoModel)
  items!: StorageSpaceInfoModel[];
}

export class StorageModel {
  @IsDefined()
  @IsInt()
  total_used!: number;
  @IsDefined()
  @IsInt()
  personal_used!: number;
  @IsDefined()
  @IsInt()
  shared_used!: number;
  @IsDefined()
  @IsInt()
  limit!: number;
}

export class SubscriptionRenewalResult {
  @IsDefined()
  @IsInt()
  total_subscriptions!: number;
  @IsDefined()
  @IsInt()
  expired_count!: number;
  @IsOptional()
  @IsInt()
  recreated?: number;
  @IsOptional()
  @IsInt()
  failed?: number;
  @IsOptional()
  @IsString({ each: true })
  errors?: string[];
}

export class SuperApiKeyStatus {
  @IsDefined()
  @IsBoolean()
  super_api_key_configured!: boolean;
  @IsDefined()
  @IsBoolean()
  super_duper_api_key_configured!: boolean;
  @IsOptional()
  @IsBoolean()
  super_api_key_using_legacy?: boolean;
  @IsOptional()
  @IsBoolean()
  super_duper_api_key_using_legacy?: boolean;
}

export class TemplateListPublic {
  @IsDefined()
  @Allow()
  items!: (AppTemplatePublic | AssistantTemplatePublic)[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class TenantAppTestResult {
  @IsDefined()
  @IsBoolean()
  success!: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  error_message?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  details?: string | null;
}

export class TenantBase {
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  display_name?: string | null;
  @IsOptional()
  @IsInt()
  quota_limit?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  domain?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  zitadel_org_id?: string | null;
  @IsOptional()
  @IsBoolean()
  provisioning?: boolean;
  @IsOptional()
  @IsEnum(TenantState)
  state?: TenantState;
  @IsOptional()
  @IsBoolean()
  security_enabled?: boolean;
}

export class TenantCompletionModelCreate {
  @IsDefined()
  @IsString()
  provider_id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  display_name!: string;
  @IsDefined()
  @IsInt()
  max_input_tokens!: number;
  @IsDefined()
  @IsInt()
  max_output_tokens!: number;
  @IsOptional()
  @IsBoolean()
  vision?: boolean;
  @IsOptional()
  @IsBoolean()
  reasoning?: boolean;
  @IsOptional()
  @IsBoolean()
  supports_tool_calling?: boolean;
  @IsOptional()
  @IsString()
  hosting?: string;
  @IsOptional()
  @IsString()
  family?: string;
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
  @IsOptional()
  @IsBoolean()
  is_default?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_cost_per_token?: number | string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  output_cost_per_token?: number | string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  security_classification?: ModelId | null;
}

export class TenantCompletionModelUpdate {
  @IsNullable()
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  display_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_input_tokens?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_output_tokens?: number | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  vision?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  reasoning?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  supports_tool_calling?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hosting?: string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  open_source?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  stability?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_cost_per_token?: number | string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  output_cost_per_token?: number | string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  is_default?: boolean | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  security_classification?: ModelId | null;
}

export class TenantEmbeddingModelCreate {
  @IsDefined()
  @IsString()
  provider_id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  display_name!: string;
  @IsOptional()
  @IsString()
  family?: string;
  @IsNullable()
  @IsOptional()
  @IsInt()
  dimensions?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_input?: number | null;
  @IsOptional()
  @IsString()
  hosting?: string;
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
  @IsOptional()
  @IsBoolean()
  is_default?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_cost_per_token?: number | string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  output_cost_per_token?: number | string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  security_classification?: ModelId | null;
}

export class TenantEmbeddingModelUpdate {
  @IsNullable()
  @IsOptional()
  @IsString()
  display_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  family?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  dimensions?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  max_input?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hosting?: string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  open_source?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  stability?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  input_cost_per_token?: number | string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  output_cost_per_token?: number | string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  is_default?: boolean | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  security_classification?: ModelId | null;
}

export class TenantInfo {
  @IsDefined()
  @IsString()
  slug!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  display_name!: string;
}

export class TenantIntegration {
  @IsOptional()
  @IsString()
  id?: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  description!: string;
  @IsDefined()
  @IsEnum(IntegrationType)
  integration_type!: IntegrationType;
  @IsDefined()
  @IsString()
  integration_id!: string;
  @IsDefined()
  @IsBoolean()
  is_linked_to_tenant!: boolean;
}

export class TenantIntegrationList {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => TenantIntegration)
  items!: TenantIntegration[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class TenantListResponse {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => TenantInfo)
  tenants!: TenantInfo[];
}

export class TenantPublic {
  @IsDefined()
  @IsString()
  name!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  display_name?: string | null;
  @IsOptional()
  @IsInt()
  quota_limit?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  domain?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  zitadel_org_id?: string | null;
  @IsOptional()
  @IsBoolean()
  provisioning?: boolean;
  @IsOptional()
  @IsEnum(TenantState)
  state?: TenantState;
  @IsOptional()
  @IsBoolean()
  security_enabled?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  privacy_policy?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  default_role_id?: string | null;
}

export class TenantSharePointAppCreate {
  @IsDefined()
  @IsString()
  client_id!: string;
  @IsDefined()
  @IsString()
  client_secret!: string;
  @IsDefined()
  @IsString()
  tenant_domain!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  certificate_path?: string | null;
}

export class TenantSharePointAppPublic {
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  tenant_id!: string;
  @IsDefined()
  @IsString()
  client_id!: string;
  @IsDefined()
  @IsString()
  client_secret_masked!: string;
  @IsDefined()
  @IsString()
  tenant_domain!: string;
  @IsDefined()
  @IsBoolean()
  is_active!: boolean;
  @IsDefined()
  @IsString()
  auth_method!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  service_account_email?: string | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  certificate_path!: string | null;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  created_by!: string | null;
  @IsDefined()
  @IsString()
  created_at!: string;
  @IsDefined()
  @IsString()
  updated_at!: string;
}

export class TenantTranscriptionModelCreate {
  @IsDefined()
  @IsString()
  provider_id!: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  display_name!: string;
  @IsOptional()
  @IsString()
  hosting?: string;
  @IsOptional()
  @IsString()
  family?: string;
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
  @IsOptional()
  @IsBoolean()
  is_default?: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  cost_per_minute?: number | string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  security_classification?: ModelId | null;
}

export class TenantTranscriptionModelUpdate {
  @IsNullable()
  @IsOptional()
  @IsString()
  display_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  description?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  hosting?: string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  open_source?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  stability?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  cost_per_minute?: number | string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  is_default?: boolean | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  security_classification?: ModelId | null;
}

export class TenantUpdatePublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  display_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  quota_limit?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  domain?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  zitadel_org_id?: string | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  provisioning?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsEnum(TenantState)
  state?: TenantState | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  security_enabled?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  default_role_id?: string | null;
}

export class ToggleRequest {
  @IsDefined()
  @IsBoolean()
  value!: boolean;
}

export class ToggleSettingUpdate {
  @IsDefined()
  @IsBoolean()
  enabled!: boolean;
}

export class TokenUsageSummary {
  @IsDefined()
  @IsString()
  start_date!: string;
  @IsDefined()
  @IsString()
  end_date!: string;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ModelUsage)
  models!: ModelUsage[];
  @IsDefined()
  @IsInt()
  total_input_token_usage!: number;
  @IsDefined()
  @IsInt()
  total_output_token_usage!: number;
  @IsDefined()
  @IsInt()
  total_token_usage!: number;
}

export class ToolApprovalDecision {
  @IsDefined()
  @IsString()
  tool_call_id!: string;
  @IsDefined()
  @IsBoolean()
  approved!: boolean;
  @IsNullable()
  @IsOptional()
  @IsString()
  reason?: string | null;
}

export class ToolApprovalResponse {
  @IsDefined()
  @IsString()
  status!: string;
  @IsDefined()
  @IsString()
  approval_id!: string;
  @IsDefined()
  @IsInt()
  decisions_received!: number;
  @IsDefined()
  @IsInt()
  decisions_remaining!: number;
  @IsOptional()
  @IsString({ each: true })
  unrecognized_tool_call_ids?: string[];
}

export class ToolReviewRequest {
  @IsDefined()
  @IsString({ each: true })
  tool_ids!: string[];
}

export class ToolReviewResponse {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MCPServerToolPublic)
  approved_tools?: MCPServerToolPublic[];
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MCPServerToolPublic)
  rejected_tools?: MCPServerToolPublic[];
  @IsOptional()
  @IsInt()
  deleted_count?: number;
}

export class TranscriptionModelUpdate {
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  is_org_enabled?: boolean | null;
  @IsNullable()
  @IsOptional()
  @IsBoolean()
  is_org_default?: boolean | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  security_classification?: ModelId | null;
}

export class TranscriptionUsageEntity {
  @IsDefined()
  @IsString()
  entity_id!: string;
  @IsDefined()
  @IsString()
  entity_name!: string;
  @IsOptional()
  @IsString()
  entity_type?: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  space_name?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  owner_name?: string | null;
}

export class TranscriptionModelUsageDetails {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TranscriptionUsageEntity)
  items?: TranscriptionUsageEntity[];
  @IsOptional()
  @IsInt()
  total?: number;
}

export class TranscriptionModelUsageStats {
  @IsDefined()
  @IsString()
  model_id!: string;
  @IsOptional()
  @IsInt()
  apps_count?: number;
  @IsOptional()
  @IsInt()
  spaces_count?: number;
  @IsOptional()
  @IsInt()
  total_count?: number;
}

export class TransferApplicationRequest {
  @IsDefined()
  @IsString()
  target_space_id!: string;
  @IsOptional()
  @IsBoolean()
  move_resources?: boolean;
}

export class TransferRequest {
  @IsDefined()
  @IsString()
  target_space_id!: string;
}

export class UpdateIntegrationKnowledgeRequest {
  @IsDefined()
  @IsString()
  name!: string;
}

export class UpdateIntegrationKnowledgeWrapperRequest {
  @IsDefined()
  @IsString()
  name!: string;
}

export class UpdateSpaceDryRunResponse {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AssistantSparse)
  assistants!: AssistantSparse[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => GroupChatSparse)
  group_chats!: GroupChatSparse[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ServiceSparse)
  services!: ServiceSparse[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AppSparse)
  apps!: AppSparse[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => CompletionModelPublic)
  completion_models!: CompletionModelPublic[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => EmbeddingModelPublic)
  embedding_models!: EmbeddingModelPublic[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => TranscriptionModelPublic)
  transcription_models!: TranscriptionModelPublic[];
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MCPServerPublicDict)
  mcp_servers?: MCPServerPublicDict[];
}

export class UpdateSpaceGroupMemberRequest {
  @IsDefined()
  @IsEnum(SpaceRoleValue)
  role!: SpaceRoleValue;
}

export class UpdateSpaceMemberRequest {
  @IsDefined()
  @IsEnum(SpaceRoleValue)
  role!: SpaceRoleValue;
}

export class UpdateStatusRequest {
  @IsDefined()
  @IsEnum(HelperRunStatus)
  status!: HelperRunStatus;
}

export class UserAddAdmin {
  @IsDefined()
  @IsString()
  email!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  username?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  password?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  quota_limit?: number | null;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  roles?: ModelId[];
}

export class UserAddSuperAdmin {
  @IsDefined()
  @IsString()
  email!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  username?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  password?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  quota_limit?: number | null;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  roles?: ModelId[];
  @IsDefined()
  @IsString()
  tenant_id!: string;
}

export class UserCreated {
  @IsDefined()
  @IsString()
  email!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  username?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsDefined()
  @IsString()
  tenant_id!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  password?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  salt?: string | null;
  @IsOptional()
  @IsInt()
  used_tokens?: number;
  @IsOptional()
  @IsBoolean()
  email_verified?: boolean;
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
  @IsDefined()
  @IsEnum(UserState)
  state!: UserState;
  @IsNullable()
  @IsOptional()
  @IsInt()
  quota_limit?: number | null;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UserGroupInDBRead)
  user_groups?: UserGroupInDBRead[];
  @IsDefined()
  @ValidateNested()
  @Type(() => TenantInDB)
  tenant!: TenantInDB;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ApiKey)
  api_key?: ApiKey | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ApiKeyV2InDB)
  active_api_key?: ApiKeyV2InDB | null;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RoleInDB)
  roles?: RoleInDB[];
  @IsOptional()
  @IsInt()
  quota_used?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  deleted_at?: string | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => AccessToken)
  access_token?: AccessToken | null;
  @IsDefined()
  @IsString({ each: true })
  modules!: string[];
  @IsDefined()
  @IsString({ each: true })
  user_groups_ids!: string[];
  @IsDefined()
  @IsEnum(Permission, { each: true })
  permissions!: Permission[];
}

export class UserDeletedListItem {
  @IsDefined()
  @IsString()
  username!: string;
  @IsDefined()
  @IsString()
  email!: string;
  @IsDefined()
  @IsString()
  state!: string;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  deleted_at!: string | null;
}

export class UserGroupCreateRequest {
  @IsDefined()
  @IsString()
  name!: string;
}

export class UserGroupUpdateRequest {
  @IsNullable()
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  users?: ModelId[];
}

export class UserIntegration {
  @IsOptional()
  @IsString()
  id?: string;
  @IsDefined()
  @IsString()
  name!: string;
  @IsDefined()
  @IsString()
  description!: string;
  @IsDefined()
  @IsEnum(IntegrationType)
  integration_type!: IntegrationType;
  @IsDefined()
  @IsString()
  tenant_integration_id!: string;
  @IsDefined()
  @IsBoolean()
  connected!: boolean;
  @IsOptional()
  @IsString()
  auth_type?: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  tenant_app_id?: string | null;
  @IsOptional()
  @IsBoolean()
  tenant_app_configured?: boolean;
}

export class UserIntegrationList {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => UserIntegration)
  items!: UserIntegration[];
  @IsDefined()
  @IsInt()
  count!: number;
}

export class UserProvision {
  @IsDefined()
  @IsString()
  zitadel_token!: string;
}

export class UserPublic {
  @IsDefined()
  @IsString()
  email!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  username?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsOptional()
  @IsInt()
  quota_used?: number;
  @IsNullable()
  @IsOptional()
  @IsString()
  truncated_api_key?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  legacy_api_key_suffix?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  quota_limit?: number | null;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => RolePublic)
  roles!: RolePublic[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => UserGroupRead)
  user_groups!: UserGroupRead[];
}

export class UserStateListItem {
  @IsDefined()
  @IsString()
  username!: string;
  @IsDefined()
  @IsString()
  email!: string;
  @IsDefined()
  @IsString()
  state!: string;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  state_changed_at!: string | null;
}

export class UserTokenUsage {
  @IsDefined()
  @IsString()
  user_id!: string;
  @IsDefined()
  @IsString()
  username!: string;
  @IsDefined()
  @IsString()
  email!: string;
  @IsDefined()
  @IsInt()
  total_input_tokens!: number;
  @IsDefined()
  @IsInt()
  total_output_tokens!: number;
  @IsDefined()
  @IsInt()
  total_tokens!: number;
  @IsDefined()
  @IsInt()
  total_requests!: number;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ModelUsage)
  models_used!: ModelUsage[];
}

export class UserTokenUsageSummary {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => UserTokenUsage)
  users!: UserTokenUsage[];
  @IsDefined()
  @IsString()
  start_date!: string;
  @IsDefined()
  @IsString()
  end_date!: string;
  @IsDefined()
  @IsInt()
  total_users!: number;
  @IsDefined()
  @IsInt()
  total_input_tokens!: number;
  @IsDefined()
  @IsInt()
  total_output_tokens!: number;
  @IsDefined()
  @IsInt()
  total_tokens!: number;
  @IsDefined()
  @IsInt()
  total_requests!: number;
}

export class UserTokenUsageSummaryDetail {
  @IsDefined()
  @ValidateNested()
  @Type(() => UserTokenUsage)
  user!: UserTokenUsage;
}

export class UserUpdatePublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  email?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  username?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  password?: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  quota_limit?: number | null;
  @IsNullable()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModelId)
  roles?: ModelId[] | null;
  @IsNullable()
  @IsOptional()
  @IsEnum(UserState)
  state?: UserState | null;
}

export class ValidateModelRequest {
  @IsDefined()
  @IsString()
  model_name!: string;
  @IsOptional()
  @IsString()
  model_type?: string;
}

export class ValidationResult {
  @IsDefined()
  @IsBoolean()
  compatible!: boolean;
  @IsDefined()
  @IsString({ each: true })
  warnings!: string[];
  @IsOptional()
  @IsString({ each: true })
  warning_codes?: string[];
  @IsDefined()
  @IsBoolean()
  requires_confirmation!: boolean;
  @IsOptional()
  @IsBoolean()
  user_confirmed?: boolean;
}

export class WebsiteCreate {
  @IsNullable()
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsDefined()
  @IsString()
  url!: string;
  @IsOptional()
  @IsBoolean()
  download_files?: boolean;
  @IsOptional()
  @IsEnum(CrawlType)
  crawl_type?: CrawlType;
  @IsOptional()
  @IsEnum(UpdateInterval)
  update_interval?: UpdateInterval;
  @IsNullable()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelId)
  embedding_model?: ModelId | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  http_auth_username?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  http_auth_password?: string | null;
}

export class WebsiteCreateRequestDeprecated {
  @IsNullable()
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsDefined()
  @IsString()
  url!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  space_id?: string | null;
  @IsOptional()
  @IsBoolean()
  download_files?: boolean;
  @IsOptional()
  @IsEnum(CrawlType)
  crawl_type?: CrawlType;
  @IsOptional()
  @IsEnum(UpdateInterval)
  update_interval?: UpdateInterval;
  @IsDefined()
  @ValidateNested()
  @Type(() => ModelId)
  embedding_model!: ModelId;
}

export class WebsiteExistsResponse {
  @IsDefined()
  @IsString()
  website_id!: string;
  @IsDefined()
  @IsString()
  space_id!: string;
  @IsDefined()
  @IsString()
  space_name!: string;
  @IsDefined()
  @IsString()
  url!: string;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  name!: string | null;
  @IsDefined()
  @IsEnum(UpdateInterval)
  update_interval!: UpdateInterval;
  @IsNullable()
  @ValidateIf((_obj, value) => value !== null)
  @IsDefined()
  @IsString()
  last_crawled_at!: string | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  pages_crawled?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  pages_failed?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  files_downloaded?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  files_failed?: number | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  crawl_status?: string | null;
}

export class WebsiteUpdate {
  @IsOptional()
  @IsString()
  url?: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsOptional()
  @IsBoolean()
  download_files?: boolean;
  @IsOptional()
  @IsEnum(CrawlType)
  crawl_type?: CrawlType;
  @IsOptional()
  @IsEnum(UpdateInterval)
  update_interval?: UpdateInterval;
  @IsNullable()
  @IsOptional()
  @IsString()
  http_auth_username?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  http_auth_password?: string | null;
}

export class IntricTenantsPresentationTenantCredentialsRouterCredentialInfo {
  @IsDefined()
  @IsString()
  provider!: string;
  @IsDefined()
  @IsString()
  masked_key!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  configured_at?: string | null;
  @IsDefined()
  @IsEnum(IntricTenantsPresentationTenantCredentialsRouterCredentialInfoEncryptionStatusEnum)
  encryption_status!: IntricTenantsPresentationTenantCredentialsRouterCredentialInfoEncryptionStatusEnum;
  @IsOptional()
  @Allow()
  config?: Record<string, any>;
}

export class IntricTenantsPresentationTenantCredentialsRouterListCredentialsResponse {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => IntricTenantsPresentationTenantCredentialsRouterCredentialInfo)
  credentials!: IntricTenantsPresentationTenantCredentialsRouterCredentialInfo[];
}

export class IntricTenantsPresentationTenantCredentialsRouterSetCredentialRequest {
  @IsDefined()
  @IsString()
  api_key!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  endpoint?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  api_version?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  deployment_name?: string | null;
}

export class IntricTenantsPresentationTenantCredentialsRouterSetCredentialResponse {
  @IsDefined()
  @IsString()
  tenant_id!: string;
  @IsDefined()
  @IsString()
  provider!: string;
  @IsDefined()
  @IsString()
  masked_key!: string;
  @IsDefined()
  @IsString()
  message!: string;
  @IsDefined()
  @IsString()
  set_at!: string;
}

export class IntricTenantsPresentationTenantSelfCredentialsRouterCredentialInfo {
  @IsDefined()
  @IsString()
  provider!: string;
  @IsDefined()
  @IsString()
  masked_key!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  configured_at?: string | null;
  @IsDefined()
  @IsEnum(IntricTenantsPresentationTenantSelfCredentialsRouterCredentialInfoEncryptionStatusEnum)
  encryption_status!: IntricTenantsPresentationTenantSelfCredentialsRouterCredentialInfoEncryptionStatusEnum;
  @IsOptional()
  @Allow()
  config?: Record<string, any>;
}

export class IntricTenantsPresentationTenantSelfCredentialsRouterListCredentialsResponse {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => IntricTenantsPresentationTenantSelfCredentialsRouterCredentialInfo)
  credentials!: IntricTenantsPresentationTenantSelfCredentialsRouterCredentialInfo[];
}

export class IntricTenantsPresentationTenantSelfCredentialsRouterSetCredentialRequest {
  @IsDefined()
  @IsString()
  api_key!: string;
  @IsNullable()
  @IsOptional()
  @IsString()
  endpoint?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  api_version?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  deployment_name?: string | null;
}

export class IntricTenantsPresentationTenantSelfCredentialsRouterSetCredentialResponse {
  @IsDefined()
  @IsString()
  provider!: string;
  @IsDefined()
  @IsString()
  masked_key!: string;
  @IsDefined()
  @IsString()
  message!: string;
  @IsDefined()
  @IsString()
  set_at!: string;
}

export class IntricWebsitesCrawlDependenciesCrawlModelsCrawlRunPublic {
  @IsNullable()
  @IsOptional()
  @IsString()
  created_at?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  updated_at?: string | null;
  @IsDefined()
  @IsString()
  id!: string;
  @IsNullable()
  @IsOptional()
  @IsInt()
  pages_crawled?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  files_downloaded?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  pages_failed?: number | null;
  @IsNullable()
  @IsOptional()
  @IsInt()
  files_failed?: number | null;
  @IsNullable()
  @IsOptional()
  @Allow()
  failure_summary?: Record<string, number> | null;
  @IsNullable()
  @IsOptional()
  @IsEnum(Status)
  status?: Status | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  result_location?: string | null;
  @IsNullable()
  @IsOptional()
  @IsString()
  finished_at?: string | null;
}

export class SSEText {
  @IsDefined()
  @IsString()
  session_id!: string;
  @IsDefined()
  @IsString()
  answer!: string;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => InfoBlobAskAssistantPublic)
  references!: InfoBlobAskAssistantPublic[];
}

export class SSEIntricEvent {
  @IsDefined()
  @IsString()
  session_id!: string;
  @IsDefined()
  @IsEnum(IntricEventType)
  intric_event_type!: IntricEventType;
}

export class SSEToolCall {
  @IsDefined()
  @IsString()
  session_id!: string;
  @IsOptional()
  @IsEnum(IntricEventType)
  intric_event_type?: IntricEventType;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ToolCallInfo)
  tools!: ToolCallInfo[];
}

export class SSEToolApprovalRequired {
  @IsDefined()
  @IsString()
  session_id!: string;
  @IsOptional()
  @IsEnum(IntricEventType)
  intric_event_type?: IntricEventType;
  @IsDefined()
  @IsString()
  approval_id!: string;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ToolCallInfo)
  tools!: ToolCallInfo[];
}

export class SSEToolApprovalTimeout {
  @IsDefined()
  @IsString()
  session_id!: string;
  @IsOptional()
  @IsEnum(IntricEventType)
  intric_event_type?: IntricEventType;
  @IsDefined()
  @IsString()
  approval_id!: string;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ToolCallInfo)
  tools!: ToolCallInfo[];
}

export class TokenUsageEvent {
  @IsDefined()
  @IsInt()
  prompt_tokens!: number;
  @IsDefined()
  @IsInt()
  completion_tokens!: number;
  @IsDefined()
  @IsInt()
  turn_tokens!: number;
}

export class SSETokenUsage {
  @IsDefined()
  @IsString()
  session_id!: string;
  @IsOptional()
  @IsEnum(IntricEventType)
  intric_event_type?: IntricEventType;
  @IsDefined()
  @ValidateNested()
  @Type(() => TokenUsageEvent)
  usage!: TokenUsageEvent;
}

export class SSEFiles {
  @IsDefined()
  @IsString()
  session_id!: string;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  generated_files!: FilePublic[];
}

export class SSEFirstChunk {
  @IsDefined()
  @IsString()
  session_id!: string;
  @IsDefined()
  @IsString()
  question!: string;
  @IsDefined()
  @IsString()
  answer!: string;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  files!: FilePublic[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  generated_files!: FilePublic[];
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => InfoBlobAskAssistantPublic)
  references!: InfoBlobAskAssistantPublic[];
  @IsDefined()
  @ValidateNested()
  @Type(() => UseTools)
  tools!: UseTools;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => WebSearchResultPublic)
  web_search_references!: WebSearchResultPublic[];
}

export class SSEError {
  @IsDefined()
  @IsString()
  session_id!: string;
  @IsDefined()
  @IsString()
  error!: string;
  @IsNullable()
  @IsOptional()
  @IsInt()
  error_code?: number | null;
}
