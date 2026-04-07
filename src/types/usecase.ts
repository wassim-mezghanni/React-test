export interface UseCaseField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'dropdown' | 'checkbox' | 'radio' | 'toggle';
  source?: string; // For metadata dropdown
  endpoint?: string; // For metadata dropdown
  required?: boolean;
  defaultValue?: any;
  placeholder?: string;
  options?: { value: string; label: string }[]; // For static dropdown/radio
}

export interface UseCaseSchema {
  id: string;
  name: string;
  description: string;
  fields: UseCaseField[];
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
