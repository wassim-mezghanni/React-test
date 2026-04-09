// ============================================================
// QUERAI — Frontend API Contract
// Base URL: http://localhost:8000 (dev) | https://api.querai.app (prod)
// All requests: Content-Type: application/json
// ============================================================


// ─────────────────────────────────────────────────────────────
// AUTHENTICATION MODEL
// ─────────────────────────────────────────────────────────────
//
// Two-token model:
//
//  auth_token  — proves who you are. Received at login.
//                Never expires unless user logs out.
//                Send on every request as header:
//                  Authorization: Bearer <auth_token>
//
//  session_id  — identifies one conversation. Created with POST /sessions/new.
//                One per conversation. Many sessions per user.
//                Send in request body or query param alongside auth_token.
//
// Flow:
//   1. POST /auth/login       → receive auth_token
//   2. Store auth_token (memory / localStorage)
//   3. POST /sessions/new     → receive session_id (start a conversation)
//      OR omit session_id on /usecase/execute — backend auto-creates one
//   4. All chat/UC calls send:
//        Header: Authorization: Bearer <auth_token>
//        Body:   { session_id?: "...", ... }
//   5. On 401 → clear auth_token, redirect to login
//
// The frontend never touches SAP credentials after registration.

type AuthToken = string;
type SessionId = string; // UUID — one per conversation


// ─────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────

type AgentType = "usecase" | "select" | "analyse" | "knowledge";
type Confidence = "high" | "medium" | "low";

interface DropdownOption {
  value: string;
  label: string;   // always "value — description" format
}

// All errors from the backend:
interface ApiError {
  detail: string;
  // Pydantic validation errors also include:
  errors?: { loc: string[]; msg: string; type: string }[];
}

// HTTP status codes:
//   200  OK
//   201  Created
//   400  Bad request
//   401  Session not found / expired  →  redirect to login
//   403  SAP authorisation denied for this user's SAP account
//   404  Not found
//   409  Conflict (e.g. email already registered)
//   422  Validation error
//   500  Unexpected backend error
//   503  SAP system or LLM not reachable


// ─────────────────────────────────────────────────────────────
// AUTH  (public — no session required)
// ─────────────────────────────────────────────────────────────

// POST /auth/register
// SAP credentials are validated against the live SAP system before
// storing. Registration fails with 401 if SAP rejects the credentials.
interface RegisterRequest {
  email: string;
  app_password: string;     // hashed by backend (bcrypt), never stored plain
  full_name: string;
  sap_username: string;
  sap_password: string;     // encrypted by backend (Fernet), never stored plain
}
interface RegisterResponse {
  user_id: string;
  email: string;
  message: string;
}
// 409 { detail: "Email already registered" }
// 401 { detail: "SAP credentials invalid — check username / password / client" }


// POST /auth/login
interface LoginRequest {
  email: string;
  app_password: string;
}
interface LoginResponse {
  auth_token: AuthToken;         // ← store this, send as Bearer on every request
  user_id: string;
  full_name: string;
  default_company_code: string;
  default_currency: string;
  role: "admin" | "user";
}
// 401 { detail: "Invalid credentials" }


// POST /auth/logout
// Header: Authorization: Bearer <auth_token>
// Body: {}
// → { message: "Logged out" }
// Backend invalidates the auth_token. Frontend clears it.


// GET /auth/me
// Header: Authorization: Bearer <auth_token>
interface MeResponse {
  user_id: string;
  full_name: string;
  email: string;
  default_company_code: string;
  default_currency: string;
}


// ─────────────────────────────────────────────────────────────
// SETTINGS  [AUTH REQUIRED]
// ─────────────────────────────────────────────────────────────

interface UserSettings {
  default_company_code: string;
  default_currency: string;
  default_threshold_type: "Percentage" | "Absolute";
  default_threshold_value: number;
  prediction_horizon: string;   // e.g. "30 days"
  date_format: string;          // e.g. "DD/MM/YYYY"
  data_source: "sap" | "oracle";
}

// GET  /settings
// Header: Authorization: Bearer <auth_token>
// → UserSettings

// POST /settings
// Header: Authorization: Bearer <auth_token>
// Body: Partial<UserSettings>  (only the changed fields)
// → UserSettings  (full updated object)


