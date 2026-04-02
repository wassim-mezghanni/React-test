import AppLayout from '../../layouts/AppLayout.tsx';
import { ChatInput, type AttachedFile } from '../../components/ui/ChatInput.tsx';
import type { NavbarUser } from '../../layouts/Navbar.tsx';
import { sidebarProjects, sidebarChats, defaultUser } from '../../mocks/sidebarMock.ts';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};


const suggestions = [
  'Analyze monthly payment variance',
  'upcoming customer payments',
  'Forecast my income for the year',
  'Compare Q1 versus Q2 revenue',
];

export interface ChatProps {
  user?: NavbarUser;
}

export default function Chat({ user = defaultUser }: ChatProps) {
  const greeting = getGreeting();
  const userName = user.name;

  return (
    <AppLayout
      activeNavId="chat"
      user={user}
      projects={sidebarProjects}
      chats={sidebarChats}
    >
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 flex flex-col items-center">
          {/* Sovereign Orbit Visual */}
          <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
            {/* Outer ambient glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 via-emerald-500/10 to-teal-500/10 blur-3xl animate-pulse" />

            {/* Sphere with spinning radial gradients */}
            <div className="relative w-24 h-24 rounded-full bg-white/5 backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(26,77,46,0.1)] flex items-center justify-center overflow-hidden group cursor-pointer transition-transform duration-700 hover:scale-105 active:scale-95">
              {/* Spinning gradient layers */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1A4D2E,transparent_60%)] mix-blend-screen opacity-40 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,#4F6F52,transparent_60%)] mix-blend-screen opacity-40 animate-[spin_15s_linear_infinite_reverse]" />

              {/* AI Core Icon */}
              <div className="relative z-10 w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center group-hover:bg-primary-container/30 transition-colors">
                <span className="icon text-primary text-2xl animate-pulse">auto_awesome</span>
              </div>

              {/* Rotating dashed ring */}
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.3" strokeDasharray="2 4" className="animate-[spin_25s_linear_infinite]" />
              </svg>
            </div>

            {/* Orbiting dot */}
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

        {/* Input Section */}
        <ChatInput
          suggestions={suggestions}
          onSend={(msg: string, files: AttachedFile[]) => console.log('Send:', msg, files)}
          className="w-full"
        />

      </div>
    </AppLayout>
  );
}

