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
