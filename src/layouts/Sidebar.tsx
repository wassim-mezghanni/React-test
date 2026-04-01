import { useState } from 'react';
import { NewProjectModal } from '../components/ui/NewProjectModal.tsx';

export interface SidebarNavItem {
  id: string;
  icon: string;
  label: string;
}

export interface SidebarProject {
  id: string;
  name: string;
  subLabel?: string;
  expanded?: boolean;
  children?: { id: string; label: string }[];
}

export interface SidebarChat {
  id: string;
  title: string;
  time: string;
}

export interface SidebarProps {
  navItems?: SidebarNavItem[];
  activeNavId?: string;
  onNavChange?: (id: string) => void;
  projects?: SidebarProject[];
  chats?: SidebarChat[];
  panelTitle?: string;
  onChatSelect?: (id: string) => void;
  onProjectSelect?: (projectId: string, childId?: string) => void;
  className?: string;
}

const defaultNavItems: SidebarNavItem[] = [
  { id: 'dashboard', icon: 'grid_view', label: 'Dashboard' },
  { id: 'data', icon: 'home_storage', label: 'Data' },
  { id: 'chat', icon: 'chat_bubble', label: 'Chat' },
  { id: 'tables', icon: 'table_rows', label: 'Tables' },
  { id: 'analytics', icon: 'leaderboard', label: 'Analytics' },
  { id: 'workflows', icon: 'account_tree', label: 'Workflows' },
];

export default function Sidebar({
  navItems = defaultNavItems,
  activeNavId = 'chat',
  onNavChange,
  projects = [],
  chats = [],
  panelTitle = 'Projects',
  onChatSelect,
  onProjectSelect,
  className = '',
}: SidebarProps) {
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    () => new Set(projects.filter(p => p.expanded).map(p => p.id))
  );

  const toggleProject = (id: string) => {
    setExpandedProjects(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={`flex ${className}`}>
      {/* Icon Rail */}
      <aside className="fixed left-0 top-14 h-[calc(100vh-56px)] z-40 bg-white/80 backdrop-blur-md border-r border-outline-variant/10 flex flex-col items-center py-4 gap-3 w-[50px]">
        {navItems.map(item => {
          const isActive = item.id === activeNavId;
          return (
            <button
              key={item.id}
              title={item.label}
              onClick={() => onNavChange?.(item.id)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-container/15 text-primary/80'
                  : 'text-outline/40 hover:text-primary/70 hover:bg-primary-container/10'
              }`}
            >
              <span className="icon text-xl">{item.icon}</span>
            </button>
          );
        })}

        {/* Bottom icons */}
        <div className="mt-auto flex flex-col items-center gap-3 pb-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-outline/40 hover:text-primary/70 hover:bg-primary-container/10 transition-colors">
            <span className="icon text-xl">help</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-outline/40 hover:text-primary/70 hover:bg-primary-container/10 transition-colors">
            <span className="icon text-xl">settings</span>
          </button>
        </div>
      </aside>

      {/* Projects Panel */}
      <aside className="w-56 fixed left-[50px] top-14 h-[calc(100vh-56px)] z-30 bg-white/40 backdrop-blur-sm border-r border-outline-variant/10 flex flex-col p-4">
        {/* Panel Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-on-surface font-headline">{panelTitle}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setNewProjectOpen(true)}
              className="text-outline hover:text-primary transition-colors"
            >
              <span className="icon text-base">add</span>
            </button>
            <button className="text-outline hover:text-primary transition-colors">
              <span className="icon text-base">more_horiz</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <span className="icon absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
          <input
            className="w-full bg-surface-container-low/50 border border-outline-variant/10 rounded-lg py-1.5 pl-8 pr-3 text-xs font-label focus:outline-none focus:bg-surface-container-lowest focus:border-primary/20 transition-all"
            placeholder="Search"
            type="text"
          />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-1 sidebar-scroll">
          {/* Project Folders */}
          {projects.map(project => {
            const isExpanded = expandedProjects.has(project.id);
            return (
              <div
                key={project.id}
                className={isExpanded
                  ? 'bg-primary-container/20 rounded-lg p-2 border border-primary-container/10'
                  : 'p-2 hover:bg-surface-container-low/50 rounded-lg cursor-pointer transition-colors'
                }
              >
                <div
                  className="flex items-center justify-between group cursor-pointer"
                  onClick={() => {
                    if (project.children?.length) toggleProject(project.id);
                    onProjectSelect?.(project.id);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className={`icon text-base ${isExpanded ? 'text-primary' : 'text-outline'}`}>
                      {isExpanded ? 'folder_open' : 'folder'}
                    </span>
                    <div>
                      <p className={`text-[12px] font-semibold ${isExpanded ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                        {project.name}
                      </p>
                      {project.subLabel && (
                        <p className="text-[9px] text-outline">{project.subLabel}</p>
                      )}
                    </div>
                  </div>
                  {project.children && project.children.length > 0 && (
                    <span className={`icon text-sm text-outline transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  )}
                </div>

                {/* Children */}
                {isExpanded && project.children && (
                  <div className="ml-7 mt-2 space-y-2 border-l border-outline-variant/10 pl-3 py-1">
                    {project.children.map(child => (
                      <button
                        key={child.id}
                        onClick={() => onProjectSelect?.(project.id, child.id)}
                        className="block w-full text-left text-[11px] text-on-surface-variant hover:text-primary transition-colors font-label"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Separator */}
          {projects.length > 0 && chats.length > 0 && (
            <div className="my-4 border-t border-outline-variant/10" />
          )}

          {/* Standalone Chats */}
          {chats.length > 0 && (
            <>
              <div className="px-2 mb-2">
                <h3 className="text-[10px] font-bold text-outline uppercase tracking-wider font-label">Chats</h3>
              </div>
              {chats.map(chat => (
                <button
                  key={chat.id}
                  onClick={() => onChatSelect?.(chat.id)}
                  className="w-full text-left p-2 hover:bg-surface-container-low/50 rounded-lg cursor-pointer transition-colors"
                >
                  <p className="text-[12px] font-medium text-on-surface-variant font-label">{chat.title}</p>
                  <p className="text-[9px] text-outline font-label">{chat.time}</p>
                </button>
              ))}
            </>
          )}
        </div>
      </aside>

      <NewProjectModal
        open={newProjectOpen}
        onClose={() => setNewProjectOpen(false)}
        onCreate={(project) => console.log('New project:', project)}
      />
    </div>
  );
}