// GET /settings/connection-status  (no auth — health check)
interface DataSourceConnection {
  source: string;        // e.g. "sap", "oracle"
  connected: boolean;
  host: string;
}
interface ConnectionStatusResponse {
  connections: DataSourceConnection[];
  llm: { connected: boolean; model: string };
}


// ─────────────────────────────────────────────────────────────
// METADATA — use case dropdown data  [AUTH REQUIRED]
// ─────────────────────────────────────────────────────────────
//
// Each use case defines which parameters it needs via its schema.
// The schema's `source` field tells the frontend which metadata endpoint
// to call for each dropdown.
//
// Backend resolves the data source (sap/oracle) internally from the
// user's data_source setting. Frontend never specifies the data source.
//
// GET /metadata/{usecase_id}/{parameter}
// Header: Authorization: Bearer <auth_token>
// → DropdownOption[]
//
// Examples:
//   GET /metadata/uc_001/P_Ledger
//   GET /metadata/uc_001/P_CompanyCode
//   GET /metadata/uc_001/P_FinancialStatementVersion
//   GET /metadata/uc_001/P_CurrencyRole
//   GET /metadata/uc_001/P_PlanningCategory
//   GET /metadata/uc_001/fiscal-years
//   GET /metadata/uc_001/fiscal-periods


// ─────────────────────────────────────────────────────────────
// SESSIONS  [AUTH REQUIRED]
// Header on all: Authorization: Bearer <auth_token>
// ─────────────────────────────────────────────────────────────
//
// One session = one conversation.
// User can have many sessions. The sidebar shows the list.
// When navigating from chat view to UC view and back, same session —
// history is continuous. The agent sidebar on UC views shows the SAME history.

// POST /sessions/new
// Call when user clicks "New chat". Body: {}
interface NewSessionResponse {
  session_id: SessionId;
  created_at: string;
}

// GET /sessions
// Returns all conversations for this user, newest first.
interface SessionSummary {
  session_id: string;
  created_at: string;
  last_active: string;
  preview: string;    // first user message, truncated to ~60 chars
}
// → SessionSummary[]

// DELETE /sessions/:session_id
// → { message: "Deleted" }

// GET /sessions/:session_id/history
// Returns all turns for this conversation in chronological order.
interface ConversationTurn {
  id: string;
  sequence_number: number;
  actor: "user" | "agent" | "system";
  agent_type: AgentType | null;
  content_type: "message" | "redirect" | "selection" | "result" | "analysis" | "answer";
  content: Record<string, unknown>;  // shape varies by content_type
  created_at: string;                // ISO datetime
}
// → ConversationTurn[]


// ─────────────────────────────────────────────────────────────
// CHAT  [AUTH REQUIRED]
// ─────────────────────────────────────────────────────────────

// POST /chat
// The main chat endpoint. Send user message + which agent to use.
// Backend saves both the user turn and the agent response turn to DB.
//
// agent_type selection is the frontend's responsibility:
//   "usecase"   → user is in main chat, describing a financial task
//   "select"    → user wants to build a custom SAP query
//   "analyse"   → ONLY call this when a data table is currently visible
//                 on screen. Send the visible table rows in context_data.
//   "knowledge" → user is asking a general SAP / finance question

interface ChatRequest {
  session_id: SessionId;
  message: string;
  agent_type: AgentType;
  context_data?: {
    // Required when agent_type = "analyse"
    // Frontend truncates to max 500 rows before sending
    table_data?: Record<string, unknown>[];
    columns?: string[];
  };
}

// Response is a discriminated union on `type`:

// ── type: "answer" ───────────────────────────
// Default fallback. Returned by:
//   - knowledge agent (always)
//   - usecase agent when it cannot identify a use case
// `message` is always plain text, never structured.
interface ChatResponseAnswer {
  type: "answer";
  message: string;
}

