import type { ReactNode } from 'react';
import AppLayout from '../../layouts/AppLayout.tsx';
import { sidebarProjects, sidebarChats } from '../../mocks/sidebarMock.ts';
import { useAuth } from '../../contexts/AuthContext.tsx';

interface UseCaseLayoutProps {
  children: ReactNode;
  sidebar: ReactNode; // The chat/context sidebar
  title: string;
  usecaseId: string;
}

export default function UseCaseLayout({
  children,
  sidebar,
  title,
  usecaseId,
}: UseCaseLayoutProps) {
  const { user } = useAuth();

  return (
    <AppLayout
      activeNavId="chat"
      user={user ? { name: user.name, email: user.email } : undefined}
      projects={sidebarProjects}
      chats={sidebarChats}
    >
      <div className="flex flex-col h-[calc(100vh-56px)] overflow-hidden">
        {/* Header bar within the page */}
        <header className="h-14 border-b border-outline-variant/10 flex items-center justify-between px-8 bg-surface-container-lowest/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-container/20 flex items-center justify-center">
              <span className="icon text-primary text-xl">apps</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-on-surface font-headline">{title}</h1>
              <p className="text-[10px] text-outline font-label uppercase tracking-wider">{usecaseId}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-outline hover:text-primary transition-colors cursor-pointer">
              <span className="icon text-[18px]">history</span>
              <span>Execution History</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-primary bg-primary-container/10 hover:bg-primary-container/20 transition-colors cursor-pointer">
              <span className="icon text-[18px]">save</span>
              <span>Save Session</span>
            </button>
          </div>
        </header>

        {/* Content Area with its own Sidebar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Chat/Context Sidebar */}
          <aside className="w-[320px] border-r border-outline-variant/10 bg-surface-container-low/30 backdrop-blur-sm overflow-y-auto sidebar-scroll">
            {sidebar}
          </aside>

          {/* Main Content (Form / Tabs) */}
          <main className="flex-1 overflow-y-auto bg-surface-container-lowest p-8 sidebar-scroll">
            <div className="max-w-5xl mx-auto space-y-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AppLayout>
  );
}
