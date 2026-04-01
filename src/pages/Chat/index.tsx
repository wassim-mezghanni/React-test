import AppLayout from '../../layouts/AppLayout.tsx';
import { ChatInput, type AttachedFile } from '../../components/ui/ChatInput.tsx';
import type { NavbarUser } from '../../layouts/Navbar.tsx';

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

export default function Chat({ user }: ChatProps) {
  const greeting = getGreeting();
  const userName = user?.name ?? 'Wassim M';

  return (
    <AppLayout activeNavId="chat" user={user}>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 flex flex-col items-center">
          {/* Pulsing Aurora Visual */}
          <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
            {/* Drifting/Rotating Background Glows */}
            <div className="absolute inset-0 animate-aurora-rotate">
              <div className="absolute top-0 left-0 w-full h-full rounded-full blur-3xl opacity-30 bg-primary animate-aurora-pulse" />
              <div className="absolute top-0 left-0 w-full h-full rounded-full blur-2xl opacity-20 bg-[#008080] animate-aurora-pulse" style={{ animationDelay: '-10s' }} />
            </div>

            {/* Central Icon Container */}
            <div className="relative w-20 h-20 rounded-full bg-surface-container-lowest border border-outline-variant shadow-ambient flex items-center justify-center overflow-hidden transition-transform duration-700 hover:scale-105 active:scale-95 cursor-pointer group">
              {/* Aurora Color Shift Layer */}
              <div className="absolute inset-0 opacity-30 mix-blend-soft-light animate-aurora-color" />
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