// ── type: "redirect" ─────────────────────────
// Returned by usecase agent when it identifies a use case.
// Frontend should: open the UC parameter form for usecase_id,
// pre-fill the fields listed in `prefilled`, highlight `missing`.
interface PrefillValue {
  value: unknown;
  confidence: Confidence | null;
}
interface ChatResponseRedirect {
  type: "redirect";
  usecase_id: "uc_001" | "uc_002" | "uc_003";
  prefilled: Record<string, PrefillValue>;   // keyed by parameter id
  missing: string[];                          // parameter ids still needed
  corner_message: string;                     // short text for the chat bubble
  // e.g. "Opening Variance Analysis —
  //       filled period & threshold,
  //       need currency."
}

// ── type: "select_redirect" ──────────────────
// Returned by select agent. Frontend opens the query builder UI.
// Only service_url and entity_set are guaranteed.
// Everything else is what the agent managed to resolve — may be empty.
interface ChatResponseSelectRedirect {
  type: "select_redirect";
  service_url: string;
  entity_set: string;
  selected_fields?: string[];
  filters?: Record<string, string>;
  missing_filters?: string[];
}

// ── type: "analysis" ─────────────────────────
// Returned by analyse agent. Rendered inline in chat.
// No redirect. The table stays visible.
interface ChatResponseAnalysis {
  type: "analysis";
  response: string;      // plain text LLM analysis
  rows_analysed: number;
}

type ChatResponse =
  | ChatResponseAnswer
  | ChatResponseRedirect
  | ChatResponseSelectRedirect
  | ChatResponseAnalysis;


// POST /chat/assist  [AUTH REQUIRED]
// ─────────────────────────────────────────────
// Purpose: inline parameter assistant inside a UC form.
//
// Scenario: User is on the UC_001 parameter form. Some fields are
// pre-filled from the redirect, some are still empty. There is a small
// chat input at the bottom of the form. The user types:
//   "actually use Q1 vs Q2 2024 and set threshold to 5%"
// The frontend calls /chat/assist. The agent resolves those values,
// returns updated_params, and the form fields update in place.
// The user never leaves the form.
//
// This is NOT the main chat. It is a focused helper that only talks
// about the parameters of the current form.
interface AssistRequest {
  session_id: SessionId;
  agent_type: "usecase" | "select";
  usecase_id?: string;                      // required when agent_type = "usecase"
  current_params: Record<string, unknown>;  // what is already filled in the form
  missing_params: string[];                 // param ids that are still empty
  message: string;                          // what the user just typed
}
interface AssistResponse {
  message: string;                          // conversational reply shown in the form
  updated_params: Record<string, unknown>;  // merged with current_params on frontend
  still_missing: string[];                  // param ids still unresolved after this turn
}


// ─────────────────────────────────────────────────────────────
// USE CASE SCHEMA  [AUTH REQUIRED]
// ─────────────────────────────────────────────────────────────
// GET /usecase/schema?usecase_id=uc_001
// Header: Authorization: Bearer <auth_token>
//
// Returns the form definition for a use case.
// Frontend uses this to know which fields to render, which dropdowns
// to load, and which fields are required.
// User's defaults (company_code, currency) are injected by backend.

type ParameterFieldType = "dropdown" | "number" | "multi_select" | "text" | "date" | "toggle" | "period_range";

interface ParameterField {
  id: string;
  label: string;
  type: ParameterFieldType;
  required?: boolean;
  // For dropdown fields — frontend calls GET /metadata/{source}
  // e.g. source: "uc_001/P_Ledger" → GET /metadata/uc_001/P_Ledger
  source?: string;
  options?: string[];          // for static dropdowns / toggles (no SAP call needed)
  default?: unknown;           // pre-filled from user settings
  placeholder?: string;
  fields?: ParameterField[];   // nested fields (used by period_range groups)
}

interface SchemaSection {
  id: string;
  label: string;
  fields: ParameterField[];
}

interface UseCaseSchema {
  usecase_id: string;
  name: string;
  description: string;
  sections: SchemaSection[];
}

// Frontend flow:
//   1. GET /usecase/schema?usecase_id=uc_001  → receive sections with fields
//   2. For each field with `source`, call GET /metadata/{source}  → dropdown options
//   3. Render form grouped by sections
//   4. On submit, POST /usecase/execute with { usecase_id, parameters, session_id? }


// ─────────────────────────────────────────────────────────────
// USE CASE EXECUTION  [AUTH REQUIRED]
// ─────────────────────────────────────────────────────────────

