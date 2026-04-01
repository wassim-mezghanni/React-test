import { useState } from 'react';
import { SearchInput } from '../components/ui/SearchInput.tsx';

export interface NavbarUser {
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface NavbarProps {
  user?: NavbarUser;
}

export default function Navbar({ user }: NavbarProps) {
  const [search, setSearch] = useState('');
  const initials = user
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : '?';

  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl h-14 grid grid-cols-[auto_1fr_auto] items-center px-4 border-b border-outline-variant/10">
      {/* Left — Brand */}
      <div className="flex items-center">
        <span className="text-xl font-black tracking-tighter text-primary font-heading">Querai</span>
      </div>

      {/* Center — Search (centered, 45% width) */}
      <div className="hidden md:flex justify-center px-8">
        <div className="w-[45%] min-w-[280px]">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Right — User */}
      <div className="flex items-center justify-end gap-6">
        {/* User Profile */}
        {user && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-on-surface leading-tight font-headline">{user.name}</p>
              <p className="text-[10px] text-outline leading-tight font-label">{user.email}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden ring-2 ring-surface-container-low">
              {user.avatarUrl ? (
                <img alt={user.name} src={user.avatarUrl} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-container text-on-primary text-xs font-bold font-headline">
                  {initials}
                </div>
              )}
            </div>
            <button className="text-outline hover:text-primary transition-colors">
              <span className="icon text-lg">expand_more</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
