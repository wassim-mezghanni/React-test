import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../layouts/AppLayout.tsx';
import { ChatInput, type AttachedFile, type ChatMode } from '../../components/ui/ChatInput.tsx';
import { Chip } from '../../components/ui/Chip.tsx';
import { sidebarProjects, sidebarChats } from '../../mocks/sidebarMock.ts';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { chat, sessions } from '../../services/api.ts';

// ── Types ────────────────────────────────────────────────────

interface Message {
  id: string;
  actor: 'user' | 'agent';
  type: 'text' | 'answer' | 'analysis' | 'redirect' | 'select_redirect';
  content: string;
  meta?: Record<string, unknown>;
}

// Map ChatInput mode → API agent_type
const MODE_TO_AGENT: Record<ChatMode, string> = {
  usecase: 'usecase',
  knowledge: 'knowledge',
  selection: 'select',
  analysis: 'analyse',
};

// ── Greeting ─────────────────────────────────────────────────

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

const suggestions = [
  'Analyze monthly payment variance',
  'Upcoming customer payments',
  'Forecast my income for the year',
  'Compare Q1 versus Q2 revenue',
];

// ── Message Renderer ─────────────────────────────────────────

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.actor === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[70%] px-4 py-3 rounded-2xl rounded-br-md bg-primary-container text-on-primary text-sm font-sans">
          {msg.content}
        </div>
      </div>
    );
  }

  // Agent messages
  switch (msg.type) {
    case 'analysis':
      return (
        <div className="flex justify-start">
          <div className="max-w-[70%] space-y-2">
            <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-surface-container-lowest text-on-surface text-sm font-sans">
              {msg.content}
            </div>
            <Chip
              label={`Analysed ${msg.meta?.rows_analysed ?? 0} rows`}
              icon="analytics"
              variant="secondary"
            />
          </div>
        </div>
      );

    case 'redirect':
      return (
        <div className="flex justify-start">
          <div className="max-w-[70%] px-4 py-3 rounded-2xl rounded-bl-md bg-surface-container-lowest text-on-surface text-sm font-sans space-y-2">
            <p>{msg.content}</p>
            <div className="flex items-center gap-2 pt-1">
              <Chip label={`UC: ${msg.meta?.usecase_id}`} icon="apps" variant="primary" />
              {(msg.meta?.missing as string[])?.length > 0 && (
                <Chip
                  label={`${(msg.meta?.missing as string[]).length} fields missing`}
                  icon="warning"
                  variant="outline"
                />
              )}
            </div>
          </div>
        </div>
      );

    case 'select_redirect':
      return (
        <div className="flex justify-start">
          <div className="max-w-[70%] px-4 py-3 rounded-2xl rounded-bl-md bg-surface-container-lowest text-on-surface text-sm font-sans space-y-2">
            <p>Opening Query Builder</p>
            <div className="flex items-center gap-2 pt-1">
              <Chip label={String(msg.meta?.entity_set ?? '')} icon="table_rows" variant="secondary" />
            </div>
          </div>
        </div>
      );

    default: // 'answer'
      return (
        <div className="flex justify-start">
          <div className="max-w-[70%] px-4 py-3 rounded-2xl rounded-bl-md bg-surface-container-lowest text-on-surface text-sm font-sans">
            {msg.content}
          </div>
        </div>
      );
  }
}

// ── Chat Page ────────────────────────────────────────────────

