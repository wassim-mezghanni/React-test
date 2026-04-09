import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { chatApi } from '../services/chatService';

interface SessionState {
  sessionId: string | null;
  activeSidebarPanel: 'projects' | 'usecases';
  setSessionId: (id: string | null) => void;
  setActiveSidebarPanel: (panel: 'projects' | 'usecases') => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      sessionId: null,
      activeSidebarPanel: 'projects',
      setSessionId: (id) => set({ sessionId: id }),
      setActiveSidebarPanel: (panel) => set({ activeSidebarPanel: panel }),
      clearSession: () => set({ sessionId: null }),
    }),
    {
      name: 'querai-session-storage',
    }
  )
);

// ── Chat Messages Store ──

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  pushMessage: (role: 'user' | 'assistant', content: string) => void;
  clearMessages: () => void;
  sendMessageToApi: (message: string, agentType: string) => Promise<void>;
}

const DEFAULT_GREETING: ChatMessage = {
  id: 'greeting',
  role: 'assistant',
  content: 'Hi! How can I help you today?',
  timestamp: new Date(),
};

export const useChatStore = create<ChatState>()((set, get) => ({
  messages: [DEFAULT_GREETING],
  isLoading: false,
  pushMessage: (role, content) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { id: crypto.randomUUID(), role, content, timestamp: new Date() },
      ],
    })),
  clearMessages: () => set({ messages: [DEFAULT_GREETING] }),
  
  sendMessageToApi: async (message: string, agentType: string) => {
    get().pushMessage('user', message);
    set({ isLoading: true });

    try {
      let currentSessionId = useSessionStore.getState().sessionId;
      if (!currentSessionId) {
         currentSessionId = await chatApi.createSession();
         useSessionStore.getState().setSessionId(currentSessionId);
      }

      const response = await chatApi.sendMessage(currentSessionId, message, agentType);

      switch(response.type) {
         case "answer":
            get().pushMessage('assistant', response.message);
            break;
         case "redirect":
            get().pushMessage('assistant', response.corner_message);
            break;
         case "analysis":
            get().pushMessage('assistant', response.response);
            break;
         case "select_redirect":
            get().pushMessage('assistant', "Redirecting to Selection UI...");
            break;
         default:
            get().pushMessage('assistant', "Unexpected response from server.");
      }
    } catch (e) {
      get().pushMessage('assistant', "⚠️ Error connecting to Querai engine. Please try again.");
    } finally {
      set({ isLoading: false });
    }
  }
}));
