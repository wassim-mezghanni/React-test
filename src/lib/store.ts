import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  pushMessage: (role: 'user' | 'assistant', content: string) => void;
  clearMessages: () => void;
}

const DEFAULT_GREETING: ChatMessage = {
  id: 'greeting',
  role: 'assistant',
  content: 'Hi! How can I help you today?',
  timestamp: new Date(),
};

export const useChatStore = create<ChatState>()((set) => ({
  messages: [DEFAULT_GREETING],
  pushMessage: (role, content) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { id: crypto.randomUUID(), role, content, timestamp: new Date() },
      ],
    })),
  clearMessages: () => set({ messages: [DEFAULT_GREETING] }),
}));
