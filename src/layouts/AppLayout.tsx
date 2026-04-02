import type { ReactNode } from 'react';
import Navbar, { type NavbarUser } from './Navbar.tsx';
import Sidebar, { type SidebarProps } from './Sidebar.tsx';
import { ChatBubble } from '../components/ui/ChatBubble.tsx';

export interface AppLayoutProps extends SidebarProps {
  children: ReactNode;
  footer?: ReactNode;
  user?: NavbarUser;
}

export default function AppLayout({
  children,
  footer,
  user,
  ...sidebarProps
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar user={user} />
      <Sidebar {...sidebarProps} />

      {/* Main Content — offset by navbar (56px) + icon rail (50px) + panel (14rem) */}
      <main className="pt-14 ml-[calc(50px+14rem)] min-h-screen">
        {children}
      </main>

      <ChatBubble />

      {/* Footer */}
      {footer !== undefined ? footer : (
        <footer className="ml-[calc(50px+14rem)] border-t border-outline-variant/10 py-4 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-[10px] text-outline font-label font-medium">
              &copy; 2026 Querai.
            </span>
            <div className="flex gap-6">
              <span className="text-[10px] text-outline hover:text-primary transition-colors cursor-pointer font-label">Privacy Policy</span>
              <span className="text-[10px] text-outline hover:text-primary transition-colors cursor-pointer font-label">Terms of Service</span>
              <span className="text-[10px] text-outline hover:text-primary transition-colors cursor-pointer font-label">Security</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
