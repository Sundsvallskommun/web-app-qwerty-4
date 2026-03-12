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

export interface DatesAndId {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface ModelId {
  id: string;
}

export interface ToolAssistant {
  id: string;
  handle: string;
}

export interface UseTools {
  assistants: ToolAssistant[];
}

export interface ModelKwargs {
  temperature?: number | null;
  top_p?: number | null;
}

export interface PaginatedDefaults {
  count: number;
}

export interface PaginatedPermissionsDefaults {
  permissions?: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
  count: number;
}

export interface SecurityClassificationPublic {
  name: string;
  description: string | null;
  security_level: number;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface WebSearchResultPublic {
  id: string;
  title: string;
  url: string;
}

export interface ConversationRequestDto {
  assistant_id?: string;
  group_chat_id?: string;
  session_id?: string;
  question: string;
  files?: ModelId[];
  stream?: boolean;
  use_tools?: UseTools | null;
  use_web_search?: boolean;
}

export interface FilePublic {
  name: string;
  mimetype: string;
  size: number;
  transcription?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface AcceptedFileType {
  mimetype: string;
  size_limit: number;
}

export interface Limit {
  max_files: number;
  max_size: number;
}

export interface FileRestrictions {
  accepted_file_types: AcceptedFileType[];
  limit: Limit;
}

export interface PaginatedResponseFilePublic {
  items: FilePublic[];
  count: number;
}

export interface InfoBlobMetadata {
  url?: string | null;
  title?: string | null;
  embedding_model_id: string;
  size: number;
}

export interface InfoBlobPublicNoText {
  metadata: InfoBlobMetadata;
  group_id?: string | null;
  website_id?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface InfoBlobPublic {
  text: string;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  metadata: InfoBlobMetadata;
  group_id?: string | null;
  website_id?: string | null;
}

export interface PaginatedResponseInfoBlobPublicNoText {
  items: InfoBlobPublicNoText[];
  count: number;
}

export interface PaginatedResponseInfoBlobPublic {
  items: InfoBlobPublic[];
  count: number;
}

export interface JobPublic {
  name?: string | null;
  status: "in progress" | "queued" | "complete" | "failed" | "not found";
  task:
    | "upload_info_blob"
    | "transcription"
    | "crawl"
    | "embed_group"
    | "crawl_all_websites"
    | "run_app"
    | "pull_confluence_content"
    | "pull_sharepoint_content"
    | "sync_sharepoint_delta"
    | "update_model_usage_stats";
  result_location?: string | null;
  finished_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface EmbeddingModelPublic {
  name: string;
  family:
    | "openai"
    | "mistral"
    | "vllm"
    | "claude"
    | "azure"
    | "ovhcloud"
    | "e5";
  is_deprecated: boolean;
  open_source: boolean;
  dimensions?: number | null;
  max_input?: number | null;
  hf_link?: string | null;
  stability: "stable" | "experimental";
  hosting: "usa" | "eu" | "swe";
  description?: string | null;
  org?:
    | "OpenAI"
    | "Meta"
    | "Microsoft"
    | "Anthropic"
    | "Mistral"
    | "KBLab"
    | "Google"
    | "Berget"
    | "GDM"
    | null;
  can_access: boolean;
  is_locked: boolean;
  is_org_enabled: boolean;
  security_classification?: SecurityClassificationPublic | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface TranscriptionModelPublic {
  id: string;
  name: string;
  nickname: string;
  family:
    | "openai"
    | "mistral"
    | "vllm"
    | "claude"
    | "azure"
    | "ovhcloud"
    | "e5";
  is_deprecated: boolean;
  stability: "stable" | "experimental";
  hosting: "usa" | "eu" | "swe";
  open_source?: boolean | null;
  description?: string | null;
  hf_link?: string | null;
  org?:
    | "OpenAI"
    | "Meta"
    | "Microsoft"
    | "Anthropic"
    | "Mistral"
    | "KBLab"
    | "Google"
    | "Berget"
    | "GDM"
    | null;
  can_access?: boolean;
  is_locked?: boolean;
  is_org_enabled?: boolean;
  is_org_default?: boolean;
  security_classification?: SecurityClassificationPublic | null;
}

export interface EmbeddingModelPublicLegacy {
  name: string;
  family: "openai" | "mini_lm" | "e5";
  is_deprecated: boolean;
  open_source: boolean;
  dimensions?: number | null;
  max_input?: number | null;
  hf_link?: string | null;
  stability: "stable" | "experimental";
  hosting: "usa" | "eu" | "swe";
  description?: string | null;
  org?:
    | "OpenAI"
    | "Meta"
    | "Microsoft"
    | "Anthropic"
    | "Mistral"
    | "KBLab"
    | "Google"
    | "Berget"
    | "GDM"
    | null;
  is_org_enabled?: boolean;
  can_access?: boolean;
  is_locked?: boolean;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface CompletionModelSparse {
  name: string;
  nickname: string;
  family:
    | "openai"
    | "mistral"
    | "vllm"
    | "claude"
    | "azure"
    | "ovhcloud"
    | "e5";
  token_limit: number;
  is_deprecated: boolean;
  nr_billion_parameters?: number | null;
  hf_link?: string | null;
  stability: "stable" | "experimental";
  hosting: "usa" | "eu" | "swe";
  open_source?: boolean | null;
  description?: string | null;
  deployment_name?: string | null;
  org?:
    | "OpenAI"
    | "Meta"
    | "Microsoft"
    | "Anthropic"
    | "Mistral"
    | "KBLab"
    | "Google"
    | "Berget"
    | "GDM"
    | null;
  vision: boolean;
  reasoning: boolean;
  base_url?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface CompletionModel {
  is_org_enabled?: string;
  is_org_default?: boolean;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  nickname: string;
  family:
    | "openai"
    | "mistral"
    | "vllm"
    | "claude"
    | "azure"
    | "ovhcloud"
    | "e5";
  token_limit: number;
  is_deprecated: boolean;
  nr_billion_parameters?: number | null;
  hf_link?: string | null;
  stability: "stable" | "experimental";
  hosting: "usa" | "eu" | "swe";
  open_source?: boolean | null;
  description?: string | null;
  deployment_name?: string | null;
  org?:
    | "OpenAI"
    | "Meta"
    | "Microsoft"
    | "Anthropic"
    | "Mistral"
    | "KBLab"
    | "Google"
    | "Berget"
    | "GDM"
    | null;
  vision: boolean;
  reasoning: boolean;
  base_url?: string | null;
}

export interface CompletionModelPublic {
  can_access?: boolean;
  is_locked?: boolean;
  security_classification?: SecurityClassificationPublic | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  nickname: string;
  family:
    | "openai"
    | "mistral"
    | "vllm"
    | "claude"
    | "azure"
    | "ovhcloud"
    | "e5";
  token_limit: number;
  is_deprecated: boolean;
  nr_billion_parameters?: number | null;
  hf_link?: string | null;
  stability: "stable" | "experimental";
  hosting: "usa" | "eu" | "swe";
  open_source?: boolean | null;
  description?: string | null;
  deployment_name?: string | null;
  org?:
    | "OpenAI"
    | "Meta"
    | "Microsoft"
    | "Anthropic"
    | "Mistral"
    | "KBLab"
    | "Google"
    | "Berget"
    | "GDM"
    | null;
  vision: boolean;
  reasoning: boolean;
  base_url?: string | null;
  is_org_enabled?: string;
  is_org_default?: boolean;
}

export interface InfoBlobAskAssistantPublic {
  metadata: InfoBlobMetadata;
  group_id?: string | null;
  website_id?: string | null;
  score: number;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
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

export interface SessionMetadataPublic {
  name: string;
  created_at?: string | null;
  updated_at?: string | null;
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

export interface Message {
  created_at?: string | null;
  updated_at?: string | null;
  id?: string | null;
  question: string;
  answer: string;
  completion_model?: CompletionModel | null;
  references: InfoBlobPublicNoText[];
  files: FilePublic[];
  tools: UseTools[];
  generated_files: FilePublic[];
  web_search_references: WebSearchResultPublic[];
}

export interface SessionFeedback {
  value: "Value11" | -1 | "Value1" | 1;
  text?: string | null;
}

export interface SessionPublic {
  name: string;
  messages: Message[];
  feedback?: SessionFeedback | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface AdditionalField {
  type: "attachments" | "groups";
  value: object[];
}

export interface TemplateCreate {
  id: string;
  additional_fields: AdditionalField[] | null;
}

export interface CreateSpaceAssistantDto {
  name: string;
  from_template?: TemplateCreate | null;
}

export interface CollectionMetadata {
  num_info_blobs: number;
  size: number;
}

export interface CollectionPublic {
  permissions: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
  name: string;
  embedding_model: EmbeddingModelPublic;
  metadata: CollectionMetadata;
  space_id: string;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface PaginatedPermissionsCollectionPublic {
  items: CollectionPublic[];
  count: number;
  permissions?: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
}

export interface EneoWebsitesPresentationWebsiteModelsCrawlRunPublic {
  pages_crawled: number | null;
  files_downloaded: number | null;
  pages_failed: number | null;
  files_failed: number | null;
  status: "in progress" | "queued" | "complete" | "failed" | "not found";
  result_location: string | null;
  finished_at: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface WebsiteMetadata {
  size: number;
}

export interface WebsitePublic {
  permissions: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
  name: string | null;
  url: string;
  space_id: string;
  download_files: boolean;
  crawl_type: "crawl" | "sitemap";
  update_interval: "never" | "daily" | "every_other_day" | "weekly";
  latest_crawl: EneoWebsitesPresentationWebsiteModelsCrawlRunPublic | null;
  embedding_model: EmbeddingModelPublic;
  metadata: WebsiteMetadata;
  requires_http_auth: boolean;
  is_auto_disabled: boolean;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface PaginatedPermissionsWebsitePublic {
  items: WebsitePublic[];
  count: number;
  permissions?: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
}

export interface RolePublic {
  name: string;
  permissions: (
    | "assistants"
    | "group_chats"
    | "apps"
    | "services"
    | "collections"
    | "insights"
    | "AI"
    | "editor"
    | "admin"
    | "websites"
    | "integration_knowledge_list"
  )[];
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface UserGroupRead {
  name: string;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface UserSparse {
  email: string;
  username?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface UserPublic {
  quota_used?: number;
  truncated_api_key?: string | null;
  quota_limit?: number | null;
  roles: RolePublic[];
  predefined_roles: any[];
  user_groups: UserGroupRead[];
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  email: string;
  username?: string | null;
}

export interface PromptPublic {
  permissions: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
  description?: string | null;
  is_selected?: boolean | null;
  user: UserSparse;
  text: string;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface IntegrationKnowledgeMetaData {
  size: number;
}

export interface IntegrationKnowledgePublic {
  name: string;
  url: string;
  tenant_id: string;
  space_id: string;
  user_integration_id: string;
  embedding_model: EmbeddingModelPublicLegacy;
  permissions?: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
  metadata: IntegrationKnowledgeMetaData;
  integration_type: "confluence" | "sharepoint";
  id: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface MetadataJson {
  pinned?: boolean;
}

export interface AssistantCommon {
  name: string;
  completion_model_kwargs: ModelKwargs;
  logging_enabled: boolean;
  permissions?: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
  published?: boolean;
  description?: string | null;
  metadata_json?: MetadataJson | null;
  type: "assistant" | "default-assistant";
  icon_id?: string;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface AssistantSparse {
  user_id: string;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  completion_model_kwargs: ModelKwargs;
  logging_enabled: boolean;
  permissions?: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
  published?: boolean;
  description?: string | null;
  metadata_json?: MetadataJson | null;
  type: "assistant" | "default-assistant";
  icon_id?: string;
}

export interface AssistantPublic {
  prompt?: PromptPublic | null;
  space_id: string;
  attachments: FilePublic[];
  allowed_attachments: FileRestrictions;
  groups: CollectionPublic[];
  websites: WebsitePublic[];
  integration_knowledge_list: IntegrationKnowledgePublic[];
  completion_model: CompletionModelSparse;
  user: UserSparse;
  tools: UseTools;
  insight_enabled: boolean;
  data_retention_days?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  completion_model_kwargs: ModelKwargs;
  logging_enabled: boolean;
  permissions?: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
  published?: boolean;
  description?: string | null;
  metadata_json?: MetadataJson | null;
  type: "assistant" | "default-assistant";
  icon_id?: string;
}

export interface PaginatedResponseAssistantPublic {
  items: AssistantPublic[];
  count: number;
}

export interface GroupChatSparse {
  permissions?: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
  created_at: string;
  updated_at: string;
  name: string;
  id: string;
  user_id: string;
  published: boolean;
  type: string;
  metadata_json?: object | null;
}

export interface ServiceSparse {
  output_format?: "json" | "list" | "boolean" | null;
  json_schema?: object | null;
  name: string;
  prompt: string;
  completion_model_kwargs?: ModelKwargs | null;
  permissions?: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
  user_id: string;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface AppSparse {
  permissions?: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
  name: string;
  description?: string | null;
  published: boolean;
  user_id: string;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface PaginatedPermissionsIntegrationKnowledgePublic {
  items: IntegrationKnowledgePublic[];
  count: number;
  permissions?: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
}

export interface Knowledge {
  groups: PaginatedPermissionsCollectionPublic;
  websites: PaginatedPermissionsWebsitePublic;
  integration_knowledge_list: PaginatedPermissionsIntegrationKnowledgePublic;
}

export interface SpaceGroupMember {
  name: string;
  role: "admin" | "editor" | "viewer";
  user_count?: number;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface PaginatedPermissionsSpaceGroupMember {
  permissions?: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
  items: SpaceGroupMember[];
  count: number;
}

export interface SpaceSparse {
  permissions?: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
  name: string;
  description?: string | null;
  personal: boolean;
  organization?: boolean;
  applications?: Applications;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface PaginatedPermissionsAssistantSparse {
  items: AssistantSparse[];
  count: number;
  permissions?: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
}

export interface PaginatedPermissionsGroupChatSparse {
  items: GroupChatSparse[];
  count: number;
  permissions?: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
}

export interface PaginatedPermissionsServiceSparse {
  items: ServiceSparse[];
  count: number;
  permissions?: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
}

export interface PaginatedPermissionsAppSparse {
  items: AppSparse[];
  count: number;
  permissions?: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
}

export interface Applications {
  assistants: PaginatedPermissionsAssistantSparse;
  group_chats: PaginatedPermissionsGroupChatSparse;
  services: PaginatedPermissionsServiceSparse;
  apps: PaginatedPermissionsAppSparse;
}

export interface SpaceMember {
  email: string;
  username?: string | null;
  role: "admin" | "editor" | "viewer";
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface PaginatedPermissionsSpaceMember {
  items: SpaceMember[];
  count: number;
  permissions?: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
}

export interface SpaceRole {
  value: "admin" | "editor" | "viewer";
  label: string;
}

export interface SpacePublic {
  applications?: Applications;
  embedding_models: EmbeddingModelPublic[];
  completion_models: CompletionModelPublic[];
  transcription_models: TranscriptionModelPublic[];
  knowledge: Knowledge;
  members: PaginatedPermissionsSpaceMember;
  default_assistant: any;
  available_roles: SpaceRole[];
  security_classification: SecurityClassificationPublic | null;
  group_members: PaginatedPermissionsSpaceGroupMember;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  permissions?: (
    | "read"
    | "create"
    | "edit"
    | "delete"
    | "add"
    | "remove"
    | "publish"
    | "insight_view"
    | "insight_toggle"
  )[];
  name: string;
  description?: string | null;
  personal: boolean;
  organization?: boolean;
}

export interface PaginatedResponseSpaceSparse {
  items: SpaceSparse[];
  count: number;
}

export interface NewPrompt {
  text: string;
  description?: string | null;
}

export interface AssistantGuard {
  guardrail_active?: boolean;
  guardrail_string?: string;
  on_fail_message?: string;
}

export interface UpdateAssistantDto {
  name?: string | null;
  prompt?: NewPrompt;
  completion_model?: any;
  completion_model_kwargs?: ModelKwargs | null;
  groups?: ModelId[] | null;
  websites?: ModelId[] | null;
  logging_enabled?: boolean | null;
  space_id?: string | null;
  guardrail?: any;
  attachments?: ModelId[] | null;
  description?: string | null;
}