export default function Chat() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const userName = user?.name ?? 'there';
  const greeting = getGreeting();
  const hasMessages = messages.length > 0;

  // Create session on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('querai_session_id');
    if (stored) {
      setSessionId(stored);
      return;
    }
    sessions.create()
      .then(res => {
        setSessionId(res.session_id);
        sessionStorage.setItem('querai_session_id', res.session_id);
      })
      .catch(() => {
        // Fallback for when backend is down
        const fallback = crypto.randomUUID();
        setSessionId(fallback);
        sessionStorage.setItem('querai_session_id', fallback);
      });
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Send handler ─────────────────────────────────────────

  const handleSend = async (message: string, _files: AttachedFile[], mode: ChatMode) => {
    if (!message.trim() || !sessionId) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      actor: 'user',
      type: 'text',
      content: message,
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await chat.send({
        session_id: sessionId,
        message,
        agent_type: MODE_TO_AGENT[mode] as 'usecase' | 'select' | 'analyse' | 'knowledge',
      });

      const responseType = (res as { type?: string }).type ?? 'answer';

      const agentMsg: Message = {
        id: crypto.randomUUID(),
        actor: 'agent',
        type: responseType as Message['type'],
        content: '',
        meta: res,
      };

      switch (responseType) {
        case 'answer':
          agentMsg.content = (res as { message?: string }).message ?? '';
          break;

        case 'analysis':
          agentMsg.content = (res as { response?: string }).response ?? '';
          agentMsg.meta = { rows_analysed: (res as { rows_analysed?: number }).rows_analysed };
          break;

        case 'redirect': {
          const r = res as { corner_message?: string; usecase_id?: string; prefilled?: unknown; missing?: string[] };
          agentMsg.content = r.corner_message ?? 'Opening use case...';
          agentMsg.meta = { usecase_id: r.usecase_id, missing: r.missing };
          // Navigate after a short delay so the user sees the message
          setTimeout(() => {
            navigate(`/usecase/${r.usecase_id}`, {
              state: { prefilled: r.prefilled, missing: r.missing, session_id: sessionId },
            });
          }, 1500);
          break;
        }

        case 'select_redirect': {
          const s = res as { entity_set?: string; service_url?: string; selected_fields?: string[]; filters?: unknown };
          agentMsg.content = 'Opening Query Builder...';
          agentMsg.meta = { entity_set: s.entity_set };
          setTimeout(() => {
            navigate('/selection', {
              state: { service_url: s.service_url, entity_set: s.entity_set, selected_fields: s.selected_fields, filters: s.filters, session_id: sessionId },
            });
          }, 1500);
          break;
        }
      }

      setMessages(prev => [...prev, agentMsg]);
    } catch {
      // Fallback when backend is unreachable
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        actor: 'agent',
        type: 'answer',
        content: 'Sorry, I couldn\'t reach the server. Please try again.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  // ── Render ───────────────────────────────────────────────

  return (
    <AppLayout
      activeNavId="chat"
      user={user ? { name: user.name, email: user.email } : undefined}
      projects={sidebarProjects}
      chats={sidebarChats}
    >
      {!hasMessages ? (
        /* Empty state — greeting + centered input */
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-8 py-12">
          <div className="text-center mb-12 flex flex-col items-center">
            {/* Sovereign Orbit Visual */}
            <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 via-emerald-500/10 to-teal-500/10 blur-3xl animate-pulse" />
              <div className="relative w-24 h-24 rounded-full bg-white/5 backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(26,77,46,0.1)] flex items-center justify-center overflow-hidden group cursor-pointer transition-transform duration-700 hover:scale-105 active:scale-95">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1A4D2E,transparent_60%)] mix-blend-screen opacity-40 animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,#4F6F52,transparent_60%)] mix-blend-screen opacity-40 animate-[spin_15s_linear_infinite_reverse]" />
                <div className="relative z-10 w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center group-hover:bg-primary-container/30 transition-colors">
                  <span className="icon text-primary text-2xl animate-pulse">auto_awesome</span>
                </div>
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.3" strokeDasharray="2 4" className="animate-[spin_25s_linear_infinite]" />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="orbiting-dot w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(26,77,46,0.4)]" />
              </div>
            </div>

            <h1 className="text-4xl font-heading font-extrabold text-on-surface tracking-tight mb-2">
              {greeting}, {userName}
            </h1>
            <p className="text-2xl font-heading font-bold text-primary-container tracking-tight">
              How Can I Assist You Today?
            </p>
          </div>

          <ChatInput
            suggestions={suggestions}
            onSend={handleSend}
            disabled={loading}
            className="w-full"
          />
        </div>
      ) : (
        /* Conversation view — messages + bottom-pinned input */
        <div className="flex flex-col min-h-[calc(100vh-56px)]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
            {messages.map(msg => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-surface-container-lowest text-outline text-sm">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-outline/40 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-outline/40 animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-outline/40 animate-bounce [animation-delay:0.3s]" />
                  </span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Pinned input */}
          <div className="sticky bottom-0 bg-surface/80 backdrop-blur-md px-8 py-4 border-t border-outline-variant/10">
            <ChatInput
              onSend={handleSend}
              disabled={loading}
              className="w-full"
            />
          </div>
        </div>
      )}
    </AppLayout>
  );
}
