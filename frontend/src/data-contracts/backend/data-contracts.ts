/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
  name: string;
  username: string;
}

export interface UserApiResponse {
  data: User;
  message: string;
}

export interface ARQHealth {
  heartbeat_ttl_seconds?: number | null;
  age_seconds?: number | null;
  j_complete?: number;
  j_failed?: number;
  j_retried?: number;
  j_ongoing?: number;
  queued?: number;
}

export interface AcceptedFileType {
  mimetype: string;
  size_limit: number;
}

export interface AccessJustificationRequest {
  category: string;
  description: string;
}

export interface AccessJustificationResponse {
  status?: string;
  message?: string | null;
}

export interface AccessToken {
  access_token: string;
  token_type: string;
}

export interface AccessTokenResponse {
  access_token: string;
}

export interface ActionConfig {
  action: string;
  enabled: boolean;
  category: string;
  name_sv: string;
  description_sv: string;
}

export interface ActionConfigResponse {
  actions: ActionConfig[];
}

export interface ActionUpdate {
  action: string;
  enabled: boolean;
}

export interface ActionConfigUpdateRequest {
  updates: ActionUpdate[];
}

export interface AddSpaceGroupMemberRequest {
  id: string;
  role: AddSpaceGroupMemberRequestRoleEnum;
}

export interface AddSpaceMemberRequest {
  id: string;
  role: AddSpaceMemberRequestRoleEnum;
}

export interface AdditionalField {
  type: AdditionalFieldTypeEnum;
  value: any;
}

export interface AllowedOriginCreate {
  url: string;
  tenant_id: string;
}

export interface AllowedOriginInDB {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  url: string;
  tenant_id: string;
}

export interface AllowedOriginPublic {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  url: string;
}

