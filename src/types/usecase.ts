export interface UseCaseField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'dropdown' | 'checkbox' | 'radio' | 'toggle' | 'period_range';
  source?: string;
  endpoint?: string;
  required?: boolean;
  defaultValue?: any;
  default?: any;
  placeholder?: string;
  options?: string[] | { value: string; label: string }[];
  fields?: UseCaseField[]; // Sub-fields for period_range
}

export interface UseCaseSection {
  id: string;
  label: string;
  fields: UseCaseField[];
}

export interface UseCaseSchema {
  id: string;
  name: string;
  description: string;
  fields: UseCaseField[];
  sections?: UseCaseSection[];
}

// --- Result types ---

export interface AgentRecord {
  gl_account: string;
  gl_account_name: string;
  [dimension: string]: any;
  amount_period_1: number;
  amount_period_2: number;
  variance: number;
  variance_pct: number;
  status: 'Existing' | 'New' | 'Removed';
}

export interface StatisticalSummary {
  total_amount: number;
  mean: number;
  std_dev: number;
  min: number;
  max: number;
}

export interface AgentResult {
  agent_name: string;
  dimension: string;
  records_fetched: number;
  data: AgentRecord[];
  statistical_summary: StatisticalSummary;
  narrative: string;
  key_finding: string;
  confidence: string;
}

export interface AccountRow {
  gl_account: string;
  gl_account_name: string;
  period_balance_amount: number;
  comparison_period_balance_amount: number;
  absolute_difference_amount: number;
  relative_difference_amount: number;
  flagged: boolean;
}

export interface UseCaseResult {
  usecase_id: string;
  executive_summary: string;
  cro_summary: string;
  agent_results: AgentResult[];
  accounts: AccountRow[];
  flagged_count: number;
  chart_data: {
    variance_by_account: { label: string; data: { x: string; y: number }[] }[];
    variance_by_dimension: { label: string; data: { x: string; y: number }[] }[];
  };
  result_summary: string;
  session_id: string;
}

export interface ExecutionResult {
  id: string;
  type: 'table' | 'chart' | 'narrative';
  title: string;
  data: any;
  meta?: Record<string, any>;
}

export interface UseCaseExecutionResponse {
  results: Record<string, ExecutionResult>;
  insight?: string;
}
