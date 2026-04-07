import { getMockMetadata } from '../mocks/metadataMock';

// [BACKEND_INTEGRATION]: Update this URL to your production/staging API
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';
const TOKEN_KEY = 'querai_auth_token';

// [BACKEND_INTEGRATION]: Set this to 'false' in your .env file (VITE_USE_MOCKS=false) 
// to disable all frontend mocks and use real API calls.
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false'; // Default to true for demo

// ── Token helpers ────────────────────────────────────────────

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('querai_user');
}

// ── Core fetch wrapper ───────────────────────────────────────

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  params?: Record<string, string>;
  auth?: boolean; // default true
}

async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, params, auth = true } = opts;

  // [BACKEND_INTEGRATION]: This block intercepts requests to provide mock data.
  // When you have a working backend, you can remove this block entirely or rely 
  // on the USE_MOCKS toggle above.
  if (USE_MOCKS) {
    // Metadata Mocks
    if (path.startsWith('/metadata/')) {
      const parts = path.split('/');
      const source = parts[2];
      const endpoint = parts[3];
      return getMockMetadata(source, endpoint) as unknown as T;
    }

    // UC001 Execution Mock
    if (path === '/usecase/UC_001/execute' && method === 'POST') {
      return {
        insight: "Analysis complete. Marketing variance (+45k) is driven by Q1 campaign overspend. R&D favorability (-12k) is due to delayed hiring in the architecture team.",
        results: {
          actual: 1200000,
          budget: 1150000,
          variance: 50000,
        }
      } as unknown as T;
    }
  }

  const url = new URL(path.startsWith('/') ? path.slice(1) : path, BASE_URL);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (res.status === 401) {
      clearToken();
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    if (!res.ok) {
      const error = await res.json().catch(() => ({ detail: res.statusText }));
      throw error;
    }

    return res.json();
  } catch (err) {
    // [BACKEND_INTEGRATION]: This is a 'fail-over' mock. If the real backend call 
    // fails (e.g. connection refused), it tries to serve mock data as a last resort.
    // Turn off USE_MOCKS to see real network errors.
    if (!USE_MOCKS) throw err;

    // Last-resort fallback for metadata if fetch fails (connection refused, etc.)
    if (path.startsWith('/metadata/')) {
      const parts = path.split('/');
      return getMockMetadata(parts[2], parts[3]) as unknown as T;
    }

    throw err;
  }
}

// ── Utilities ────────────────────────────────────────────────

const MAX_ROWS = 500;

function truncateData<T>(data: T[]): T[] {
  if (data.length > MAX_ROWS) {
    console.warn(`Data truncated to ${MAX_ROWS} rows.`);
    return data.slice(0, MAX_ROWS);
  }
  return data;
}

// ── Auth ─────────────────────────────────────────────────────

export const auth = {
  register: (data: {
    email: string;
    app_password: string;
    full_name: string;
    sap_username: string;
    sap_password: string;
  }) => request<{ user_id: string; email: string; message: string }>(
    '/auth/register', { method: 'POST', body: data, auth: false }
  ),

  login: (email: string, app_password: string) =>
    request<{
      auth_token: string;
      user_id: string;
      full_name: string;
      role: 'admin' | 'user';
      default_company_code: string;
      default_currency: string;
    }>('/auth/login', { method: 'POST', body: { email, app_password }, auth: false }),

  logout: () =>
    request<{ message: string }>('/auth/logout', { method: 'POST', body: {} }),

  me: () =>
    request<{
      user_id: string;
      full_name: string;
      email: string;
      role: 'admin' | 'user';
      default_company_code: string;
      default_currency: string;
    }>('/auth/me'),
};

// ── Settings ─────────────────────────────────────────────────

export const settings = {
  get: () => request<Record<string, unknown>>('/settings'),

  update: (data: Record<string, unknown>) =>
    request<Record<string, unknown>>('/settings', { method: 'POST', body: data }),

  connectionStatus: () =>
    request<{
      connections: { source: string; connected: boolean; host: string }[];
      llm: { connected: boolean; model: string };
    }>('/settings/connection-status', { auth: false }),
};

// ── Metadata ─────────────────────────────────────────────────

export const metadata = {
  get: (source: string, endpoint: string, params?: Record<string, string>) =>
    request<{ value: string; label: string }[]>(
      `/metadata/${source}/${endpoint}`, { params }
    ),
};

// ── Sessions ─────────────────────────────────────────────────

export const sessions = {
  create: () =>
    request<{ session_id: string; created_at: string }>(
      '/sessions/new', { method: 'POST', body: {} }
    ),

  list: () =>
    request<{ session_id: string; created_at: string; last_active: string; preview: string }[]>(
      '/sessions'
    ),

  delete: (sessionId: string) =>
    request<{ message: string }>(`/sessions/${sessionId}`, { method: 'DELETE' }),

  history: (sessionId: string) =>
    request<{
      id: string;
      sequence_number: number;
      actor: 'user' | 'agent' | 'system';
      agent_type: string | null;
      content_type: string;
      content: Record<string, unknown>;
      created_at: string;
    }[]>(`/sessions/${sessionId}/history`),
};

// ── Chat ─────────────────────────────────────────────────────

export const chat = {
  send: (data: {
    session_id: string;
    message: string;
    agent_type: 'usecase' | 'select' | 'analyse' | 'knowledge';
    context_data?: { table_data?: Record<string, unknown>[]; columns?: string[] };
  }) => request<Record<string, unknown>>('/chat', { method: 'POST', body: data }),

  context: (data: {
    session_id: string;
    usecase_id: string;
    result_summary: string;
    key_data: Record<string, unknown>;
  }) => request<{ insight: string }>('/chat/context', { method: 'POST', body: data }),

  assist: (data: {
    session_id: string;
    agent_type: 'usecase' | 'select';
    usecase_id?: string;
    current_params: Record<string, unknown>;
    missing_params: string[];
    message: string;
  }) => request<{
    message: string;
    updated_params: Record<string, unknown>;
    still_missing: string[];
  }>('/chat/assist', { method: 'POST', body: data }),
};

// ── Use Cases ────────────────────────────────────────────────

export const usecase = {
  schema: (usecaseId: string) =>
    request<Record<string, unknown>>(`/usecase/${usecaseId}/schema`),

  execute: async (usecaseId: string, data: Record<string, unknown>) => {
    const res = await request<any>(`/usecase/${usecaseId}/execute`, { method: 'POST', body: data });
    if (res.results) {
      Object.keys(res.results).forEach(key => {
        if (Array.isArray(res.results[key].data)) {
          res.results[key].data = truncateData(res.results[key].data);
        }
      });
    }
    return res;
  },
};

// ── Query Builder ────────────────────────────────────────────

export const query = {
  execute: async (data: {
    session_id: string;
    service_url: string;
    entity_set: string;
    odata_version: 'V2' | 'V4';
    parameter_set?: string;
    nav_property?: string;
    parameters?: Record<string, string>;
    filters?: Record<string, string>;
    select?: string[];
    top?: number;
  }) => {
    const res = await request<{
      url: string;
      count: number;
      error: string | null;
      data: Record<string, unknown>[];
    }>('/query/execute', { method: 'POST', body: data });

    if (res.data) {
      res.data = truncateData(res.data);
    }
    return res;
  },

  valueHelp: (params: { service_url: string; collection_path: string; top?: string }) =>
    request<{
      url: string;
      count: number;
      error: string | null;
      data: Record<string, unknown>[];
    }>('/query/value-help', { params: params as Record<string, string> }),
};
