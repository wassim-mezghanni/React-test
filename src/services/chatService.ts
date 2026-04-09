import { getToken } from './api';

// Fallback if auth is not implemented, we can mock token

// Define the response types from Qai API Contract
type Confidence = "high" | "medium" | "low";

interface ChatResponseAnswer {
  type: "answer";
  message: string;
}

interface PrefillValue {
  value: unknown;
  confidence: Confidence | null;
}

interface ChatResponseRedirect {
  type: "redirect";
  usecase_id: "uc_001" | "uc_002" | "uc_003";
  prefilled: Record<string, PrefillValue>;
  missing: string[];
  corner_message: string;
}

interface ChatResponseSelectRedirect {
  type: "select_redirect";
  service_url: string;
  entity_set: string;
  selected_fields?: string[];
  filters?: Record<string, string>;
  missing_filters?: string[];
}

interface ChatResponseAnalysis {
  type: "analysis";
  response: string;
  rows_analysed: number;
}

type ChatResponse =
  | ChatResponseAnswer
  | ChatResponseRedirect
  | ChatResponseSelectRedirect
  | ChatResponseAnalysis;

const BASE_URL = 'http://localhost:8080'; // For live connection later

export const chatApi = {
  async createSession(): Promise<string> {
    // ---- LIVE CONNECTIVITY (commented out for now) ----
    
    const token = getToken();
    const res = await fetch(`${BASE_URL}/sessions/new`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data.session_id;
    

    // // ---- MOCK CONNECTIVITY ----
    // return new Promise((resolve) => {
    //   setTimeout(() => resolve(crypto.randomUUID()), 500);
    // });
  },

  async sendMessage(_sessionId: string, message: string, agentType: string): Promise<ChatResponse> {
    // ---- LIVE CONNECTIVITY (commented out for now) ----
    
    const token = getToken();
    const res = await fetch(`${BASE_URL}/chat`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            session_id: _sessionId,
            message: message,
            agent_type: agentType
        })
    });
    
    if (!res.ok) throw new Error('Chat failed');
    return await res.json();
    

    // ---- MOCK CONNECTIVITY ----
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     const lowerMsg = message.toLowerCase();
        
    //     // Mocking logic to simulate the discriminated union contract
    //     if (agentType === 'usecase' && (lowerMsg.includes('analyse') || lowerMsg.includes('variance'))) {
    //       resolve({
    //         type: "redirect",
    //         usecase_id: "uc_001",
    //         corner_message: "Opening Variance Analysis! I've prefilled the period parameters for you.",
    //         prefilled: {
    //           "period_from": { value: "01", confidence: "high" },
    //           "period_to": { value: "12", confidence: "high" }
    //         },
    //         missing: ["company_code", "fiscal_year"]
    //       });
    //     } 
    //     else if (agentType === 'select') {
    //       resolve({
    //         type: "select_redirect",
    //         service_url: "API_GLACCOUNTINITEM",
    //         entity_set: "GLAccountItemSet"
    //       });
    //     }
    //     else if (agentType === 'analysis') {
    //       resolve({
    //         type: "analysis",
    //         response: "Based on the table on screen, I observed anomalies in 4 GL accounts. The structural variance primarily originates from unmapped capital expenditures.",
    //         rows_analysed: 120
    //       });
    //     } 
    //     else {
    //       resolve({
    //         type: "answer",
    //         message: `I'm using the ${agentType} agent. This is a standard conversational answer based on your request: "${message}".`
    //       });
    //     }
    //   }, 1200); // Simulate network latency
    // });
  }
};