export interface AnalysisJobStatusResponse {
  job_id: string;
  status: AnalysisJobStatusResponseStatusEnum;
  answer?: string | null;
  error?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiKey {
  truncated_key: string;
  key: string;
}

export interface ResourcePermissions {
  assistants?: ResourcePermissionsAssistantsEnum;
  apps?: ResourcePermissionsAppsEnum;
  spaces?: ResourcePermissionsSpacesEnum;
  knowledge?: ResourcePermissionsKnowledgeEnum;
  conversations?: ResourcePermissionsConversationsEnum;
  files?: ResourcePermissionsFilesEnum;
  jobs?: ResourcePermissionsJobsEnum;
  prompts?: ResourcePermissionsPromptsEnum;
}

export interface ApiKeyCreateRequest {
  name: string;
  description?: string | null;
  key_type: ApiKeyCreateRequestKeyTypeEnum;
  permission?: ApiKeyCreateRequestPermissionEnum;
  scope_type: ApiKeyCreateRequestScopeTypeEnum;
  scope_id?: string | null;
  ownership?: ApiKeyCreateRequestOwnershipEnum;
  allowed_origins?: string[] | null;
  allowed_ips?: string[] | null;
  expires_at?: string | null;
  rate_limit?: number | null;
  resource_permissions?: ResourcePermissions | null;
}

export interface ApiKeyUserSnapshot {
  id: string;
  email?: string | null;
  username?: string | null;
}

export interface ApiKeyV2 {
  id: string;
  ownership?: ApiKeyV2OwnershipEnum;
  owner_user_id?: string | null;
  key_prefix: string;
  key_suffix: string;
  name: string;
  description?: string | null;
  key_type: ApiKeyV2KeyTypeEnum;
  permission: ApiKeyV2PermissionEnum;
  scope_type: ApiKeyV2ScopeTypeEnum;
  scope_id?: string | null;
  allowed_origins?: string[] | null;
  allowed_ips?: string[] | null;
  resource_permissions?: any | null;
  state: ApiKeyV2StateEnum;
  expires_at?: string | null;
  last_used_at?: string | null;
  revoked_at?: string | null;
  revoked_reason_code?: ApiKeyV2RevokedReasonCodeEnum | null;
  revoked_reason_text?: string | null;
  suspended_at?: string | null;
  suspended_reason_code?: ApiKeyV2SuspendedReasonCodeEnum | null;
  suspended_reason_text?: string | null;
  rotation_grace_until?: string | null;
  rate_limit?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  rotated_from_key_id?: string | null;
  created_by_user_id?: string | null;
  owner_user?: ApiKeyUserSnapshot | null;
  created_by_user?: ApiKeyUserSnapshot | null;
  search_match_reasons?: ApiKeyV2SearchMatchReasonsEnum[] | null;
}

export interface ApiKeyCreatedResponse {
  api_key: ApiKeyV2;
  secret: string;
}

export interface ApiKeyCreationConstraints {
  require_expiration?: boolean;
  max_expiration_days?: number | null;
  max_rate_limit?: number | null;
  rotation_grace_hours?: number;
}

export interface ApiKeyErrorResponse {
  code: string;
  message: string;
}

export interface ApiKeyExactLookupRequest {
  secret: string;
}

export interface ApiKeyExactLookupResponse {
  api_key: ApiKeyV2;
  match_reason?: ApiKeyExactLookupResponseMatchReasonEnum;
}

export interface ApiKeyExtendRequest {
  expires_at?: string | null;
}

export interface ApiKeyListResponse {
  items: ApiKeyV2[];
  limit?: number | null;
  next_cursor?: string | null;
  previous_cursor?: string | null;
  total_count?: number | null;
}

export interface ApiKeyNotificationPolicyResponse {
  enabled?: boolean;
  default_days_before_expiry?: number[];
  max_days_before_expiry?: number | null;
  allow_auto_follow_published_assistants?: boolean;
  allow_auto_follow_published_apps?: boolean;
}

export interface ApiKeyNotificationPolicyUpdate {
  enabled?: boolean | null;
  default_days_before_expiry?: number[] | null;
  max_days_before_expiry?: number | null;
  allow_auto_follow_published_assistants?: boolean | null;
  allow_auto_follow_published_apps?: boolean | null;
}

export interface ApiKeyNotificationPreferencesResponse {
  enabled?: boolean;
  days_before_expiry?: number[];
  auto_follow_published_assistants?: boolean;
  auto_follow_published_apps?: boolean;
}

export interface ApiKeyNotificationPreferencesUpdate {
  enabled?: boolean | null;
  days_before_expiry?: number[] | null;
  auto_follow_published_assistants?: boolean | null;
  auto_follow_published_apps?: boolean | null;
}

export interface ApiKeyNotificationSubscription {
  target_type: ApiKeyNotificationSubscriptionTargetTypeEnum;
  target_id: string;
}

export interface ApiKeyNotificationSubscriptionListResponse {
  items: ApiKeyNotificationSubscription[];
}

export interface ApiKeyPolicyResponse {
  max_delegation_depth?: number | null;
  revocation_cascade_enabled?: boolean | null;
  require_expiration?: boolean | null;
  max_expiration_days?: number | null;
  auto_expire_unused_days?: number | null;
  max_rate_limit_override?: number | null;
  rotation_grace_hours?: number | null;
}

export interface ApiKeyPolicyUpdate {
  max_delegation_depth?: number | null;
  revocation_cascade_enabled?: boolean | null;
  require_expiration?: boolean | null;
  max_expiration_days?: number | null;
  auto_expire_unused_days?: number | null;
  max_rate_limit_override?: number | null;
  rotation_grace_hours?: number | null;
}

export interface ApiKeyRotateRequest {
  update_expiration?: boolean;
  expires_at?: string | null;
  disable_grace_period?: boolean;
}

export interface ApiKeyStateChangeRequest {
  reason_code?: ApiKeyStateChangeRequestReasonCodeEnum | null;
  reason_text?: string | null;
}

export interface ApiKeyUpdateRequest {
  name?: string | null;
  description?: string | null;
  permission?: ApiKeyUpdateRequestPermissionEnum | null;
  allowed_origins?: string[] | null;
  allowed_ips?: string[] | null;
  expires_at?: string | null;
  rate_limit?: number | null;
  resource_permissions?: ResourcePermissions | null;
}

export interface ApiKeyUsageEvent {
  id: string;
  timestamp: string;
  action: string;
  outcome: string;
  ip_address?: string | null;
  user_agent?: string | null;
  request_id?: string | null;
  request_path?: string | null;
  method?: string | null;
  origin?: string | null;
  error_message?: string | null;
}

export interface ApiKeyUsageSummary {
  total_events: number;
  used_events: number;
  auth_failed_events: number;
  last_seen_at?: string | null;
  last_success_at?: string | null;
  last_failure_at?: string | null;
  sampled_used_events?: boolean;
}

export interface ApiKeyUsageResponse {
  summary: ApiKeyUsageSummary;
  items: ApiKeyUsageEvent[];
  limit: number;
  next_cursor?: string | null;
}

export interface ApiKeyV2InDB {
  id: string;
  ownership?: ApiKeyV2InDbOwnershipEnum;
  owner_user_id?: string | null;
  key_prefix: string;
  key_suffix: string;
  name: string;
  description?: string | null;
  key_type: ApiKeyV2InDbKeyTypeEnum;
  permission: ApiKeyV2InDbPermissionEnum;
  scope_type: ApiKeyV2InDbScopeTypeEnum;
  scope_id?: string | null;
  allowed_origins?: string[] | null;
  allowed_ips?: string[] | null;
  resource_permissions?: any | null;
  state: ApiKeyV2InDbStateEnum;
  expires_at?: string | null;
  last_used_at?: string | null;
  revoked_at?: string | null;
  revoked_reason_code?: ApiKeyV2InDbRevokedReasonCodeEnum | null;
  revoked_reason_text?: string | null;
  suspended_at?: string | null;
  suspended_reason_code?: ApiKeyV2InDbSuspendedReasonCodeEnum | null;
  suspended_reason_text?: string | null;
  rotation_grace_until?: string | null;
  rate_limit?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  rotated_from_key_id?: string | null;
  created_by_user_id?: string | null;
  owner_user?: ApiKeyUserSnapshot | null;
  created_by_user?: ApiKeyUserSnapshot | null;
  search_match_reasons?: ApiKeyV2InDbSearchMatchReasonsEnum[] | null;
  tenant_id: string;
  created_by_key_id?: string | null;
  delegation_depth?: number;
  key_hash: string;
  hash_version: string;
}

export interface CompletionModelPublicAppTemplate {
  id: string;
}

export interface PromptPublicAppTemplate {
  text?: string | null;
}

export interface AppInTemplatePublic {
  name: string;
  completion_model?: CompletionModelPublicAppTemplate | null;
  completion_model_kwargs: any;
  prompt?: PromptPublicAppTemplate | null;
  input_description?: string | null;
  input_type: string;
}

export interface ModelKwargCapability {
  supported?: boolean;
  control?: ModelKwargCapabilityControlEnum | null;
  minimum?: number | null;
  maximum?: number | null;
  step?: number | null;
  options?: string[] | null;
}

export interface SupportedModelKwargs {
  temperature?: ModelKwargCapability;
  top_p?: ModelKwargCapability;
  reasoning_effort?: ModelKwargCapability;
  verbosity?: ModelKwargCapability;
  presence_penalty?: ModelKwargCapability;
  frequency_penalty?: ModelKwargCapability;
  top_k?: ModelKwargCapability;
}

export interface CompletionModelSparse {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  nickname?: string | null;
  family?: string | null;
  max_input_tokens: number;
  max_output_tokens: number;
  is_deprecated: boolean;
  nr_billion_parameters?: number | null;
  hf_link?: string | null;
  stability?: string | null;
  hosting?: string | null;
  open_source?: boolean | null;
  description?: string | null;
  deployment_name?: string | null;
  org?: string | null;
  vision: boolean;
  reasoning: boolean;
  supports_tool_calling?: boolean;
  base_url?: string | null;
  litellm_model_name?: string | null;
  model_kwargs_capabilities?: SupportedModelKwargs | null;
  provider_type?: string | null;
  token_limit: number;
  supported_model_kwargs: SupportedModelKwargs;
}

export interface FilePublic {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  mimetype: string;
  size: number;
  transcription?: string | null;
  token_count?: number | null;
}

export interface Limit {
  max_files: number;
  max_size: number;
}

export interface FileRestrictions {
  accepted_file_types: AcceptedFileType[];
  limit: Limit;
}

export interface InputFieldPublic {
  accepted_file_types: AcceptedFileType[];
  limit: Limit;
  type: InputFieldPublicTypeEnum;
  description?: string | null;
}

export interface ModelKwargs {
  temperature?: number | null;
  top_p?: number | null;
  reasoning_effort?: string | null;
  verbosity?: string | null;
  response_format?: any | null;
  presence_penalty?: number | null;
  frequency_penalty?: number | null;
  top_k?: number | null;
}

export interface UserSparse {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  email: string;
  username?: string | null;
}

export interface PromptPublic {
  permissions?: PromptPublicPermissionsEnum[];
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  description?: string | null;
  is_selected?: boolean | null;
  user: UserSparse;
  text: string;
}

export interface SecurityClassificationPublic {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  description?: string | null;
  security_level: number;
}

export interface TranscriptionModelPublic {
  id: string;
  name: string;
  nickname: string;
  family?: string | null;
  is_deprecated: boolean;
  stability?: string | null;
  hosting?: string | null;
  open_source?: boolean | null;
  description?: string | null;
  hf_link?: string | null;
  org?: string | null;
  can_access?: boolean;
  is_locked?: boolean;
  lock_reason?: string | null;
  is_org_enabled?: boolean;
  is_org_default?: boolean;
  credential_provider?: string | null;
  security_classification?: SecurityClassificationPublic | null;
  tenant_id?: string | null;
  provider_id?: string | null;
  provider_name?: string | null;
  provider_type?: string | null;
}

export interface AppPublic {
  permissions?: AppPublicPermissionsEnum[];
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  description?: string | null;
  input_fields: InputFieldPublic[];
  attachments: FilePublic[];
  prompt?: PromptPublic | null;
  completion_model?: CompletionModelSparse | null;
  completion_model_kwargs: ModelKwargs;
  allowed_attachments: FileRestrictions;
  published: boolean;
  transcription_model?: TranscriptionModelPublic | null;
  data_retention_days?: number | null;
  icon_id?: string | null;
}

export interface AppRunInput {
  files: FilePublic[];
  text?: string | null;
}

export interface AppRunPublic {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  input: AppRunInput;
  status: AppRunPublicStatusEnum;
  finished_at?: string | null;
  user: UserSparse;
  output?: string | null;
}

export interface AppRunSparse {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  input: AppRunInput;
  status: AppRunSparseStatusEnum;
  finished_at?: string | null;
  user: UserSparse;
}

export interface AppSparse {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  permissions?: AppSparsePermissionsEnum[];
  name: string;
  description?: string | null;
  published: boolean;
  user_id: string;
  icon_id?: string | null;
}

export interface TemplateWizard {
  required?: boolean;
  title?: string | null;
  description?: string | null;
}

export interface AppTemplateWizard {
  attachments?: TemplateWizard | null;
  collections?: TemplateWizard | null;
}

export interface AppTemplateAdminCreate {
  name: string;
  description?: string | null;
  category: string;
  prompt?: string | null;
  completion_model_kwargs?: any;
  completion_model_id?: string | null;
  wizard?: AppTemplateWizard | null;
  input_type: string;
  input_description?: string | null;
  icon_name?: string | null;
}

export interface AppTemplateAdminPublic {
  id: string;
  name: string;
  description: string;
  category: string;
  prompt_text?: string | null;
  completion_model_kwargs?: any;
  completion_model_id?: string | null;
  completion_model_name?: string | null;
  wizard?: AppTemplateWizard | null;
  input_type: string;
  input_description?: string | null;
  organization: string;
  tenant_id: string;
  deleted_at?: string | null;
  deleted_by_user_id?: string | null;
  restored_at?: string | null;
  restored_by_user_id?: string | null;
  original_snapshot?: any | null;
  created_at: string;
  updated_at: string;
  usage_count?: number;
  is_default?: boolean;
  icon_name?: string | null;
}

export interface AppTemplateAdminListPublic {
  items: AppTemplateAdminPublic[];
  count: number;
}

export interface AppTemplateAdminUpdate {
  name?: string | null;
  description?: string | null;
  category?: string | null;
  prompt?: string | null;
  completion_model_kwargs?: any | null;
  completion_model_id?: string | null;
  wizard?: AppTemplateWizard | null;
  input_type?: string | null;
  input_description?: string | null;
  icon_name?: string | null;
}

export interface AppTemplateOrganization {
  name: string;
}

export interface AppTemplatePublic {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description?: string | null;
  category: string;
  app: AppInTemplatePublic;
  type: string;
  wizard: AppTemplateWizard;
  organization: AppTemplateOrganization;
  is_default?: boolean;
  icon_name?: string | null;
}

export interface AppTemplateListPublic {
  items: AppTemplatePublic[];
  count: number;
}

export interface AppTemplateToggleDefaultRequest {
  is_default: boolean;
}

export interface InputField {
  type: InputFieldTypeEnum;
  description?: string | null;
}

export interface ModelId {
  id: string;
}

export interface PromptCreate {
  text: string;
  description?: string | null;
}

export interface AppUpdateRequest {
  name?: string | null;
  description?: string | null;
  input_fields?: InputField[] | null;
  attachments?: ModelId[] | null;
  prompt?: PromptCreate | null;
  completion_model?: ModelId | null;
  completion_model_kwargs?: ModelKwargs | null;
  transcription_model?: ModelId | null;
  data_retention_days?: number | null;
  icon_id?: string | null;
}

export interface PaginatedPermissionsAppSparse {
  permissions?: PaginatedPermissionsAppSparsePermissionsEnum[];
  items: AppSparse[];
  count: number;
}

export interface AssistantSparse {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  completion_model_kwargs?: ModelKwargs | null;
  logging_enabled?: boolean | null;
  permissions?: AssistantSparsePermissionsEnum[];
  user_id: string;
  published?: boolean;
  description?: string | null;
  metadata_json?: any | null;
  type: AssistantSparseTypeEnum;
  icon_id?: string | null;
  completion_model_id?: string | null;
}

export interface PaginatedPermissionsAssistantSparse {
  permissions?: PaginatedPermissionsAssistantSparsePermissionsEnum[];
  items: AssistantSparse[];
  count: number;
}

export interface GroupChatSparse {
  permissions?: GroupChatSparsePermissionsEnum[];
  created_at: string;
  updated_at: string;
  name: string;
  id: string;
  user_id: string;
  published: boolean;
  type: string;
  metadata_json?: any | null;
  icon_id?: string | null;
}

export interface PaginatedPermissionsGroupChatSparse {
  permissions?: PaginatedPermissionsGroupChatSparsePermissionsEnum[];
  items: GroupChatSparse[];
  count: number;
}

export interface ServiceSparse {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  output_format?: ServiceSparseOutputFormatEnum | null;
  json_schema?: any | null;
  name: string;
  prompt: string;
  completion_model_kwargs?: ModelKwargs;
  permissions?: ServiceSparsePermissionsEnum[];
  user_id: string;
}

export interface PaginatedPermissionsServiceSparse {
  permissions?: PaginatedPermissionsServiceSparsePermissionsEnum[];
  items: ServiceSparse[];
  count: number;
}

export interface Applications {
  assistants: PaginatedPermissionsAssistantSparse;
  group_chats: PaginatedPermissionsGroupChatSparse;
  services: PaginatedPermissionsServiceSparse;
  apps: PaginatedPermissionsAppSparse;
}

export interface AskAnalysis {
  question: string;
  completion_model_id?: string | null;
  stream?: boolean;
}

export interface ToolAssistant {
  id: string;
  handle: string;
}

export interface UseTools {
  assistants: ToolAssistant[];
}

export interface AskAssistant {
  question: string;
  session_id?: string | null;
  files?: string[];
  stream?: boolean;
  tools?: UseTools | null;
}

export interface CompletionModelPublic {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  nickname?: string | null;
  family?: string | null;
  max_input_tokens: number;
  max_output_tokens: number;
  is_deprecated: boolean;
  nr_billion_parameters?: number | null;
  hf_link?: string | null;
  stability?: string | null;
  hosting?: string | null;
  open_source?: boolean | null;
  description?: string | null;
  deployment_name?: string | null;
  org?: string | null;
  vision: boolean;
  reasoning: boolean;
  supports_tool_calling?: boolean;
  base_url?: string | null;
  litellm_model_name?: string | null;
  model_kwargs_capabilities?: SupportedModelKwargs | null;
  is_org_enabled?: boolean;
  is_org_default?: boolean;
  tenant_id?: string | null;
  provider_id?: string | null;
  provider_type?: string | null;
  can_access?: boolean;
  is_locked?: boolean;
  lock_reason?: string | null;
  credential_provider?: string | null;
  security_classification?: SecurityClassificationPublic | null;
  provider_name?: string | null;
  token_limit: number;
  supported_model_kwargs: SupportedModelKwargs;
}

export interface InfoBlobMetadata {
  url?: string | null;
  title?: string | null;
  embedding_model_id: string;
  size: number;
}

export interface InfoBlobAskAssistantPublic {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  metadata: InfoBlobMetadata;
  group_id?: string | null;
  website_id?: string | null;
  score: number;
}

export interface WebSearchResultPublic {
  id: string;
  title: string;
  url: string;
}

export interface AskResponse {
  session_id: string;
  question: string;
  answer: string;
  files: FilePublic[];
  generated_files: FilePublic[];
  references: InfoBlobAskAssistantPublic[];
  tools: UseTools;
  web_search_references: WebSearchResultPublic[];
  model?: CompletionModelPublic | null;
}

export interface AssistantActivityStats {
  active_assistant_count: number;
  total_trackable_assistants: number;
  active_assistant_pct: number;
  active_user_count: number;
}

export interface AssistantGuard {
  guardrail_active?: boolean;
  guardrail_string?: string;
  on_fail_message?: string;
}

export interface AssistantCreatePublic {
  name: string;
  completion_model_kwargs?: ModelKwargs | null;
  logging_enabled?: boolean | null;
  space_id: string;
  prompt?: PromptCreate | null;
  groups?: ModelId[];
  websites?: ModelId[];
  integration_knowledge_list?: ModelId[];
  mcp_servers?: ModelId[];
  guardrail?: AssistantGuard | null;
  completion_model?: ModelId | null;
}

export interface CompletionModelPublicAssistantTemplate {
  id: string;
}

export interface PromptPublicAssistantTemplate {
  text?: string | null;
}

export interface AssistantInTemplatePublic {
  name: string;
  completion_model?: CompletionModelPublicAssistantTemplate | null;
  completion_model_kwargs?: any;
  prompt?: PromptPublicAssistantTemplate | null;
}

export interface AssistantInsightQuestion {
  id: string;
  question: string;
  created_at: string;
  session_id: string;
}

export interface AssistantMetadata {
  id: string;
  created_at: string;
}

export interface CollectionMetadata {
  num_info_blobs: number;
  size: number;
}

export interface EmbeddingModelPublic {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  nickname?: string | null;
  family?: string | null;
  is_deprecated: boolean;
  open_source: boolean;
  dimensions?: number | null;
  max_input?: number | null;
  hf_link?: string | null;
  stability?: string | null;
  hosting?: string | null;
  description?: string | null;
  org?: string | null;
  litellm_model_name?: string | null;
  can_access?: boolean;
  is_locked?: boolean;
  lock_reason?: string | null;
  is_org_enabled?: boolean;
  credential_provider?: string | null;
  security_classification?: SecurityClassificationPublic | null;
  tenant_id?: string | null;
  provider_id?: string | null;
  provider_name?: string | null;
  provider_type?: string | null;
}

export interface CollectionPublic {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  permissions?: CollectionPublicPermissionsEnum[];
  name: string;
  embedding_model: EmbeddingModelPublic;
  metadata: CollectionMetadata;
  space_id: string;
}

export interface EmbeddingModelPublicLegacy {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  family?: string | null;
  is_deprecated: boolean;
  open_source: boolean;
  dimensions?: number | null;
  max_input?: number | null;
  max_batch_size?: number | null;
  hf_link?: string | null;
  stability?: string | null;
  hosting?: string | null;
  description?: string | null;
  org?: string | null;
  litellm_model_name?: string | null;
  is_org_enabled?: boolean;
  can_access?: boolean;
  is_locked?: boolean;
  lock_reason?: string | null;
}

export interface IntegrationKnowledgeMetaData {
  size: number;
  last_sync_summary?: any | null;
  last_synced_at?: string | null;
  sharepoint_subscription_expires_at?: string | null;
}

export interface IntegrationKnowledgePublic {
  id: string;
  name: string;
  original_name?: string | null;
  url: string;
  tenant_id: string;
  space_id: string;
  user_integration_id: string;
  embedding_model: EmbeddingModelPublicLegacy;
  site_id?: string | null;
  drive_id?: string | null;
  resource_type?: string | null;
  sharepoint_subscription_id?: string | null;
  folder_id?: string | null;
  folder_path?: string | null;
  selected_item_type?: string | null;
  wrapper_id?: string | null;
  wrapper_name?: string | null;
  permissions?: IntegrationKnowledgePublicPermissionsEnum[];
  metadata: IntegrationKnowledgeMetaData;
  integration_type: IntegrationKnowledgePublicIntegrationTypeEnum;
  task: any;
}

export interface MCPServerPublicDict {
  id: string;
  name: string;
  description?: string | null;
  http_url?: string | null;
  http_auth_type?: string | null;
  tags?: string[] | null;
  icon_url?: string | null;
  security_classification?: any | null;
  tools: any;
}

export interface MCPToolSetting {
  tool_id: string;
  is_enabled: boolean;
}

export interface ModelInfo {
  name: string;
  max_input_tokens: number;
  max_output_tokens: number;
  prompt_tokens?: number | null;
  token_limit: number;
}

export interface WebsiteMetadata {
  size: number;
}

export interface IntricWebsitesPresentationWebsiteModelsCrawlRunPublic {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  pages_crawled?: number | null;
  files_downloaded?: number | null;
  pages_failed?: number | null;
  files_failed?: number | null;
  failure_summary?: any | null;
  status: IntricWebsitesPresentationWebsiteModelsCrawlRunPublicStatusEnum;
  result_location?: string | null;
  finished_at?: string | null;
}

export interface WebsitePublic {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  permissions?: WebsitePublicPermissionsEnum[];
  name?: string | null;
  url: string;
  space_id: string;
  download_files: boolean;
  crawl_type: WebsitePublicCrawlTypeEnum;
  update_interval: WebsitePublicUpdateIntervalEnum;
  latest_crawl?: IntricWebsitesPresentationWebsiteModelsCrawlRunPublic | null;
  embedding_model: EmbeddingModelPublic;
  metadata: WebsiteMetadata;
  requires_http_auth: boolean;
  consecutive_failures?: number;
  next_retry_at?: string | null;
  is_auto_disabled: boolean;
}

export interface AssistantPublic {
  permissions?: AssistantPublicPermissionsEnum[];
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  prompt?: PromptPublic | null;
  space_id: string;
  completion_model_kwargs: ModelKwargs;
  logging_enabled?: boolean | null;
  attachments: FilePublic[];
  allowed_attachments: FileRestrictions;
  groups: CollectionPublic[];
  websites: WebsitePublic[];
  integration_knowledge_list: IntegrationKnowledgePublic[];
  mcp_servers?: MCPServerPublicDict[];
  mcp_tools?: MCPToolSetting[];
  completion_model?: CompletionModelSparse | null;
  published?: boolean;
  user: UserSparse;
  tools: UseTools;
  type: AssistantPublicTypeEnum;
  model_info?: ModelInfo | null;
  description?: string | null;
  icon_id?: string | null;
  insight_enabled: boolean;
  data_retention_days?: number | null;
  metadata_json?: any | null;
}

export interface AssistantTemplateWizard {
  attachments?: TemplateWizard | null;
  collections?: TemplateWizard | null;
}

export interface AssistantTemplateAdminCreate {
  name: string;
  description?: string | null;
  category: string;
  prompt?: string | null;
  completion_model_kwargs?: any;
  completion_model_id?: string | null;
  wizard?: AssistantTemplateWizard | null;
  icon_name?: string | null;
}

export interface AssistantTemplateAdminPublic {
  id: string;
  name: string;
  description: string;
  category: string;
  prompt_text?: string | null;
  completion_model_kwargs?: any;
  completion_model_id?: string | null;
  completion_model_name?: string | null;
  wizard?: AssistantTemplateWizard | null;
  organization: string;
  tenant_id: string;
  deleted_at?: string | null;
  deleted_by_user_id?: string | null;
  restored_at?: string | null;
  restored_by_user_id?: string | null;
  original_snapshot?: any | null;
  created_at: string;
  updated_at: string;
  usage_count?: number;
  is_default?: boolean;
  icon_name?: string | null;
}

export interface AssistantTemplateAdminListPublic {
  items: AssistantTemplateAdminPublic[];
  count: number;
}

export interface AssistantTemplateAdminUpdate {
  name?: string | null;
  description?: string | null;
  category?: string | null;
  prompt?: string | null;
  completion_model_kwargs?: any | null;
  completion_model_id?: string | null;
  wizard?: AssistantTemplateWizard | null;
  icon_name?: string | null;
}

export interface AssistantTemplateOrganization {
  name: string;
}

export interface AssistantTemplatePublic {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  category: string;
  assistant: AssistantInTemplatePublic;
  type: string;
  wizard: AssistantTemplateWizard;
  organization: AssistantTemplateOrganization;
  is_default?: boolean;
  icon_name?: string | null;
}

export interface AssistantTemplateListPublic {
  items: AssistantTemplatePublic[];
  count: number;
}

export interface AssistantTemplateToggleDefaultRequest {
  is_default: boolean;
}

export interface FormatLimit {
  mimetype: string;
  size: number;
  extensions: string[];
  vision: boolean;
}

export interface AttachmentLimits {
  formats: FormatLimit[];
}

export interface CategoryConfig {
  category: string;
  enabled: boolean;
  description: string;
  action_count: number;
  example_actions: string[];
}

export interface AuditConfigResponse {
  categories: CategoryConfig[];
}

export interface CategoryUpdate {
  category: string;
  enabled: boolean;
}

export interface AuditConfigUpdateRequest {
  updates: CategoryUpdate[];
}

export interface AuditLogResponse {
  id: string;
  tenant_id: string;
  actor_id?: string | null;
  actor_type: AuditLogResponseActorTypeEnum;
  action: AuditLogResponseActionEnum;
  entity_type: AuditLogResponseEntityTypeEnum;
  entity_id: string;
  timestamp: string;
  description: string;
  metadata: any;
  outcome: AuditLogResponseOutcomeEnum;
  ip_address?: string | null;
  user_agent?: string | null;
  request_id?: string | null;
  error_message?: string | null;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuditLogListResponse {
  logs: AuditLogResponse[];
  total_count: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface AuthCallbackParams {
  auth_code: string;
  tenant_integration_id: string;
}

export interface AuthUrlPublic {
  auth_url: string;
}

export interface BodyLoginApiV1UsersLoginTokenPost {
  grant_type?: string | null;
  username: string;
  password: string;
  scope?: string;
  client_id?: string | null;
  client_secret?: string | null;
}

export interface BodyCreateIconApiV1IconsPost {
  file: any;
}

export interface BodyUploadFileApiV1FilesPost {
  upload_file: any;
}

export interface BodyUploadFileApiV1GroupsIdInfoBlobsUploadPost {
  file: any;
}

export interface BulkCrawlRequest {
  website_ids: string[];
}

export interface BulkCrawlResponse {
  total: number;
  queued: number;
  failed: number;
  crawl_runs: IntricWebsitesPresentationWebsiteModelsCrawlRunPublic[];
  errors: any;
}

export interface CallbackRequest {
  code: string;
  state: string;
  code_verifier?: string | null;
}

export interface CollectionUpdate {
  name: string;
}

export interface CompletionModel {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  nickname?: string | null;
  family?: string | null;
  max_input_tokens: number;
  max_output_tokens: number;
  is_deprecated: boolean;
  nr_billion_parameters?: number | null;
  hf_link?: string | null;
  stability?: string | null;
  hosting?: string | null;
  open_source?: boolean | null;
  description?: string | null;
  deployment_name?: string | null;
  org?: string | null;
  vision: boolean;
  reasoning: boolean;
  supports_tool_calling?: boolean;
  base_url?: string | null;
  litellm_model_name?: string | null;
  model_kwargs_capabilities?: SupportedModelKwargs | null;
  is_org_enabled?: boolean;
  is_org_default?: boolean;
  tenant_id?: string | null;
  provider_id?: string | null;
  provider_type?: string | null;
  token_limit: number;
  supported_model_kwargs: SupportedModelKwargs;
}

export interface CompletionModelCreate {
  name: string;
  nickname?: string | null;
  family?: string | null;
  max_input_tokens: number;
  max_output_tokens: number;
  is_deprecated: boolean;
  nr_billion_parameters?: number | null;
  hf_link?: string | null;
  stability?: string | null;
  hosting?: string | null;
  open_source?: boolean | null;
  description?: string | null;
  deployment_name?: string | null;
  org?: string | null;
  vision: boolean;
  reasoning: boolean;
  supports_tool_calling?: boolean;
  base_url?: string | null;
  litellm_model_name?: string | null;
  model_kwargs_capabilities?: SupportedModelKwargs | null;
}

export interface CompletionModelSecurityStatus {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  nickname?: string | null;
  family?: string | null;
  max_input_tokens: number;
  max_output_tokens: number;
  is_deprecated: boolean;
  nr_billion_parameters?: number | null;
  hf_link?: string | null;
  stability?: string | null;
  hosting?: string | null;
  open_source?: boolean | null;
  description?: string | null;
  deployment_name?: string | null;
  org?: string | null;
  vision: boolean;
  reasoning: boolean;
  supports_tool_calling?: boolean;
  base_url?: string | null;
  litellm_model_name?: string | null;
  model_kwargs_capabilities?: SupportedModelKwargs | null;
  is_org_enabled?: boolean;
  is_org_default?: boolean;
  tenant_id?: string | null;
  provider_id?: string | null;
  provider_type?: string | null;
  can_access?: boolean;
  is_locked?: boolean;
  lock_reason?: string | null;
  credential_provider?: string | null;
  security_classification?: SecurityClassificationPublic | null;
  provider_name?: string | null;
  meets_security_classification?: boolean | null;
  token_limit: number;
  supported_model_kwargs: SupportedModelKwargs;
}

export interface CompletionModelUpdateFlags {
  is_org_enabled?: boolean | null;
  is_org_default?: boolean | null;
  security_classification?: ModelId | null;
}

export interface ConversationInsightResponse {
  total_conversations: number;
  total_questions: number;
}

export interface ConversationRequest {
  question: string;
  session_id?: string | null;
  assistant_id?: string | null;
  group_chat_id?: string | null;
  files?: ModelId[];
  stream?: boolean;
  tools?: UseTools | null;
  use_web_search?: boolean;
  require_tool_approval?: boolean;
}

export interface Counts {
  assistants: number;
  sessions: number;
  questions: number;
}

export interface CrawlerActivity {
  db_in_progress?: number | null;
  db_query_ok?: boolean;
  arq_ongoing?: number;
  delta?: number | null;
}

export interface DebugInfo {
  arq_raw?: string;
  arq_timestamp?: string | null;
  watchdog_timestamp?: string | null;
  redis_db?: number | null;
  queue_name?: string;
}

export interface FeederLeader {
  leader_id?: string | null;
  leader_ttl_seconds?: number | null;
  status?: string;
}

export interface HealthThresholds {
  feeder_interval_seconds: number;
  watchdog_stale_threshold_seconds: number;
  heartbeat_ttl_expected_seconds: number;
}

export interface PendingQueueSummary {
  total?: number;
  tenant_count?: number;
  top_tenants?: any;
}

export interface WatchdogMetrics {
  age_seconds?: number | null;
  zombies_reconciled?: number;
  expired_killed?: number;
  rescued?: number;
  early_zombies_failed?: number;
  long_running_failed?: number;
  slots_released?: number;
}

export interface CrawlerHealthResponse {
  status: string;
  status_flags?: string[];
  status_reason?: string;
  response_timestamp_utc: string;
  crawler_activity?: CrawlerActivity;
  arq?: ARQHealth;
  watchdog?: WatchdogMetrics;
  feeder?: FeederLeader;
  pending?: PendingQueueSummary;
  thresholds: HealthThresholds;
  debug?: DebugInfo;
}

export interface CrawlerSettingsResponse {
  tenant_id: string;
  settings: any;
  overrides: string[];
  updated_at?: string | null;
}

export interface CrawlerSettingsUpdate {
  crawl_max_length?: number | null;
  download_timeout?: number | null;
  download_max_size?: number | null;
  dns_timeout?: number | null;
  retry_times?: number | null;
  closespider_itemcount?: number | null;
  obey_robots?: boolean | null;
  autothrottle_enabled?: boolean | null;
  tenant_worker_concurrency_limit?: number | null;
  crawl_stale_threshold_minutes?: number | null;
  crawl_heartbeat_interval_seconds?: number | null;
  crawl_feeder_enabled?: boolean | null;
  crawl_feeder_interval_seconds?: number | null;
  crawl_feeder_batch_size?: number | null;
  crawl_job_max_age_seconds?: number | null;
}

export interface CreateGroupRequest {
  name: string;
  embedding_model: ModelId;
}

export interface TemplateCreate {
  id: string;
  additional_fields?: AdditionalField[] | null;
}

export interface CreateSpaceAppRequest {
  name: string;
  from_template?: TemplateCreate | null;
}

export interface CreateSpaceAssistantRequest {
  name: string;
  from_template?: TemplateCreate | null;
}

export interface CreateSpaceGroupsRequest {
  name: string;
  embedding_model?: ModelId | null;
}

export interface CreateSpaceIntegrationKnowledge {
  name: string;
  embedding_model: ModelId;
  url: string;
  key?: string | null;
  folder_id?: string | null;
  folder_path?: string | null;
  selected_item_type?: string | null;
  resource_type?: string | null;
}

export interface CreateSpaceIntegrationKnowledgeBatchItem {
  name: string;
  url: string;
  key?: string | null;
  folder_id?: string | null;
  folder_path?: string | null;
  selected_item_type?: string | null;
  resource_type?: string | null;
}

export interface CreateSpaceIntegrationKnowledgeBatchRequest {
  embedding_model: ModelId;
  wrapper_name?: string | null;
  items: CreateSpaceIntegrationKnowledgeBatchItem[];
}

export interface JobPublic {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name?: string | null;
  status: JobPublicStatusEnum;
  task: JobPublicTaskEnum;
  result_location?: string | null;
  finished_at?: string | null;
}

export interface CreateSpaceIntegrationKnowledgeBatchResult {
  index: number;
  name: string;
  status: CreateSpaceIntegrationKnowledgeBatchResultStatusEnum;
  integration_knowledge_id?: string | null;
  job?: JobPublic | null;
  error?: string | null;
}

export interface CreateSpaceIntegrationKnowledgeBatchResponse {
  items: CreateSpaceIntegrationKnowledgeBatchResult[];
  created_count: number;
  failed_count: number;
}

export interface CreateSpaceRequest {
  name: string;
}

export interface CreateSpaceServiceRequest {
  name: string;
}

export interface GroupMetadata {
  num_info_blobs: number;
  size: number;
}

export interface GroupPublicWithMetadata {
  permissions?: GroupPublicWithMetadataPermissionsEnum[];
  name: string;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  embedding_model: EmbeddingModelPublic;
  space_id: string;
  metadata: GroupMetadata;
}

export interface CreateSpaceServiceResponse {
  permissions?: CreateSpaceServiceResponsePermissionsEnum[];
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  prompt: string;
  completion_model_kwargs: ModelKwargs;
  output_format?: CreateSpaceServiceResponseOutputFormatEnum | null;
  json_schema?: any | null;
  groups: GroupPublicWithMetadata[];
  completion_model?: CompletionModelSparse | null;
  published?: boolean;
  user: UserSparse;
}

export interface CursorPaginatedResponseApiKeyV2 {
  items: ApiKeyV2[];
  limit?: number | null;
  next_cursor?: string | null;
  previous_cursor?: string | null;
  total_count: number;
  count: number;
}

export interface CursorPaginatedResponseAssistantInsightQuestion {
  items: AssistantInsightQuestion[];
  limit?: number | null;
  next_cursor?: string | null;
  previous_cursor?: string | null;
  total_count: number;
  count: number;
}

export interface SessionMetadataPublic {
  created_at?: string | null;
  updated_at?: string | null;
  name: string;
  id: string;
}

export interface CursorPaginatedResponseSessionMetadataPublic {
  items: SessionMetadataPublic[];
  limit?: number | null;
  next_cursor?: string | null;
  previous_cursor?: string | null;
  total_count: number;
  count: number;
}

export interface CursorPaginatedResponseUserSparse {
  items: UserSparse[];
  limit?: number | null;
  next_cursor?: string | null;
  previous_cursor?: string | null;
  total_count: number;
  count: number;
}

export interface DefaultAssistant {
  permissions?: DefaultAssistantPermissionsEnum[];
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  prompt?: PromptPublic | null;
  space_id: string;
  completion_model_kwargs: ModelKwargs;
  logging_enabled?: boolean | null;
  attachments: FilePublic[];
  allowed_attachments: FileRestrictions;
  groups: CollectionPublic[];
  websites: WebsitePublic[];
  integration_knowledge_list: IntegrationKnowledgePublic[];
  mcp_servers?: MCPServerPublicDict[];
  mcp_tools?: MCPToolSetting[];
  completion_model?: CompletionModelSparse | null;
  published?: boolean;
  user: UserSparse;
  tools: UseTools;
  type: DefaultAssistantTypeEnum;
  model_info?: ModelInfo | null;
  description?: string | null;
  icon_id?: string | null;
  insight_enabled?: boolean;
  data_retention_days?: number | null;
  metadata_json?: any | null;
}

export interface SpaceDashboard {
  permissions?: SpaceDashboardPermissionsEnum[];
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  description?: string | null;
  personal: boolean;
  organization: boolean;
  icon_id?: string | null;
  applications?: Applications | null;
  default_assistant?: DefaultAssistant | null;
  data_retention_days?: number | null;
}

export interface PaginatedResponseSpaceDashboard {
  items: SpaceDashboard[];
  count: number;
}

export interface Dashboard {
  spaces: PaginatedResponseSpaceDashboard;
}

export interface DeleteCredentialResponse {
  tenant_id: string;
  provider: string;
  message: string;
}

export interface DeleteFederationResponse {
  tenant_id: string;
  message: string;
}

export interface DeleteResponse {
  success: boolean;
}

export interface DeleteSettingsResponse {
  tenant_id: string;
  message: string;
  deleted_keys: string[];
}

export interface EmbeddingModelCreate {
  name: string;
  family?: string | null;
  is_deprecated: boolean;
  open_source: boolean;
  dimensions?: number | null;
  max_input?: number | null;
  max_batch_size?: number | null;
  hf_link?: string | null;
  stability?: string | null;
  hosting?: string | null;
  description?: string | null;
  org?: string | null;
  litellm_model_name?: string | null;
}

export interface EmbeddingModelLegacy {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  family?: string | null;
  is_deprecated: boolean;
  open_source: boolean;
  dimensions?: number | null;
  max_input?: number | null;
  max_batch_size?: number | null;
  hf_link?: string | null;
  stability?: string | null;
  hosting?: string | null;
  description?: string | null;
  org?: string | null;
  litellm_model_name?: string | null;
  is_org_enabled?: boolean;
}

export interface EmbeddingModelSecurityStatus {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  nickname?: string | null;
  family?: string | null;
  is_deprecated: boolean;
  open_source: boolean;
  dimensions?: number | null;
  max_input?: number | null;
  hf_link?: string | null;
  stability?: string | null;
  hosting?: string | null;
  description?: string | null;
  org?: string | null;
  litellm_model_name?: string | null;
  can_access?: boolean;
  is_locked?: boolean;
  lock_reason?: string | null;
  is_org_enabled?: boolean;
  credential_provider?: string | null;
  security_classification?: SecurityClassificationPublic | null;
  tenant_id?: string | null;
  provider_id?: string | null;
  provider_name?: string | null;
  provider_type?: string | null;
  meets_security_classification?: boolean | null;
}

export interface EmbeddingModelSparse {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  family?: string | null;
  is_deprecated: boolean;
  open_source: boolean;
  dimensions?: number | null;
  max_input?: number | null;
  max_batch_size?: number | null;
  hf_link?: string | null;
  stability?: string | null;
  hosting?: string | null;
  description?: string | null;
  org?: string | null;
  litellm_model_name?: string | null;
}

export interface EmbeddingModelUpdate {
  is_org_enabled?: boolean;
  security_classification?: ModelId | null;
}

export interface EmbeddingModelUpdateFlags {
  is_org_enabled?: boolean | null;
}

export interface ExpiringKeySummaryItem {
  id: string;
  name: string;
  key_suffix?: string | null;
  scope_type: ExpiringKeySummaryItemScopeTypeEnum;
  scope_id?: string | null;
  expires_at: string;
  suspended_at?: string | null;
  severity: ExpiringKeySummaryItemSeverityEnum;
}

export interface ExpiringKeysSummary {
  total_count: number;
  counts_by_severity: any;
  earliest_expiration?: string | null;
  items: ExpiringKeySummaryItem[];
  truncated: boolean;
  generated_at: string;
}

export interface ExportJobRequest {
  user_id?: string | null;
  actor_id?: string | null;
  action?: ExportJobRequestActionEnum | null;
  from_date?: string | null;
  to_date?: string | null;
  format?: string;
  max_records?: number | null;
}

export interface ExportJobResponse {
  job_id: string;
  status: string;
  message?: string | null;
}

export interface ExportJobStatusResponse {
  job_id: string;
  status: string;
  progress: number;
  total_records: number;
  processed_records: number;
  format: string;
  file_size_bytes?: number | null;
  error_message?: string | null;
  download_url?: string | null;
  created_at: string;
  started_at?: string | null;
  completed_at?: string | null;
  expires_at: string;
}

export interface FavoriteProvidersUpdate {
  providers: string[];
}

export interface FederationInfo {
  provider: string;
  client_id: string;
  masked_secret: string;
  issuer?: string | null;
  allowed_domains: string[];
  additional_redirect_uris: string[];
  configured_at: string;
  encryption_status: FederationInfoEncryptionStatusEnum;
}

export interface FederationStatusResponse {
  has_single_tenant_federation: boolean;
  has_multi_tenant_federation: boolean;
  has_global_oidc_config: boolean;
  tenant_count: number;
}

export interface GeneralError {
  message: string;
  intric_error_code: GeneralErrorIntricErrorCodeEnum;
  code?: string | null;
  context?: any | null;
  request_id?: string | null;
  details?: any | null;
}

export interface GetModelsResponse {
  completion_models: CompletionModelPublic[];
  embedding_models: EmbeddingModelPublicLegacy[];
}

export interface GroupChatAssistantPublic {
  id: string;
  handle: string;
  default_description?: string | null;
  user_description?: string | null;
}

export interface GroupChatAssistantUpdateSchema {
  id: string;
  user_description?: string | null;
}

export interface GroupChatCreate {
  name: string;
}

export interface GroupChatTools {
  assistants: GroupChatAssistantPublic[];
}

export interface GroupChatPublic {
  created_at: string;
  updated_at: string;
  name: string;
  id: string;
  space_id: string;
  allow_mentions: boolean;
  show_response_label: boolean;
  published: boolean;
  insight_enabled: boolean;
  tools: GroupChatTools;
  attachments: FilePublic[];
  allowed_attachments: FileRestrictions;
  type: string;
  permissions: GroupChatPublicPermissionsEnum[];
  metadata_json?: any | null;
  icon_id?: string | null;
}

export interface GroupChatUpdateTools {
  assistants: GroupChatAssistantUpdateSchema[];
}

export interface GroupChatUpdateSchema {
  name?: string | null;
  space_id?: string | null;
  tools?: GroupChatUpdateTools | null;
  allow_mentions?: boolean | null;
  show_response_label?: boolean | null;
  insight_enabled?: boolean | null;
  metadata_json?: any | null;
  icon_id?: string | null;
}

export interface GroupPublicBase {
  name: string;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface ValidationError {
  loc: string[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}

export interface IconPublic {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface InfoBlobMetadataUpsertPublic {
  url?: string | null;
  title?: string | null;
}

export interface InfoBlobAddPublic {
  text: string;
  metadata?: InfoBlobMetadataUpsertPublic;
}

export interface InfoBlobLimits {
  formats: FormatLimit[];
}

export interface InfoBlobPublic {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  metadata: InfoBlobMetadata;
  group_id?: string | null;
  website_id?: string | null;
  text: string;
}

export interface InfoBlobPublicNoText {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  metadata: InfoBlobMetadata;
  group_id?: string | null;
  website_id?: string | null;
}

export interface InfoBlobUpdatePublic {
  metadata: InfoBlobMetadataUpsertPublic;
}

export interface InfoBlobUpsertRequest {
  info_blobs: InfoBlobAddPublic[];
}

export interface InitiateAuthResponse {
  authorization_url: string;
  state: string;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  integration_type: IntegrationIntegrationTypeEnum;
}

export interface IntegrationList {
  items: Integration[];
  count: number;
}

export interface IntegrationPreviewData {
  key: string;
  type: string;
  name: string;
  url: string;
  category?: string | null;
}

export interface IntegrationPreviewDataList {
  items: IntegrationPreviewData[];
  count: number;
}

export interface PaginatedPermissionsCollectionPublic {
  permissions?: PaginatedPermissionsCollectionPublicPermissionsEnum[];
  items: CollectionPublic[];
  count: number;
}

export interface PaginatedPermissionsIntegrationKnowledgePublic {
  permissions?: PaginatedPermissionsIntegrationKnowledgePublicPermissionsEnum[];
  items: IntegrationKnowledgePublic[];
  count: number;
}

export interface PaginatedPermissionsWebsitePublic {
  permissions?: PaginatedPermissionsWebsitePublicPermissionsEnum[];
  items: WebsitePublic[];
  count: number;
}

export interface Knowledge {
  groups: PaginatedPermissionsCollectionPublic;
  websites: PaginatedPermissionsWebsitePublic;
  integration_knowledge_list: PaginatedPermissionsIntegrationKnowledgePublic;
}

export interface Limits {
  info_blobs: InfoBlobLimits;
  attachments: AttachmentLimits;
}

export interface LoggingDetailsPublic {
  context?: string | null;
  model_kwargs: any;
  json_body: any;
}

export interface MCPConnectionStatus {
  success: boolean;
  tools_discovered?: number;
  error_message?: string | null;
}

export interface MCPServerCreate {
  name: string;
  http_url: string;
  http_auth_type?: McpServerCreateHttpAuthTypeEnum;
  description?: string | null;
  http_auth_config_schema?: any | null;
  tags?: string[] | null;
  icon_url?: string | null;
  documentation_url?: string | null;
  security_classification?: ModelId | null;
}

export interface MCPServerPublic {
  id: string;
  name: string;
  description?: string | null;
  http_url: string;
  http_auth_type: string;
  has_credentials: boolean;
  credential_preview?: string | null;
  tags?: string[] | null;
  icon_url?: string | null;
  documentation_url?: string | null;
  security_classification?: SecurityClassificationPublic | null;
}

export interface MCPServerCreateResponse {
  server: MCPServerPublic;
  connection: MCPConnectionStatus;
}

export interface MCPServerSettingsCreate {
  env_vars?: any | null;
}

export interface MCPServerToolPublic {
  id: string;
  mcp_server_id: string;
  name: string;
  description?: string | null;
  input_schema?: any | null;
  is_enabled_by_default: boolean;
  pending_description?: string | null;
  pending_input_schema?: any | null;
  requires_approval?: boolean;
  removed_from_remote?: boolean;
}

export interface MCPServerSettingsPublic {
  id: string;
  name: string;
  description?: string | null;
  http_url: string;
  http_auth_type: string;
  has_credentials: boolean;
  credential_preview?: string | null;
  tags?: string[] | null;
  icon_url?: string | null;
  documentation_url?: string | null;
  security_classification?: SecurityClassificationPublic | null;
  mcp_server_id: string;
  is_org_enabled: boolean;
  tools?: MCPServerToolPublic[];
  tools_count: number;
  is_available: boolean;
}

export interface MCPServerSettingsUpdate {
  is_org_enabled?: boolean | null;
  env_vars?: any | null;
}

export interface MCPServerToolList {
  items: MCPServerToolPublic[];
  count: number;
}

export interface ToolChangePublic {
  tool: MCPServerToolPublic;
  change_type: string;
  current_description?: string | null;
  current_input_schema?: any | null;
  pending_description?: string | null;
  pending_input_schema?: any | null;
}

export interface MCPServerToolSyncResponse {
  connection: MCPConnectionStatus;
  new_tools?: ToolChangePublic[];
  changed_tools?: ToolChangePublic[];
  removed_tools?: ToolChangePublic[];
  unchanged_count?: number;
  has_pending_changes: boolean;
}

export interface MCPServerToolUpdate {
  is_enabled: boolean;
}

export interface MCPServerUpdate {
  name?: string | null;
  http_url?: string | null;
  http_auth_type?: McpServerUpdateHttpAuthTypeEnum | null;
  description?: string | null;
  http_auth_config_schema?: any | null;
  tags?: string[] | null;
  icon_url?: string | null;
  documentation_url?: string | null;
  security_classification?: ModelId | null;
}

export interface ToolCallInfo {
  server_name: string;
  tool_name: string;
  arguments?: any | null;
  tool_call_id?: string | null;
  approved?: boolean | null;
  result_status?: string | null;
  result?: string | null;
  mcp_tool_name?: string | null;
}

export interface Message {
  created_at?: string | null;
  updated_at?: string | null;
  id?: string | null;
  question: string;
  answer: string;
  completion_model?: CompletionModel | null;
  references: InfoBlobPublicNoText[];
  files: FilePublic[];
  tools: UseTools;
  generated_files: FilePublic[];
  web_search_references: WebSearchResultPublic[];
  tool_calls?: ToolCallInfo[];
}

export interface MessageLogging {
  created_at?: string | null;
  updated_at?: string | null;
  id?: string | null;
  question: string;
  answer: string;
  completion_model?: CompletionModel | null;
  references: InfoBlobPublicNoText[];
  files: FilePublic[];
  tools: UseTools;
  generated_files: FilePublic[];
  web_search_references: WebSearchResultPublic[];
  tool_calls?: ToolCallInfo[];
  logging_details: LoggingDetailsPublic;
}

export interface MetadataCount {
  created_at: string;
  count: number;
}

export interface QuestionMetadata {
  id: string;
  created_at: string;
  assistant_id?: string | null;
  session_id: string;
}

export interface SessionMetadata {
  id: string;
  created_at: string;
  assistant_id?: string | null;
  group_chat_id?: string | null;
}

export interface MetadataStatistics {
  assistants: AssistantMetadata[];
  sessions: SessionMetadata[];
  questions: QuestionMetadata[];
}

export interface MetadataStatisticsAggregated {
  assistants: MetadataCount[];
  sessions: MetadataCount[];
  questions: MetadataCount[];
}

export interface MigrationResult {
  success: boolean;
  migrated_count: number;
  failed_count: number;
  details: any;
  duration: number;
  migration_id: string;
  warnings?: string[];
  auto_recalculated?: boolean;
  requires_manual_recalculation?: boolean;
}

export interface ModelMigrationHistory {
  id: string;
  from_model_id: string;
  from_model_name: string;
  to_model_id: string;
  to_model_name: string;
  migrated_count: number;
  status: string;
  initiated_by_id: string;
  initiated_by_name: string;
  started_at?: string | null;
  completed_at?: string | null;
  duration?: number | null;
  error_message?: string | null;
}

export interface ModelMigrationRequest {
  to_model_id: string;
  entity_types?: string[] | null;
  confirm_migration?: boolean;
}

export interface ModelProviderCreate {
  name: string;
  provider_type: string;
  credentials: any;
  config?: any;
  is_active?: boolean;
}

export interface ModelProviderPublic {
  id: string;
  tenant_id: string;
  name: string;
  provider_type: string;
  config: any;
  is_active: boolean;
  masked_api_key?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ModelProviderUpdate {
  name?: string | null;
  credentials?: any | null;
  config?: any | null;
  is_active?: boolean | null;
}

export interface ModelUsage {
  model_id: string;
  model_name: string;
  model_nickname: string;
  model_org?: string | null;
  model_provider?: string | null;
  input_token_usage: number;
  output_token_usage: number;
  total_token_usage: number;
  request_count: number;
}

export interface ModelUsageDetail {
  entity_id: string;
  entity_name: string;
  entity_type: string;
  space_id?: string | null;
  space_name?: string | null;
  owner_id?: string | null;
  owner_name?: string | null;
  created_at: string;
  last_used?: string | null;
  usage_count?: number | null;
}

export interface ModelUsageStatistics {
  model_id: string;
  total_usage: number;
  assistants_count: number;
  apps_count: number;
  services_count: number;
  questions_count: number;
  assistant_templates_count: number;
  app_templates_count: number;
  spaces_count: number;
  last_updated: string;
}

export interface ModelUsageSummary {
  model_id: string;
  model_name: string;
  model_nickname: string;
  is_enabled: boolean;
  total_usage: number;
  last_updated: string;
}

export interface TranscriptionModelSecurityStatus {
  id: string;
  name: string;
  nickname: string;
  family?: string | null;
  is_deprecated: boolean;
  stability?: string | null;
  hosting?: string | null;
  open_source?: boolean | null;
  description?: string | null;
  hf_link?: string | null;
  org?: string | null;
  can_access?: boolean;
  is_locked?: boolean;
  lock_reason?: string | null;
  is_org_enabled?: boolean;
  is_org_default?: boolean;
  credential_provider?: string | null;
  security_classification?: SecurityClassificationPublic | null;
  tenant_id?: string | null;
  provider_id?: string | null;
  provider_name?: string | null;
  provider_type?: string | null;
  meets_security_classification?: boolean | null;
}

export interface ModelsPresentation {
  completion_models: CompletionModelSecurityStatus[];
  embedding_models: EmbeddingModelSecurityStatus[];
  transcription_models: TranscriptionModelSecurityStatus[];
}

export interface ModuleBase {
  name: string;
}

export interface ModuleInDB {
  name: string;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface OIDCDebugToggleRequest {
  enabled: boolean;
  duration_minutes?: number | null;
  reason?: string | null;
}

export interface OIDCDebugToggleResponse {
  enabled: boolean;
  enabled_at?: string | null;
  enabled_by?: string | null;
  expires_at?: string | null;
  reason?: string | null;
  backend: string;
}

export interface OpenIdConnectLogin {
  code: string;
  code_verifier: string;
  redirect_uri: string;
  client_id: string;
  grant_type?: string;
  scope?: string;
  nonce?: string | null;
}

export interface SpaceGroupMember {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  role: SpaceGroupMemberRoleEnum;
  user_count?: number;
}

export interface PaginatedPermissionsSpaceGroupMember {
  permissions?: PaginatedPermissionsSpaceGroupMemberPermissionsEnum[];
  items: SpaceGroupMember[];
  count: number;
}

export interface SpaceMember {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  email: string;
  username?: string | null;
  role: SpaceMemberRoleEnum;
}

export interface PaginatedPermissionsSpaceMember {
  permissions?: PaginatedPermissionsSpaceMemberPermissionsEnum[];
  items: SpaceMember[];
  count: number;
}

export interface PaginatedResponse {
  items: ModelUsageDetail[];
  total: number;
  has_more: boolean;
  next_cursor?: string | null;
  prev_cursor?: string | null;
}

export interface PaginatedResponseAllowedOriginInDB {
  items: AllowedOriginInDB[];
  count: number;
}

export interface PaginatedResponseAllowedOriginPublic {
  items: AllowedOriginPublic[];
  count: number;
}

export interface PaginatedResponseAppRunSparse {
  items: AppRunSparse[];
  count: number;
}

export interface PaginatedResponseAssistantPublic {
  items: AssistantPublic[];
  count: number;
}

export interface PaginatedResponseCompletionModelPublic {
  items: CompletionModelPublic[];
  count: number;
}

export interface PaginatedResponseCrawlRunPublic {
  items: IntricWebsitesPresentationWebsiteModelsCrawlRunPublic[];
  count: number;
}

export interface PaginatedResponseEmbeddingModelLegacy {
  items: EmbeddingModelLegacy[];
  count: number;
}

export interface PaginatedResponseEmbeddingModelPublic {
  items: EmbeddingModelPublic[];
  count: number;
}

export interface PaginatedResponseFilePublic {
  items: FilePublic[];
  count: number;
}

export interface PaginatedResponseGroupPublicWithMetadata {
  items: GroupPublicWithMetadata[];
  count: number;
}

export interface PaginatedResponseInfoBlobPublicNoText {
  items: InfoBlobPublicNoText[];
  count: number;
}

export interface PaginatedResponseInfoBlobPublic {
  items: InfoBlobPublic[];
  count: number;
}

export interface PaginatedResponseJobPublic {
  items: JobPublic[];
  count: number;
}

export interface PaginatedResponseMCPServerPublic {
  items: MCPServerPublic[];
  count: number;
}

export interface PaginatedResponseMCPServerSettingsPublic {
  items: MCPServerSettingsPublic[];
  count: number;
}

export interface PaginatedResponseMessage {
  items: Message[];
  count: number;
}

export interface PaginatedResponseModuleInDB {
  items: ModuleInDB[];
  count: number;
}

export interface PromptSparse {
  permissions?: PromptSparsePermissionsEnum[];
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  description?: string | null;
  is_selected: boolean;
  user: UserSparse;
}

export interface PaginatedResponsePromptSparse {
  items: PromptSparse[];
  count: number;
}

export interface RolePublic {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  permissions: RolePublicPermissionsEnum[];
  predefined_source?: string | null;
}

export interface PaginatedResponseRolePublic {
  items: RolePublic[];
  count: number;
}

export interface SemanticSearchResponse {
  id: string;
  info_blob_id: string;
  text: string;
  score: number;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponseSemanticSearchResponse {
  items: SemanticSearchResponse[];
  count: number;
}

export interface UserPublicBase {
  email: string;
  username?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  quota_used?: number;
}

export interface ServicePublicWithUser {
  permissions?: ServicePublicWithUserPermissionsEnum[];
  output_format?: ServicePublicWithUserOutputFormatEnum | null;
  json_schema?: any | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  prompt: string;
  completion_model_kwargs?: ModelKwargs | null;
  space_id?: string | null;
  groups: GroupPublicBase[];
  completion_model: CompletionModelPublic;
  user: UserPublicBase;
}

export interface PaginatedResponseServicePublicWithUser {
  items: ServicePublicWithUser[];
  count: number;
}

export interface ServiceRun {
  id: string;
  input: string;
  output: any;
  completion_model: CompletionModelPublic;
  references: InfoBlobPublic[];
}

export interface PaginatedResponseServiceRun {
  items: ServiceRun[];
  count: number;
}

export interface PaginatedResponseSpaceGroupMember {
  items: SpaceGroupMember[];
  count: number;
}

export interface SpaceSparse {
  permissions?: SpaceSparsePermissionsEnum[];
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  description?: string | null;
  personal: boolean;
  organization: boolean;
  icon_id?: string | null;
  applications?: Applications | null;
  default_assistant?: DefaultAssistant | null;
  data_retention_days?: number | null;
}

export interface PaginatedResponseSpaceSparse {
  items: SpaceSparse[];
  count: number;
}

export interface TenantWithMaskedCredentials {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  privacy_policy?: string | null;
  name: string;
  display_name?: string | null;
  slug?: string | null;
  quota_limit: number;
  domain?: string | null;
  zitadel_org_id?: string | null;
  provisioning?: boolean;
  state?: TenantWithMaskedCredentialsStateEnum;
  security_enabled?: boolean;
  default_role_id?: string | null;
  modules?: ModuleInDB[];
  api_credentials?: any;
  federation_config?: any;
  crawler_settings?: any;
  api_key_policy?: any;
  favorite_providers?: string[];
}

export interface PaginatedResponseTenantWithMaskedCredentials {
  items: TenantWithMaskedCredentials[];
  count: number;
}

export interface PaginatedResponseTranscriptionModelPublic {
  items: TranscriptionModelPublic[];
  count: number;
}

export interface UserGroupPublic {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  users?: UserSparse[];
}

export interface PaginatedResponseUserGroupPublic {
  items: UserGroupPublic[];
  count: number;
}

export interface RoleInDB {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  permissions: RoleInDbPermissionsEnum[];
  tenant_id: string;
  predefined_source?: string | null;
}

export interface TenantInDB {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  privacy_policy?: string | null;
  name: string;
  display_name?: string | null;
  slug?: string | null;
  quota_limit: number;
  domain?: string | null;
  zitadel_org_id?: string | null;
  provisioning?: boolean;
  state?: TenantInDbStateEnum;
  security_enabled?: boolean;
  default_role_id?: string | null;
  modules?: ModuleInDB[];
  api_credentials?: any;
  federation_config?: any;
  crawler_settings?: any;
  api_key_policy?: any;
  favorite_providers?: string[];
}

export interface UserGroupInDBRead {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
}

export interface UserInDB {
  email: string;
  username?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  tenant_id: string;
  password?: string | null;
  salt?: string | null;
  used_tokens?: number;
  email_verified?: boolean;
  is_active?: boolean;
  state: UserInDbStateEnum;
  quota_limit?: number | null;
  user_groups?: UserGroupInDBRead[];
  tenant: TenantInDB;
  api_key?: ApiKey | null;
  active_api_key?: ApiKeyV2InDB | null;
  roles?: RoleInDB[];
  quota_used?: number;
  deleted_at?: string | null;
  modules: string[];
  user_groups_ids: string[];
  permissions: UserInDbPermissionsEnum[];
}

export interface PaginatedResponseUserInDB {
  items: UserInDB[];
  count: number;
}

export interface PaginatedResponseWebsitePublic {
  items: WebsitePublic[];
  count: number;
}

export interface PaginatedResponseStr {
  items: string[];
  count: number;
}

export interface SkippedDetail {
  file: string;
  reason: string;
}

export interface SyncMetadata {
  files_processed?: number;
  files_deleted?: number;
  pages_processed?: number;
  folders_processed?: number;
  skipped_items?: number;
  skipped_details?: SkippedDetail[];
}

export interface SyncLog {
  id: string;
  integration_knowledge_id: string;
  sync_type: string;
  status: string;
  metadata?: SyncMetadata | null;
  error_message?: string | null;
  started_at: string;
  completed_at?: string | null;
  created_at: string;
  files_processed: number;
  files_deleted: number;
  pages_processed: number;
  folders_processed: number;
  skipped_items: number;
  skipped_details: SkippedDetail[];
  duration_seconds?: number | null;
  total_items_processed: number;
}

export interface PaginatedSyncLogList {
  items: SyncLog[];
  total_count: number;
  page_size: number;
  offset: number;
  count: number;
  current_page: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface PaginationMetadata {
  page: number;
  page_size: number;
  total_count: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
  counts?: any | null;
}

export interface UserGroupRead {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
}

export interface UserAdminView {
  email: string;
  username?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  quota_used?: number;
  used_tokens: number;
  email_verified: boolean;
  quota_limit?: number | null;
  is_active: boolean;
  state: UserAdminViewStateEnum;
  roles: RolePublic[];
  user_groups: UserGroupRead[];
}

export interface PaginatedUsersResponseUserAdminView {
  items: UserAdminView[];
  metadata: PaginationMetadata;
}

export interface PartialAssistantUpdatePublic {
  name?: string | null;
  completion_model_kwargs?: ModelKwargs | null;
  logging_enabled?: boolean | null;
  space_id?: string | null;
  prompt?: PromptCreate | null;
  groups?: ModelId[] | null;
  websites?: ModelId[] | null;
  integration_knowledge_list?: ModelId[] | null;
  mcp_servers?: ModelId[] | null;
  guardrail?: AssistantGuard | null;
  completion_model?: ModelId | null;
  attachments?: ModelId[] | null;
  mcp_tools?: MCPToolSetting[] | null;
  description?: string | null;
  insight_enabled?: boolean | null;
  data_retention_days?: number | null;
  metadata_json?: any | null;
  icon_id?: string | null;
}

export interface PartialCompletionModelUpdate {
  name?: string | null;
  nickname?: string | null;
  family?: string | null;
  max_input_tokens?: number | null;
  max_output_tokens?: number | null;
  is_deprecated?: boolean | null;
  nr_billion_parameters?: number | null;
  hf_link?: string | null;
  stability?: string | null;
  hosting?: string | null;
  open_source?: boolean | null;
  description?: string | null;
  deployment_name?: string | null;
  org?: string | null;
  vision?: boolean | null;
  reasoning?: boolean | null;
  supports_tool_calling?: boolean | null;
  base_url?: string | null;
  litellm_model_name?: string | null;
  model_kwargs_capabilities?: SupportedModelKwargs | null;
  id?: string | null;
}

export interface PartialEmbeddingModelUpdate {
  name?: string | null;
  family?: string | null;
  is_deprecated?: boolean | null;
  open_source?: boolean | null;
  dimensions?: number | null;
  max_input?: number | null;
  max_batch_size?: number | null;
  hf_link?: string | null;
  stability?: string | null;
  hosting?: string | null;
  description?: string | null;
  org?: string | null;
  litellm_model_name?: string | null;
  id?: string | null;
}

export interface PartialPropUserUpdate {
  role?: ModelId | null;
  state?: PartialPropUserUpdateStateEnum | null;
}

export interface PartialServiceUpdatePublic {
  output_format?: PartialServiceUpdatePublicOutputFormatEnum | null;
  json_schema?: any | null;
  name?: string | null;
  prompt?: string | null;
  completion_model_kwargs?: ModelKwargs | null;
  groups?: ModelId[] | null;
  completion_model?: ModelId | null;
}

export interface PartialUpdateSpaceRequest {
  name?: string | null;
  description?: string | null;
  embedding_models?: ModelId[] | null;
  completion_models?: ModelId[] | null;
  transcription_models?: ModelId[] | null;
  mcp_servers?: ModelId[] | null;
  mcp_tools?: MCPToolSetting[] | null;
  security_classification?: ModelId | null;
  icon_id?: string | null;
  data_retention_days?: number | null;
}

export interface PatchFederationRequest {
  provider?: string | null;
  discovery_endpoint?: string | null;
  client_id?: string | null;
  client_secret?: string | null;
  allowed_domains?: string[] | null;
  canonical_public_origin?: string | null;
  redirect_path?: string | null;
  additional_redirect_uris?: string[] | null;
}

export interface PermissionPublic {
  name: PermissionPublicNameEnum;
  description: string;
}

export interface PrivacyPolicy {
  url?: string | null;
}

export interface PromptUpdateRequest {
  description?: string | null;
}

export interface PropUserInvite {
  role?: ModelId | null;
  state?: PropUserInviteStateEnum | null;
  email: string;
}

export interface RetentionPolicyResponse {
  tenant_id: string;
  retention_days: number;
  last_purge_at?: string | null;
  purge_count: number;
  created_at: string;
  updated_at: string;
}

export interface RetentionPolicyUpdateRequest {
  retention_days: number;
}

export interface RoleCreateRequest {
  name: string;
  permissions: RoleCreateRequestPermissionsEnum[];
}

export interface RoleUpdateRequest {
  name?: string | null;
  permissions?: RoleUpdateRequestPermissionsEnum[] | null;
}

export interface RolesPaginatedResponse {
  roles: PaginatedResponseRolePublic;
  predefined_roles: PaginatedResponseRolePublic;
}

export interface RunAppRequest {
  files?: ModelId[];
  text?: string | null;
}

export interface RunService {
  input: string;
  files?: ModelId[];
}

export interface SecurityClassificationCreatePublic {
  name: string;
  description?: string | null;
  set_lowest_security?: boolean;
}

export interface SecurityClassificationLevelsUpdateRequest {
  security_classifications: ModelId[];
}

export interface SecurityClassificationResponse {
  security_enabled: boolean;
  security_classifications: SecurityClassificationPublic[];
}

export interface SecurityClassificationSingleUpdate {
  name?: string;
  description?: string | null;
}

export interface SecurityClassificationsListPublic {
  security_classifications: SecurityClassificationPublic[];
}

export interface SecurityEnableRequest {
  enabled: boolean;
}

export interface SecurityEnableResponse {
  security_enabled: boolean;
}

export interface SemanticSearchRequest {
  search_string: string;
  num_chunks?: number;
  autocut_cutoff?: number | null;
}

export interface ServiceAccountAuthCallback {
  auth_code: string;
  state: string;
}

export interface ServiceAccountAuthStart {
  client_id: string;
  client_secret: string;
  tenant_domain: string;
}

export interface ServiceAccountAuthStartResponse {
  auth_url: string;
  state: string;
}

export interface ServiceCreatePublic {
  output_format?: ServiceCreatePublicOutputFormatEnum | null;
  json_schema?: any | null;
  name: string;
  prompt: string;
  completion_model_kwargs?: ModelKwargs;
  groups?: ModelId[];
  completion_model: ModelId;
}

export interface ServiceOutput {
  output: any;
  files?: FilePublic[];
}

export interface SessionFeedback {
  value: SessionFeedbackValueEnum;
  text?: string | null;
}

export interface SessionPublic {
  created_at?: string | null;
  updated_at?: string | null;
  name: string;
  id: string;
  messages: Message[];
  feedback?: SessionFeedback | null;
}

export interface SetFederationRequest {
  provider: string;
  discovery_endpoint: string;
  client_id: string;
  client_secret: string;
  allowed_domains?: string[];
  canonical_public_origin?: string | null;
  redirect_path?: string | null;
  additional_redirect_uris?: string[] | null;
}

export interface SetFederationResponse {
  tenant_id: string;
  provider: string;
  masked_secret: string;
  message: string;
}

export interface SettingsPublic {
  chatbot_widget?: any;
  using_templates?: boolean;
  tenant_credentials_enabled?: boolean;
  audit_logging_enabled?: boolean;
  provisioning?: boolean;
  api_key_expiry_notifications?: boolean;
}

export interface SharePointSubscriptionPublic {
  id: string;
  user_integration_id: string;
  site_id: string;
  subscription_id: string;
  drive_id: string;
  expires_at: string;
  created_at: string;
  is_expired: boolean;
  expires_in_hours: number;
  owner_email?: string | null;
  owner_type: string;
}

export interface SharePointTreeItem {
  id: string;
  name: string;
  type: string;
  path: string;
  has_children: boolean;
  size?: number | null;
  modified?: string | null;
  web_url?: string | null;
}

export interface SharePointTreeResponse {
  items: SharePointTreeItem[];
  current_path: string;
  parent_id?: string | null;
  drive_id: string;
  site_id?: string | null;
}

export interface SignedURLRequest {
  expires_in?: number;
  content_disposition?: SignedUrlRequestContentDispositionEnum;
}

export interface SignedURLResponse {
  url: string;
  expires_at: number;
}

export interface SpaceRole {
  value: SpaceRoleValueEnum;
  label: string;
}

export interface SpacePublic {
  permissions?: SpacePublicPermissionsEnum[];
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  description?: string | null;
  personal: boolean;
  organization: boolean;
  icon_id?: string | null;
  applications?: Applications | null;
  default_assistant?: DefaultAssistant | null;
  data_retention_days?: number | null;
  embedding_models: EmbeddingModelPublic[];
  completion_models: CompletionModelPublic[];
  transcription_models: TranscriptionModelPublic[];
  mcp_servers?: MCPServerPublicDict[];
  knowledge: Knowledge;
  members: PaginatedPermissionsSpaceMember;
  group_members: PaginatedPermissionsSpaceGroupMember;
  available_roles: SpaceRole[];
  security_classification?: SecurityClassificationPublic | null;
}

export interface StorageSpaceMemberModel {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  email: string;
  role: string;
}

export interface StorageSpaceInfoModel {
  created_at: string;
  update_at: string;
  id: string;
  name: string;
  size: number;
  members: StorageSpaceMemberModel[];
}

export interface StorageInfoModel {
  count: number;
  items: StorageSpaceInfoModel[];
}

export interface StorageModel {
  total_used: number;
  personal_used: number;
  shared_used: number;
  limit: number;
}

export interface SubscriptionRenewalResult {
  total_subscriptions: number;
  expired_count: number;
  recreated?: number;
  failed?: number;
  errors?: string[];
}

export interface SuperApiKeyStatus {
  super_api_key_configured: boolean;
  super_duper_api_key_configured: boolean;
  super_api_key_using_legacy?: boolean;
  super_duper_api_key_using_legacy?: boolean;
}

export interface TemplateListPublic {
  items: any;
  count: number;
}

export interface TenantAppTestResult {
  success: boolean;
  error_message?: string | null;
  details?: string | null;
}

export interface TenantBase {
  name: string;
  display_name?: string | null;
  quota_limit?: number;
  domain?: string | null;
  zitadel_org_id?: string | null;
  provisioning?: boolean;
  state?: TenantBaseStateEnum;
  security_enabled?: boolean;
}

export interface TenantCompletionModelCreate {
  provider_id: string;
  name: string;
  display_name: string;
  max_input_tokens: number;
  max_output_tokens: number;
  vision?: boolean;
  reasoning?: boolean;
  supports_tool_calling?: boolean;
  hosting?: string;
  family?: string;
  is_active?: boolean;
  is_default?: boolean;
}

export interface TenantCompletionModelUpdate {
  name?: string | null;
  display_name?: string | null;
  description?: string | null;
  max_input_tokens?: number | null;
  max_output_tokens?: number | null;
  vision?: boolean | null;
  reasoning?: boolean | null;
  supports_tool_calling?: boolean | null;
  hosting?: string | null;
  open_source?: boolean | null;
  stability?: string | null;
}

export interface TenantEmbeddingModelCreate {
  provider_id: string;
  name: string;
  display_name: string;
  family?: string;
  dimensions?: number | null;
  max_input?: number | null;
  hosting?: string;
  is_active?: boolean;
  is_default?: boolean;
}

export interface TenantEmbeddingModelUpdate {
  display_name?: string | null;
  description?: string | null;
  family?: string | null;
  dimensions?: number | null;
  max_input?: number | null;
  hosting?: string | null;
  open_source?: boolean | null;
  stability?: string | null;
}

export interface TenantInfo {
  slug: string;
  name: string;
  display_name: string;
}

export interface TenantIntegration {
  id?: string;
  name: string;
  description: string;
  integration_type: TenantIntegrationIntegrationTypeEnum;
  integration_id: string;
  is_linked_to_tenant: boolean;
}

export interface TenantIntegrationList {
  items: TenantIntegration[];
  count: number;
}

export interface TenantListResponse {
  tenants: TenantInfo[];
}

export interface TenantPublic {
  name: string;
  display_name?: string | null;
  quota_limit?: number;
  domain?: string | null;
  zitadel_org_id?: string | null;
  provisioning?: boolean;
  state?: TenantPublicStateEnum;
  security_enabled?: boolean;
  privacy_policy?: string | null;
  default_role_id?: string | null;
}

export interface TenantSharePointAppCreate {
  client_id: string;
  client_secret: string;
  tenant_domain: string;
  certificate_path?: string | null;
}

export interface TenantSharePointAppPublic {
  id: string;
  tenant_id: string;
  client_id: string;
  client_secret_masked: string;
  tenant_domain: string;
  is_active: boolean;
  auth_method: string;
  service_account_email?: string | null;
  certificate_path?: string | null;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
}

export interface TenantTranscriptionModelCreate {
  provider_id: string;
  name: string;
  display_name: string;
  hosting?: string;
  family?: string;
  is_active?: boolean;
  is_default?: boolean;
}

export interface TenantTranscriptionModelUpdate {
  display_name?: string | null;
  description?: string | null;
  hosting?: string | null;
  open_source?: boolean | null;
  stability?: string | null;
}

export interface TenantUpdatePublic {
  display_name?: string | null;
  quota_limit?: number | null;
  domain?: string | null;
  zitadel_org_id?: string | null;
  provisioning?: boolean | null;
  state?: TenantUpdatePublicStateEnum | null;
  security_enabled?: boolean | null;
  default_role_id?: string | null;
}

export interface ToggleSettingUpdate {
  enabled: boolean;
}

export interface TokenUsageSummary {
  start_date: string;
  end_date: string;
  models: ModelUsage[];
  total_input_token_usage: number;
  total_output_token_usage: number;
  total_token_usage: number;
}

export interface ToolApprovalDecision {
  tool_call_id: string;
  approved: boolean;
  reason?: string | null;
}

export interface ToolApprovalResponse {
  status: string;
  approval_id: string;
  decisions_received: number;
  decisions_remaining: number;
  unrecognized_tool_call_ids?: string[];
}

export interface ToolReviewRequest {
  tool_ids: string[];
}

export interface ToolReviewResponse {
  approved_tools?: MCPServerToolPublic[];
  rejected_tools?: MCPServerToolPublic[];
  deleted_count?: number;
}

export interface TranscriptionModelUpdate {
  is_org_enabled?: boolean | null;
  is_org_default?: boolean | null;
  security_classification?: ModelId | null;
}

export interface TransferApplicationRequest {
  target_space_id: string;
  move_resources?: boolean;
}

export interface TransferRequest {
  target_space_id: string;
}

export interface UpdateIntegrationKnowledgeRequest {
  name: string;
}

export interface UpdateIntegrationKnowledgeWrapperRequest {
  name: string;
}

export interface UpdateSpaceDryRunResponse {
  assistants: AssistantSparse[];
  group_chats: GroupChatSparse[];
  services: ServiceSparse[];
  apps: AppSparse[];
  completion_models: CompletionModelPublic[];
  embedding_models: EmbeddingModelPublic[];
  transcription_models: TranscriptionModelPublic[];
  mcp_servers?: MCPServerPublicDict[];
}

export interface UpdateSpaceGroupMemberRequest {
  role: UpdateSpaceGroupMemberRequestRoleEnum;
}

export interface UpdateSpaceMemberRequest {
  role: UpdateSpaceMemberRequestRoleEnum;
}

export interface UserAddAdmin {
  email: string;
  username?: string | null;
  password?: string | null;
  quota_limit?: number | null;
  roles?: ModelId[];
}

export interface UserAddSuperAdmin {
  email: string;
  username?: string | null;
  password?: string | null;
  quota_limit?: number | null;
  roles?: ModelId[];
  tenant_id: string;
}

export interface UserCreated {
  email: string;
  username?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  tenant_id: string;
  password?: string | null;
  salt?: string | null;
  used_tokens?: number;
  email_verified?: boolean;
  is_active?: boolean;
  state: UserCreatedStateEnum;
  quota_limit?: number | null;
  user_groups?: UserGroupInDBRead[];
  tenant: TenantInDB;
  api_key?: ApiKey | null;
  active_api_key?: ApiKeyV2InDB | null;
  roles?: RoleInDB[];
  quota_used?: number;
  deleted_at?: string | null;
  access_token?: AccessToken | null;
  modules: string[];
  user_groups_ids: string[];
  permissions: UserCreatedPermissionsEnum[];
}

export interface UserCreatedAdminView {
  email: string;
  username?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  quota_used?: number;
  used_tokens: number;
  email_verified: boolean;
  quota_limit?: number | null;
  is_active: boolean;
  state: UserCreatedAdminViewStateEnum;
  roles: RolePublic[];
  user_groups: UserGroupRead[];
  api_key: ApiKey;
}

export interface UserDeletedListItem {
  username: string;
  email: string;
  state: string;
  deleted_at?: string | null;
}

export interface UserGroupCreateRequest {
  name: string;
}

export interface UserGroupUpdateRequest {
  name?: string | null;
  users?: ModelId[];
}

export interface UserIntegration {
  id?: string;
  name: string;
  description: string;
  integration_type: UserIntegrationIntegrationTypeEnum;
  tenant_integration_id: string;
  connected: boolean;
  auth_type?: string;
  tenant_app_id?: string | null;
  tenant_app_configured?: boolean;
}

export interface UserIntegrationList {
  items: UserIntegration[];
  count: number;
}

export interface UserProvision {
  zitadel_token: string;
}

export interface UserPublic {
  email: string;
  username?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  quota_used?: number;
  truncated_api_key?: string | null;
  legacy_api_key_suffix?: string | null;
  quota_limit?: number | null;
  roles: RolePublic[];
  user_groups: UserGroupRead[];
}

export interface UserStateListItem {
  username: string;
  email: string;
  state: string;
  state_changed_at?: string | null;
}

export interface UserTokenUsage {
  user_id: string;
  username: string;
  email: string;
  total_input_tokens: number;
  total_output_tokens: number;
  total_tokens: number;
  total_requests: number;
  models_used: ModelUsage[];
}

export interface UserTokenUsageSummary {
  users: UserTokenUsage[];
  start_date: string;
  end_date: string;
  total_users: number;
  total_input_tokens: number;
  total_output_tokens: number;
  total_tokens: number;
  total_requests: number;
}

export interface UserTokenUsageSummaryDetail {
  user: UserTokenUsage;
}

export interface UserUpdatePublic {
  email?: string | null;
  username?: string | null;
  password?: string | null;
  quota_limit?: number | null;
  roles?: ModelId[] | null;
  state?: UserUpdatePublicStateEnum | null;
}

export interface ValidateModelRequest {
  model_name: string;
  model_type?: string;
}

export interface WebsiteCreate {
  name?: string | null;
  url: string;
  download_files?: boolean;
  crawl_type?: WebsiteCreateCrawlTypeEnum;
  update_interval?: WebsiteCreateUpdateIntervalEnum;
  embedding_model?: ModelId | null;
  http_auth_username?: string | null;
  http_auth_password?: string | null;
}

export interface WebsiteCreateRequestDeprecated {
  name?: string | null;
  url: string;
  space_id?: string | null;
  download_files?: boolean;
  crawl_type?: WebsiteCreateRequestDeprecatedCrawlTypeEnum;
  update_interval?: WebsiteCreateRequestDeprecatedUpdateIntervalEnum;
  embedding_model: ModelId;
}

export interface WebsiteExistsResponse {
  website_id: string;
  space_id: string;
  space_name: string;
  url: string;
  name?: string | null;
  update_interval: WebsiteExistsResponseUpdateIntervalEnum;
  last_crawled_at?: string | null;
  pages_crawled?: number | null;
  pages_failed?: number | null;
  files_downloaded?: number | null;
  files_failed?: number | null;
  crawl_status?: string | null;
}

export interface WebsiteUpdate {
  url?: string;
  name?: string | null;
  download_files?: boolean;
  crawl_type?: WebsiteUpdateCrawlTypeEnum;
  update_interval?: WebsiteUpdateUpdateIntervalEnum;
  http_auth_username?: string | null;
  http_auth_password?: string | null;
}

export interface IntricTenantsPresentationTenantCredentialsRouterCredentialInfo {
  provider: string;
  masked_key: string;
  configured_at?: string | null;
  encryption_status: IntricTenantsPresentationTenantCredentialsRouterCredentialInfoEncryptionStatusEnum;
  config?: any;
}

export interface IntricTenantsPresentationTenantCredentialsRouterListCredentialsResponse {
  credentials: IntricTenantsPresentationTenantCredentialsRouterCredentialInfo[];
}

export interface IntricTenantsPresentationTenantCredentialsRouterSetCredentialRequest {
  api_key: string;
  endpoint?: string | null;
  api_version?: string | null;
  deployment_name?: string | null;
}

export interface IntricTenantsPresentationTenantCredentialsRouterSetCredentialResponse {
  tenant_id: string;
  provider: string;
  masked_key: string;
  message: string;
  set_at: string;
}

export interface IntricTenantsPresentationTenantSelfCredentialsRouterCredentialInfo {
  provider: string;
  masked_key: string;
  configured_at?: string | null;
  encryption_status: IntricTenantsPresentationTenantSelfCredentialsRouterCredentialInfoEncryptionStatusEnum;
  config?: any;
}

export interface IntricTenantsPresentationTenantSelfCredentialsRouterListCredentialsResponse {
  credentials: IntricTenantsPresentationTenantSelfCredentialsRouterCredentialInfo[];
}

export interface IntricTenantsPresentationTenantSelfCredentialsRouterSetCredentialRequest {
  api_key: string;
  endpoint?: string | null;
  api_version?: string | null;
  deployment_name?: string | null;
}

export interface IntricTenantsPresentationTenantSelfCredentialsRouterSetCredentialResponse {
  provider: string;
  masked_key: string;
  message: string;
  set_at: string;
}

export interface IntricWebsitesCrawlDependenciesCrawlModelsCrawlRunPublic {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  pages_crawled?: number | null;
  files_downloaded?: number | null;
  pages_failed?: number | null;
  files_failed?: number | null;
  failure_summary?: any | null;
  status?: IntricWebsitesCrawlDependenciesCrawlModelsCrawlRunPublicStatusEnum | null;
  result_location?: string | null;
  finished_at?: string | null;
}

export interface SSEText {
  session_id: string;
  answer: string;
  references: InfoBlobAskAssistantPublic[];
}

export interface SSEIntricEvent {
  session_id: string;
  intric_event_type: SseIntricEventIntricEventTypeEnum;
}

export interface SSEToolCall {
  session_id: string;
  intric_event_type?: SseToolCallIntricEventTypeEnum;
  tools: ToolCallInfo[];
}

export interface SSEToolApprovalRequired {
  session_id: string;
  intric_event_type?: SseToolApprovalRequiredIntricEventTypeEnum;
  approval_id: string;
  tools: ToolCallInfo[];
}

export interface SSEToolApprovalTimeout {
  session_id: string;
  intric_event_type?: SseToolApprovalTimeoutIntricEventTypeEnum;
  approval_id: string;
  tools: ToolCallInfo[];
}

export interface TokenUsageEvent {
  prompt_tokens: number;
  completion_tokens: number;
  turn_tokens: number;
}

export interface SSETokenUsage {
  session_id: string;
  intric_event_type?: SseTokenUsageIntricEventTypeEnum;
  usage: TokenUsageEvent;
}

export interface SSEFiles {
  session_id: string;
  generated_files: FilePublic[];
}

export interface SSEFirstChunk {
  session_id: string;
  question: string;
  answer: string;
  files: FilePublic[];
  generated_files: FilePublic[];
  references: InfoBlobAskAssistantPublic[];
  tools: UseTools;
  web_search_references: WebSearchResultPublic[];
}

export interface SSEError {
  session_id: string;
  error: string;
  error_code?: number | null;
}

export interface PinnedAssistantsDto {
  ids: string[];
}

export interface AzureTokenData {
  token: string;
  region: string;
}

export interface ApiResponseAzureToken {
  data: AzureTokenData;
  message: string;
}

export interface UserSpaceSettingsDto {
  groupSharedAssistantsBySpace: boolean;
  hiddenSpaceIds: string[];
}

export enum AddSpaceGroupMemberRequestRoleEnum {
  Admin = "admin",
  Editor = "editor",
  Viewer = "viewer",
}

export enum AddSpaceMemberRequestRoleEnum {
  Admin = "admin",
  Editor = "editor",
  Viewer = "viewer",
}

export enum AdditionalFieldTypeEnum {
  Attachments = "attachments",
  Groups = "groups",
}

export enum AnalysisJobStatusResponseStatusEnum {
  Queued = "queued",
  Processing = "processing",
  Completed = "completed",
  Failed = "failed",
}

export enum ResourcePermissionsAssistantsEnum {
  None = "none",
  Read = "read",
  Write = "write",
  Admin = "admin",
}

export enum ResourcePermissionsAppsEnum {
  None = "none",
  Read = "read",
  Write = "write",
  Admin = "admin",
}

export enum ResourcePermissionsSpacesEnum {
  None = "none",
  Read = "read",
  Write = "write",
  Admin = "admin",
}

export enum ResourcePermissionsKnowledgeEnum {
  None = "none",
  Read = "read",
  Write = "write",
  Admin = "admin",
}

export enum ResourcePermissionsConversationsEnum {
  None = "none",
  Read = "read",
  Write = "write",
  Admin = "admin",
}

export enum ResourcePermissionsFilesEnum {
  None = "none",
  Read = "read",
  Write = "write",
  Admin = "admin",
}

export enum ResourcePermissionsJobsEnum {
  None = "none",
  Read = "read",
  Write = "write",
  Admin = "admin",
}

export enum ResourcePermissionsPromptsEnum {
  None = "none",
  Read = "read",
  Write = "write",
  Admin = "admin",
}

export enum ApiKeyCreateRequestKeyTypeEnum {
  Pk = "pk_",
  Sk = "sk_",
}

export enum ApiKeyCreateRequestPermissionEnum {
  Read = "read",
  Write = "write",
  Admin = "admin",
}

export enum ApiKeyCreateRequestScopeTypeEnum {
  Tenant = "tenant",
  Space = "space",
  Assistant = "assistant",
  App = "app",
}

export enum ApiKeyCreateRequestOwnershipEnum {
  User = "user",
  Service = "service",
}

export enum ApiKeyV2OwnershipEnum {
  User = "user",
  Service = "service",
}

export enum ApiKeyV2KeyTypeEnum {
  Pk = "pk_",
  Sk = "sk_",
}

export enum ApiKeyV2PermissionEnum {
  Read = "read",
  Write = "write",
  Admin = "admin",
}

export enum ApiKeyV2ScopeTypeEnum {
  Tenant = "tenant",
  Space = "space",
  Assistant = "assistant",
  App = "app",
}

export enum ApiKeyV2StateEnum {
  Active = "active",
  Suspended = "suspended",
  Revoked = "revoked",
  Expired = "expired",
}

export enum ApiKeyV2RevokedReasonCodeEnum {
  SecurityConcern = "security_concern",
  AbuseDetected = "abuse_detected",
  UserRequest = "user_request",
  AdminAction = "admin_action",
  PolicyViolation = "policy_violation",
  KeyCompromised = "key_compromised",
  UserOffboarding = "user_offboarding",
  RotationCompleted = "rotation_completed",
  ScopeRemoved = "scope_removed",
  Other = "other",
}

export enum ApiKeyV2SuspendedReasonCodeEnum {
  SecurityConcern = "security_concern",
  AbuseDetected = "abuse_detected",
  UserRequest = "user_request",
  AdminAction = "admin_action",
  PolicyViolation = "policy_violation",
  KeyCompromised = "key_compromised",
  UserOffboarding = "user_offboarding",
  RotationCompleted = "rotation_completed",
  ScopeRemoved = "scope_removed",
  Other = "other",
}

export enum ApiKeyV2SearchMatchReasonsEnum {
  ExactSecret = "exact_secret",
  KeySuffix = "key_suffix",
  NameOrDescription = "name_or_description",
  Owner = "owner",
  Creator = "creator",
}

export enum ApiKeyExactLookupResponseMatchReasonEnum {
  ExactSecret = "exact_secret",
  KeySuffix = "key_suffix",
  NameOrDescription = "name_or_description",
  Owner = "owner",
  Creator = "creator",
}

export enum ApiKeyNotificationSubscriptionTargetTypeEnum {
  Key = "key",
  Assistant = "assistant",
  App = "app",
  Space = "space",
}

export enum ApiKeyStateChangeRequestReasonCodeEnum {
  SecurityConcern = "security_concern",
  AbuseDetected = "abuse_detected",
  UserRequest = "user_request",
  AdminAction = "admin_action",
  PolicyViolation = "policy_violation",
  KeyCompromised = "key_compromised",
  UserOffboarding = "user_offboarding",
  RotationCompleted = "rotation_completed",
  ScopeRemoved = "scope_removed",
  Other = "other",
}

export enum ApiKeyUpdateRequestPermissionEnum {
  Read = "read",
  Write = "write",
  Admin = "admin",
}

export enum ApiKeyV2InDbOwnershipEnum {
  User = "user",
  Service = "service",
}

export enum ApiKeyV2InDbKeyTypeEnum {
  Pk = "pk_",
  Sk = "sk_",
}

export enum ApiKeyV2InDbPermissionEnum {
  Read = "read",
  Write = "write",
  Admin = "admin",
}

export enum ApiKeyV2InDbScopeTypeEnum {
  Tenant = "tenant",
  Space = "space",
  Assistant = "assistant",
  App = "app",
}

export enum ApiKeyV2InDbStateEnum {
  Active = "active",
  Suspended = "suspended",
  Revoked = "revoked",
  Expired = "expired",
}

export enum ApiKeyV2InDbRevokedReasonCodeEnum {
  SecurityConcern = "security_concern",
  AbuseDetected = "abuse_detected",
  UserRequest = "user_request",
  AdminAction = "admin_action",
  PolicyViolation = "policy_violation",
  KeyCompromised = "key_compromised",
  UserOffboarding = "user_offboarding",
  RotationCompleted = "rotation_completed",
  ScopeRemoved = "scope_removed",
  Other = "other",
}

export enum ApiKeyV2InDbSuspendedReasonCodeEnum {
  SecurityConcern = "security_concern",
  AbuseDetected = "abuse_detected",
  UserRequest = "user_request",
  AdminAction = "admin_action",
  PolicyViolation = "policy_violation",
  KeyCompromised = "key_compromised",
  UserOffboarding = "user_offboarding",
  RotationCompleted = "rotation_completed",
  ScopeRemoved = "scope_removed",
  Other = "other",
}

export enum ApiKeyV2InDbSearchMatchReasonsEnum {
  ExactSecret = "exact_secret",
  KeySuffix = "key_suffix",
  NameOrDescription = "name_or_description",
  Owner = "owner",
  Creator = "creator",
}

export enum ModelKwargCapabilityControlEnum {
  Slider = "slider",
  Select = "select",
}

export enum InputFieldPublicTypeEnum {
  TextField = "text-field",
  TextUpload = "text-upload",
  AudioUpload = "audio-upload",
  AudioRecorder = "audio-recorder",
  ImageUpload = "image-upload",
}

export enum PromptPublicPermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum AppPublicPermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum AppRunPublicStatusEnum {
  InProgress = "in progress",
  Queued = "queued",
  Complete = "complete",
  Failed = "failed",
  NotFound = "not found",
}

export enum AppRunSparseStatusEnum {
  InProgress = "in progress",
  Queued = "queued",
  Complete = "complete",
  Failed = "failed",
  NotFound = "not found",
}

export enum AppSparsePermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum InputFieldTypeEnum {
  TextField = "text-field",
  TextUpload = "text-upload",
  AudioUpload = "audio-upload",
  AudioRecorder = "audio-recorder",
  ImageUpload = "image-upload",
}

export enum PaginatedPermissionsAppSparsePermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum AssistantSparsePermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum AssistantSparseTypeEnum {
  Assistant = "assistant",
  DefaultAssistant = "default-assistant",
}

export enum PaginatedPermissionsAssistantSparsePermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum GroupChatSparsePermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum PaginatedPermissionsGroupChatSparsePermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum ServiceSparseOutputFormatEnum {
  Json = "json",
  List = "list",
  Boolean = "boolean",
}

export enum ServiceSparsePermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum PaginatedPermissionsServiceSparsePermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum CollectionPublicPermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum IntegrationKnowledgePublicPermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum IntegrationKnowledgePublicIntegrationTypeEnum {
  Confluence = "confluence",
  Sharepoint = "sharepoint",
}

export enum IntricWebsitesPresentationWebsiteModelsCrawlRunPublicStatusEnum {
  InProgress = "in progress",
  Queued = "queued",
  Complete = "complete",
  Failed = "failed",
  NotFound = "not found",
}

export enum WebsitePublicPermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum WebsitePublicCrawlTypeEnum {
  Crawl = "crawl",
  Sitemap = "sitemap",
}

export enum WebsitePublicUpdateIntervalEnum {
  Never = "never",
  Daily = "daily",
  EveryOtherDay = "every_other_day",
  Weekly = "weekly",
}

export enum AssistantPublicPermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum AssistantPublicTypeEnum {
  Assistant = "assistant",
  DefaultAssistant = "default-assistant",
}

export enum AuditLogResponseActorTypeEnum {
  User = "user",
  System = "system",
  ApiKey = "api_key",
}

export enum AuditLogResponseActionEnum {
  UserCreated = "user_created",
  UserDeleted = "user_deleted",
  UserUpdated = "user_updated",
  RoleCreated = "role_created",
  RoleModified = "role_modified",
  RoleDeleted = "role_deleted",
  PermissionChanged = "permission_changed",
  TenantSettingsUpdated = "tenant_settings_updated",
  CredentialsUpdated = "credentials_updated",
  FederationUpdated = "federation_updated",
  ApiKeyGenerated = "api_key_generated",
  ApiKeyCreated = "api_key_created",
  ApiKeyUpdated = "api_key_updated",
  ApiKeyRevoked = "api_key_revoked",
  ApiKeySuspended = "api_key_suspended",
  ApiKeyReactivated = "api_key_reactivated",
  ApiKeyRotated = "api_key_rotated",
  ApiKeyExpirationExtended = "api_key_expiration_extended",
  ApiKeyExpired = "api_key_expired",
  ApiKeyPurged = "api_key_purged",
  ApiKeyUsed = "api_key_used",
  ApiKeyAuthFailed = "api_key_auth_failed",
  TenantPolicyUpdated = "tenant_policy_updated",
  ModuleAdded = "module_added",
  ModuleAddedToTenant = "module_added_to_tenant",
  AssistantCreated = "assistant_created",
  AssistantDeleted = "assistant_deleted",
  AssistantUpdated = "assistant_updated",
  AssistantTransferred = "assistant_transferred",
  AssistantPublished = "assistant_published",
  SpaceCreated = "space_created",
  SpaceUpdated = "space_updated",
  SpaceDeleted = "space_deleted",
  SpaceMemberAdded = "space_member_added",
  SpaceMemberRemoved = "space_member_removed",
  AppCreated = "app_created",
  AppDeleted = "app_deleted",
  AppUpdated = "app_updated",
  AppExecuted = "app_executed",
  AppPublished = "app_published",
  AppRunDeleted = "app_run_deleted",
  SessionStarted = "session_started",
  SessionEnded = "session_ended",
  ToolApprovalSubmitted = "tool_approval_submitted",
  FileUploaded = "file_uploaded",
  FileDeleted = "file_deleted",
  WebsiteCreated = "website_created",
  WebsiteUpdated = "website_updated",
  WebsiteDeleted = "website_deleted",
  WebsiteCrawled = "website_crawled",
  WebsiteTransferred = "website_transferred",
  GroupChatCreated = "group_chat_created",
  CollectionCreated = "collection_created",
  CollectionUpdated = "collection_updated",
  CollectionDeleted = "collection_deleted",
  IntegrationAdded = "integration_added",
  IntegrationRemoved = "integration_removed",
  IntegrationConnected = "integration_connected",
  IntegrationDisconnected = "integration_disconnected",
  IntegrationKnowledgeCreated = "integration_knowledge_created",
  IntegrationKnowledgeDeleted = "integration_knowledge_deleted",
  IntegrationKnowledgeSynced = "integration_knowledge_synced",
  CompletionModelUpdated = "completion_model_updated",
  EmbeddingModelUpdated = "embedding_model_updated",
  TranscriptionModelUpdated = "transcription_model_updated",
  TemplateCreated = "template_created",
  TemplateUpdated = "template_updated",
  TemplateDeleted = "template_deleted",
  SecurityClassificationCreated = "security_classification_created",
  SecurityClassificationUpdated = "security_classification_updated",
  SecurityClassificationDeleted = "security_classification_deleted",
  SecurityClassificationLevelsUpdated = "security_classification_levels_updated",
  SecurityClassificationEnabled = "security_classification_enabled",
  SecurityClassificationDisabled = "security_classification_disabled",
  McpServerCreated = "mcp_server_created",
  McpServerUpdated = "mcp_server_updated",
  McpServerDeleted = "mcp_server_deleted",
  McpServerEnabled = "mcp_server_enabled",
  McpServerDisabled = "mcp_server_disabled",
  McpServerToolEnabled = "mcp_server_tool_enabled",
  McpServerToolDisabled = "mcp_server_tool_disabled",
  RetentionPolicyApplied = "retention_policy_applied",
  EncryptionKeyRotated = "encryption_key_rotated",
  SystemMaintenance = "system_maintenance",
  AuditSessionCreated = "audit_session_created",
  AuditLogViewed = "audit_log_viewed",
  AuditLogExported = "audit_log_exported",
}

export enum AuditLogResponseEntityTypeEnum {
  User = "user",
  Assistant = "assistant",
  Space = "space",
  App = "app",
  File = "file",
  Website = "website",
  TenantSettings = "tenant_settings",
  Credential = "credential",
  FederationConfig = "federation_config",
  ApiKey = "api_key",
  Role = "role",
  Module = "module",
  Template = "template",
  GroupChat = "group_chat",
  Collection = "collection",
  AppRun = "app_run",
  SecurityClassification = "security_classification",
  Integration = "integration",
  IntegrationKnowledge = "integration_knowledge",
  CompletionModel = "completion_model",
  EmbeddingModel = "embedding_model",
  TranscriptionModel = "transcription_model",
  AuditLog = "audit_log",
  Session = "session",
  McpServer = "mcp_server",
  McpServerTool = "mcp_server_tool",
}

export enum AuditLogResponseOutcomeEnum {
  Success = "success",
  Failure = "failure",
}

export enum JobPublicStatusEnum {
  InProgress = "in progress",
  Queued = "queued",
  Complete = "complete",
  Failed = "failed",
  NotFound = "not found",
}

export enum JobPublicTaskEnum {
  UploadInfoBlob = "upload_info_blob",
  Transcription = "transcription",
  Crawl = "crawl",
  EmbedGroup = "embed_group",
  CrawlAllWebsites = "crawl_all_websites",
  RunApp = "run_app",
  PullConfluenceContent = "pull_confluence_content",
  PullSharepointContent = "pull_sharepoint_content",
  SyncSharepointDelta = "sync_sharepoint_delta",
  UpdateModelUsageStats = "update_model_usage_stats",
  AnalyzeConversationInsights = "analyze_conversation_insights",
}

export enum CreateSpaceIntegrationKnowledgeBatchResultStatusEnum {
  Created = "created",
  Failed = "failed",
}

export enum GroupPublicWithMetadataPermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum CreateSpaceServiceResponsePermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum CreateSpaceServiceResponseOutputFormatEnum {
  Json = "json",
  List = "list",
  Boolean = "boolean",
}

export enum DefaultAssistantPermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum DefaultAssistantTypeEnum {
  Assistant = "assistant",
  DefaultAssistant = "default-assistant",
}

export enum SpaceDashboardPermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum ExpiringKeySummaryItemScopeTypeEnum {
  Tenant = "tenant",
  Space = "space",
  Assistant = "assistant",
  App = "app",
}

export enum ExpiringKeySummaryItemSeverityEnum {
  Notice = "notice",
  Warning = "warning",
  Urgent = "urgent",
  Expired = "expired",
}

export enum ExportJobRequestActionEnum {
  UserCreated = "user_created",
  UserDeleted = "user_deleted",
  UserUpdated = "user_updated",
  RoleCreated = "role_created",
  RoleModified = "role_modified",
  RoleDeleted = "role_deleted",
  PermissionChanged = "permission_changed",
  TenantSettingsUpdated = "tenant_settings_updated",
  CredentialsUpdated = "credentials_updated",
  FederationUpdated = "federation_updated",
  ApiKeyGenerated = "api_key_generated",
  ApiKeyCreated = "api_key_created",
  ApiKeyUpdated = "api_key_updated",
  ApiKeyRevoked = "api_key_revoked",
  ApiKeySuspended = "api_key_suspended",
  ApiKeyReactivated = "api_key_reactivated",
  ApiKeyRotated = "api_key_rotated",
  ApiKeyExpirationExtended = "api_key_expiration_extended",
  ApiKeyExpired = "api_key_expired",
  ApiKeyPurged = "api_key_purged",
  ApiKeyUsed = "api_key_used",
  ApiKeyAuthFailed = "api_key_auth_failed",
  TenantPolicyUpdated = "tenant_policy_updated",
  ModuleAdded = "module_added",
  ModuleAddedToTenant = "module_added_to_tenant",
  AssistantCreated = "assistant_created",
  AssistantDeleted = "assistant_deleted",
  AssistantUpdated = "assistant_updated",
  AssistantTransferred = "assistant_transferred",
  AssistantPublished = "assistant_published",
  SpaceCreated = "space_created",
  SpaceUpdated = "space_updated",
  SpaceDeleted = "space_deleted",
  SpaceMemberAdded = "space_member_added",
  SpaceMemberRemoved = "space_member_removed",
  AppCreated = "app_created",
  AppDeleted = "app_deleted",
  AppUpdated = "app_updated",
  AppExecuted = "app_executed",
  AppPublished = "app_published",
  AppRunDeleted = "app_run_deleted",
  SessionStarted = "session_started",
  SessionEnded = "session_ended",
  ToolApprovalSubmitted = "tool_approval_submitted",
  FileUploaded = "file_uploaded",
  FileDeleted = "file_deleted",
  WebsiteCreated = "website_created",
  WebsiteUpdated = "website_updated",
  WebsiteDeleted = "website_deleted",
  WebsiteCrawled = "website_crawled",
  WebsiteTransferred = "website_transferred",
  GroupChatCreated = "group_chat_created",
  CollectionCreated = "collection_created",
  CollectionUpdated = "collection_updated",
  CollectionDeleted = "collection_deleted",
  IntegrationAdded = "integration_added",
  IntegrationRemoved = "integration_removed",
  IntegrationConnected = "integration_connected",
  IntegrationDisconnected = "integration_disconnected",
  IntegrationKnowledgeCreated = "integration_knowledge_created",
  IntegrationKnowledgeDeleted = "integration_knowledge_deleted",
  IntegrationKnowledgeSynced = "integration_knowledge_synced",
  CompletionModelUpdated = "completion_model_updated",
  EmbeddingModelUpdated = "embedding_model_updated",
  TranscriptionModelUpdated = "transcription_model_updated",
  TemplateCreated = "template_created",
  TemplateUpdated = "template_updated",
  TemplateDeleted = "template_deleted",
  SecurityClassificationCreated = "security_classification_created",
  SecurityClassificationUpdated = "security_classification_updated",
  SecurityClassificationDeleted = "security_classification_deleted",
  SecurityClassificationLevelsUpdated = "security_classification_levels_updated",
  SecurityClassificationEnabled = "security_classification_enabled",
  SecurityClassificationDisabled = "security_classification_disabled",
  McpServerCreated = "mcp_server_created",
  McpServerUpdated = "mcp_server_updated",
  McpServerDeleted = "mcp_server_deleted",
  McpServerEnabled = "mcp_server_enabled",
  McpServerDisabled = "mcp_server_disabled",
  McpServerToolEnabled = "mcp_server_tool_enabled",
  McpServerToolDisabled = "mcp_server_tool_disabled",
  RetentionPolicyApplied = "retention_policy_applied",
  EncryptionKeyRotated = "encryption_key_rotated",
  SystemMaintenance = "system_maintenance",
  AuditSessionCreated = "audit_session_created",
  AuditLogViewed = "audit_log_viewed",
  AuditLogExported = "audit_log_exported",
}

export enum FederationInfoEncryptionStatusEnum {
  Encrypted = "encrypted",
  Plaintext = "plaintext",
}

export enum GeneralErrorIntricErrorCodeEnum {
  Value9000 = "Value9000",
  Value9001 = "Value9001",
  Value9002 = "Value9002",
  Value9003 = "Value9003",
  Value9004 = "Value9004",
  Value9005 = "Value9005",
  Value9006 = "Value9006",
  Value9007 = "Value9007",
  Value9008 = "Value9008",
  Value9009 = "Value9009",
  Value9010 = "Value9010",
  Value9011 = "Value9011",
  Value9012 = "Value9012",
  Value9013 = "Value9013",
  Value9014 = "Value9014",
  Value9015 = "Value9015",
  Value9016 = "Value9016",
  Value9017 = "Value9017",
  Value9018 = "Value9018",
  Value9019 = "Value9019",
  Value9020 = "Value9020",
  Value9021 = "Value9021",
  Value9022 = "Value9022",
  Value9023 = "Value9023",
  Value9024 = "Value9024",
  Value9025 = "Value9025",
  Value9026 = "Value9026",
  Value9027 = "Value9027",
  Value9028 = "Value9028",
  Value9029 = "Value9029",
  Value9030 = "Value9030",
  Value9031 = "Value9031",
  Value9032 = "Value9032",
  Value9033 = "Value9033",
  Value9034 = "Value9034",
  Value9035 = "Value9035",
  Value9036 = "Value9036",
  Value9037 = "Value9037",
  Value9038 = "Value9038",
  Value90001 = 9000,
  Value90012 = 9001,
  Value90023 = 9002,
  Value90034 = 9003,
  Value90045 = 9004,
  Value90056 = 9005,
  Value90067 = 9006,
  Value90078 = 9007,
  Value90089 = 9008,
  Value900910 = 9009,
  Value901011 = 9010,
  Value901112 = 9011,
  Value901213 = 9012,
  Value901314 = 9013,
  Value901415 = 9014,
  Value901516 = 9015,
  Value901617 = 9016,
  Value901718 = 9017,
  Value901819 = 9018,
  Value901920 = 9019,
  Value902021 = 9020,
  Value902122 = 9021,
  Value902223 = 9022,
  Value902324 = 9023,
  Value902425 = 9024,
  Value902526 = 9025,
  Value902627 = 9026,
  Value902728 = 9027,
  Value902829 = 9028,
  Value902930 = 9029,
  Value903031 = 9030,
  Value903132 = 9031,
  Value903233 = 9032,
  Value903334 = 9033,
  Value903435 = 9034,
  Value903536 = 9035,
  Value903637 = 9036,
  Value903738 = 9037,
  Value903839 = 9038,
}

export enum GroupChatPublicPermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum IntegrationIntegrationTypeEnum {
  Confluence = "confluence",
  Sharepoint = "sharepoint",
}

export enum PaginatedPermissionsCollectionPublicPermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum PaginatedPermissionsIntegrationKnowledgePublicPermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum PaginatedPermissionsWebsitePublicPermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum McpServerCreateHttpAuthTypeEnum {
  None = "none",
  Bearer = "bearer",
}

export enum McpServerUpdateHttpAuthTypeEnum {
  None = "none",
  Bearer = "bearer",
}

export enum SpaceGroupMemberRoleEnum {
  Admin = "admin",
  Editor = "editor",
  Viewer = "viewer",
}

export enum PaginatedPermissionsSpaceGroupMemberPermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum SpaceMemberRoleEnum {
  Admin = "admin",
  Editor = "editor",
  Viewer = "viewer",
}

export enum PaginatedPermissionsSpaceMemberPermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum PromptSparsePermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum RolePublicPermissionsEnum {
  Assistants = "assistants",
  GroupChats = "group_chats",
  Apps = "apps",
  Services = "services",
  Collections = "collections",
  Insights = "insights",
  AI = "AI",
  Editor = "editor",
  Admin = "admin",
  Websites = "websites",
  Integrations = "integrations",
  SharedSpaces = "shared_spaces",
  ApiKeys = "api_keys",
}

export enum ServicePublicWithUserPermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum ServicePublicWithUserOutputFormatEnum {
  Json = "json",
  List = "list",
  Boolean = "boolean",
}

export enum SpaceSparsePermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum TenantWithMaskedCredentialsStateEnum {
  Active = "active",
  Suspended = "suspended",
}

export enum RoleInDbPermissionsEnum {
  Assistants = "assistants",
  GroupChats = "group_chats",
  Apps = "apps",
  Services = "services",
  Collections = "collections",
  Insights = "insights",
  AI = "AI",
  Editor = "editor",
  Admin = "admin",
  Websites = "websites",
  Integrations = "integrations",
  SharedSpaces = "shared_spaces",
  ApiKeys = "api_keys",
}

export enum TenantInDbStateEnum {
  Active = "active",
  Suspended = "suspended",
}

export enum UserInDbStateEnum {
  Invited = "invited",
  Active = "active",
  Inactive = "inactive",
  Deleted = "deleted",
}

export enum UserInDbPermissionsEnum {
  Assistants = "assistants",
  GroupChats = "group_chats",
  Apps = "apps",
  Services = "services",
  Collections = "collections",
  Insights = "insights",
  AI = "AI",
  Editor = "editor",
  Admin = "admin",
  Websites = "websites",
  Integrations = "integrations",
  SharedSpaces = "shared_spaces",
  ApiKeys = "api_keys",
}

export enum UserAdminViewStateEnum {
  Invited = "invited",
  Active = "active",
  Inactive = "inactive",
  Deleted = "deleted",
}

export enum PartialPropUserUpdateStateEnum {
  Invited = "invited",
  Active = "active",
  Inactive = "inactive",
  Deleted = "deleted",
}

export enum PartialServiceUpdatePublicOutputFormatEnum {
  Json = "json",
  List = "list",
  Boolean = "boolean",
}

export enum PermissionPublicNameEnum {
  Assistants = "assistants",
  GroupChats = "group_chats",
  Apps = "apps",
  Services = "services",
  Collections = "collections",
  Insights = "insights",
  AI = "AI",
  Editor = "editor",
  Admin = "admin",
  Websites = "websites",
  Integrations = "integrations",
  SharedSpaces = "shared_spaces",
  ApiKeys = "api_keys",
}

export enum PropUserInviteStateEnum {
  Invited = "invited",
  Active = "active",
  Inactive = "inactive",
  Deleted = "deleted",
}

export enum RoleCreateRequestPermissionsEnum {
  Assistants = "assistants",
  GroupChats = "group_chats",
  Apps = "apps",
  Services = "services",
  Collections = "collections",
  Insights = "insights",
  AI = "AI",
  Editor = "editor",
  Admin = "admin",
  Websites = "websites",
  Integrations = "integrations",
  SharedSpaces = "shared_spaces",
  ApiKeys = "api_keys",
}

export enum RoleUpdateRequestPermissionsEnum {
  Assistants = "assistants",
  GroupChats = "group_chats",
  Apps = "apps",
  Services = "services",
  Collections = "collections",
  Insights = "insights",
  AI = "AI",
  Editor = "editor",
  Admin = "admin",
  Websites = "websites",
  Integrations = "integrations",
  SharedSpaces = "shared_spaces",
  ApiKeys = "api_keys",
}

export enum ServiceCreatePublicOutputFormatEnum {
  Json = "json",
  List = "list",
  Boolean = "boolean",
}

export enum SessionFeedbackValueEnum {
  Value11 = "Value11",
  Value1 = -1,
  Value12 = "Value1",
  Value13 = 1,
}

export enum SignedUrlRequestContentDispositionEnum {
  Attachment = "attachment",
  Inline = "inline",
}

export enum SpaceRoleValueEnum {
  Admin = "admin",
  Editor = "editor",
  Viewer = "viewer",
}

export enum SpacePublicPermissionsEnum {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
  InsightView = "insight_view",
  InsightToggle = "insight_toggle",
}

export enum TenantBaseStateEnum {
  Active = "active",
  Suspended = "suspended",
}

export enum TenantIntegrationIntegrationTypeEnum {
  Confluence = "confluence",
  Sharepoint = "sharepoint",
}

export enum TenantPublicStateEnum {
  Active = "active",
  Suspended = "suspended",
}

export enum TenantUpdatePublicStateEnum {
  Active = "active",
  Suspended = "suspended",
}

export enum UpdateSpaceGroupMemberRequestRoleEnum {
  Admin = "admin",
  Editor = "editor",
  Viewer = "viewer",
}

export enum UpdateSpaceMemberRequestRoleEnum {
  Admin = "admin",
  Editor = "editor",
  Viewer = "viewer",
}

export enum UserCreatedStateEnum {
  Invited = "invited",
  Active = "active",
  Inactive = "inactive",
  Deleted = "deleted",
}

export enum UserCreatedPermissionsEnum {
  Assistants = "assistants",
  GroupChats = "group_chats",
  Apps = "apps",
  Services = "services",
  Collections = "collections",
  Insights = "insights",
  AI = "AI",
  Editor = "editor",
  Admin = "admin",
  Websites = "websites",
  Integrations = "integrations",
  SharedSpaces = "shared_spaces",
  ApiKeys = "api_keys",
}

export enum UserCreatedAdminViewStateEnum {
  Invited = "invited",
  Active = "active",
  Inactive = "inactive",
  Deleted = "deleted",
}

export enum UserIntegrationIntegrationTypeEnum {
  Confluence = "confluence",
  Sharepoint = "sharepoint",
}

export enum UserUpdatePublicStateEnum {
  Invited = "invited",
  Active = "active",
  Inactive = "inactive",
  Deleted = "deleted",
}

export enum WebsiteCreateCrawlTypeEnum {
  Crawl = "crawl",
  Sitemap = "sitemap",
}

export enum WebsiteCreateUpdateIntervalEnum {
  Never = "never",
  Daily = "daily",
  EveryOtherDay = "every_other_day",
  Weekly = "weekly",
}

export enum WebsiteCreateRequestDeprecatedCrawlTypeEnum {
  Crawl = "crawl",
  Sitemap = "sitemap",
}

export enum WebsiteCreateRequestDeprecatedUpdateIntervalEnum {
  Never = "never",
  Daily = "daily",
  EveryOtherDay = "every_other_day",
  Weekly = "weekly",
}

export enum WebsiteExistsResponseUpdateIntervalEnum {
  Never = "never",
  Daily = "daily",
  EveryOtherDay = "every_other_day",
  Weekly = "weekly",
}

export enum WebsiteUpdateCrawlTypeEnum {
  Crawl = "crawl",
  Sitemap = "sitemap",
}

export enum WebsiteUpdateUpdateIntervalEnum {
  Never = "never",
  Daily = "daily",
  EveryOtherDay = "every_other_day",
  Weekly = "weekly",
}

export enum IntricTenantsPresentationTenantCredentialsRouterCredentialInfoEncryptionStatusEnum {
  Encrypted = "encrypted",
  Plaintext = "plaintext",
}

export enum IntricTenantsPresentationTenantSelfCredentialsRouterCredentialInfoEncryptionStatusEnum {
  Encrypted = "encrypted",
  Plaintext = "plaintext",
}

export enum IntricWebsitesCrawlDependenciesCrawlModelsCrawlRunPublicStatusEnum {
  InProgress = "in progress",
  Queued = "queued",
  Complete = "complete",
  Failed = "failed",
  NotFound = "not found",
}

export enum SseIntricEventIntricEventTypeEnum {
  GeneratingImage = "generating_image",
  ToolCall = "tool_call",
  ToolApprovalRequired = "tool_approval_required",
  ToolApprovalTimeout = "tool_approval_timeout",
  TokenUsage = "token_usage",
}

export enum SseToolCallIntricEventTypeEnum {
  GeneratingImage = "generating_image",
  ToolCall = "tool_call",
  ToolApprovalRequired = "tool_approval_required",
  ToolApprovalTimeout = "tool_approval_timeout",
  TokenUsage = "token_usage",
}

export enum SseToolApprovalRequiredIntricEventTypeEnum {
  GeneratingImage = "generating_image",
  ToolCall = "tool_call",
  ToolApprovalRequired = "tool_approval_required",
  ToolApprovalTimeout = "tool_approval_timeout",
  TokenUsage = "token_usage",
}

export enum SseToolApprovalTimeoutIntricEventTypeEnum {
  GeneratingImage = "generating_image",
  ToolCall = "tool_call",
  ToolApprovalRequired = "tool_approval_required",
  ToolApprovalTimeout = "tool_approval_timeout",
  TokenUsage = "token_usage",
}

export enum SseTokenUsageIntricEventTypeEnum {
  GeneratingImage = "generating_image",
  ToolCall = "tool_call",
  ToolApprovalRequired = "tool_approval_required",
  ToolApprovalTimeout = "tool_approval_timeout",
  TokenUsage = "token_usage",
}