// POST /usecase/execute
// Unified endpoint for all use cases. Backend dispatches by usecase_id.
// session_id is optional — if omitted, backend auto-creates a new session.
// The response always includes session_id so frontend can track it.
interface UsecaseExecuteRequest {
  usecase_id: string;                     // "uc_001" | "uc_002" | "uc_003"
  session_id?: SessionId;                 // optional — auto-created if missing
  parameters: Record<string, unknown>;    // use-case-specific parameters
}

// UC_001 parameters (passed inside `parameters`):
// {
//   company_code: string;
//   period_a_fiscal_year: string;
//   period_a_from: string;
//   period_a_to: string;
//   period_b_fiscal_year: string;
//   period_b_from: string;
//   period_b_to: string;
//   threshold_value: number;
//   threshold_type: "Absolute" | "Percentage";
//   ledger?: string;                        // default "0L"
//   comparison_ledger?: string;             // default "0L"
//   currency_role?: string;                 // default "10" — P_CurrencyRole sent to SAP
//   planning_category?: string;             // default "ACT01"
//   financial_statement_version?: string;   // default "INT"
// }

// ── UC_001  Financial Variance Analysis ──────
//
// The workflow runs 5 parallel agents (Cost Center, Customer, Supplier,
// Profit Center, Document Type). Each agent independently fetches SAP
// data for the flagged accounts on its own dimension, runs aggregation
// and LLM analysis, and returns its own AgentResult.
// The frontend renders each AgentResult as a separate tab/panel,
// showing that agent's top_items and narrative.

interface AgentResult {
  agent_name: string;        // e.g. "Cost Center Agent"
  dimension: string;         // e.g. "CostCenter"
  records_fetched: number;
  data: Record<string, unknown>[];         // full dimension table the frontend renders
  statistical_summary: {
    total_amount: number;
    mean: number;
    std_dev: number;
    min: number;
    max: number;
  };
  narrative: string;         // 2-3 paragraph LLM analysis for this dimension
  key_finding: string;       // one sentence (used internally by CFO agent)
  confidence: Confidence;
}

interface AccountRow {
  gl_account: string;
  gl_account_name: string;
  period_balance_amount: number;
  comparison_period_balance_amount: number;
  absolute_difference_amount: number;
  relative_difference_amount: number;
  flagged: boolean;                  // true if exceeded the variance threshold
}

interface ChartSeries {
  label: string;
  data: { x: string | number; y: number }[];
}

interface UC001Response {
  usecase_id: "uc_001";
  session_id: SessionId;           // always present — auto-created if not provided
  executive_summary: string;       // CFO synthesis
  cro_summary: string;
  agent_results: AgentResult[];    // one entry per dimension agent
  accounts: AccountRow[];          // all GL accounts — flagged: true/false
  flagged_count: number;           // count of accounts where flagged === true
  chart_data: {
    variance_by_account: ChartSeries[];
    variance_by_dimension: ChartSeries[];
  };
  result_summary: string;
  // ↑ 2-3 sentences. Saved as a conversation turn by the backend.
  //   Do not store full result in chat — only result_summary is persisted.
}


// ─────────────────────────────────────────────────────────────
// QUERY BUILDER (Select UI)  [AUTH REQUIRED]
// ─────────────────────────────────────────────────────────────
// Called directly by the query builder view after the select agent
// has identified the service. User confirms the query, then executes.

// POST /query/execute
interface QueryExecuteRequest {
  session_id: SessionId;
  service_url: string;
  entity_set: string;
  odata_version: "V2" | "V4";
  parameter_set?: string;
  nav_property?: string;
  parameters?: Record<string, string>;
  filters?: Record<string, string>;
  select?: string[];
  top?: number;            // default 500, max 5000
}
interface QueryExecuteResponse {
  url: string;             // the constructed OData URL (show in debug/advanced mode)
  count: number;
  error: string | null;
  data: Record<string, unknown>[];
}

// GET /query/value-help?service_url=<url>&collection_path=<path>&top=200
// Header: Authorization: Bearer <auth_token>
interface ValueHelpResponse {
  url: string;
  count: number;
  error: string | null;
  data: Record<string, unknown>[];
}
