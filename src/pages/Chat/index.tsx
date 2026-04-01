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
          {/* Pulsing Aurora Visual */}
          <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
            {/* The Sovereign Orbit Visual */}
            <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 200 200" fill="none">
              {/* AI Core Glow */}
              <circle cx="100" cy="100" r="45" className="fill-primary/5 animate-core-pulse" />
              <circle cx="100" cy="100" r="35" className="fill-primary/10 animate-core-pulse" style={{ animationDelay: '-3s' }} />
              
              {/* Orbital Paths */}
              <g className="opacity-20">
                <ellipse cx="100" cy="100" rx="85" ry="32" stroke="currentColor" className="text-primary animate-orbit-fade" strokeWidth="0.5" transform="rotate(-12 100 100)" />
                <ellipse cx="100" cy="100" rx="65" ry="42" stroke="currentColor" className="text-primary animate-orbit-fade" strokeWidth="0.5" transform="rotate(25 100 100)" />
              </g>

              {/* Orbiting Pearls */}
              <g transform="rotate(-12 100 100)">
                <circle r="3.5" className="fill-primary shadow-ambient">
                  <animateMotion 
                    dur="10s" 
                    repeatCount="indefinite" 
                    path="M 15,100 a 85,32 0 1,0 170,0 a 85,32 0 1,0 -170,0"
                  />
                </circle>
              </g>
              <g transform="rotate(25 100 100)">
                <circle r="2.5" className="fill-primary-container shadow-ambient">
                  <animateMotion 
                    dur="14s" 
                    repeatCount="indefinite" 
                    path="M 35,100 a 65,42 0 1,0 130,0 a 65,42 0 1,0 -130,0"
                    begin="-7s"
                  />
                </circle>
              </g>
            </svg>
            
            {/* Central Icon Container (AI Core) */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-surface-container-lowest border border-outline-variant shadow-ambient flex items-center justify-center overflow-hidden transition-transform duration-700 hover:scale-105 active:scale-95 cursor-pointer group">
               <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
               <div className="relative z-10 w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center group-hover:bg-primary-container/30 transition-colors">
                 <span className="icon text-primary text-2xl animate-pulse">auto_awesome</span>
               </div>
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

