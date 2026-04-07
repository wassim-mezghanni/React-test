import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionState {
  sessionId: string | null;
  setSessionId: (id: string | null) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      sessionId: null,
      setSessionId: (id) => set({ sessionId: id }),
      clearSession: () => set({ sessionId: null }),
    }),
    {
      name: 'querai-session-storage',
    }
  )
);
