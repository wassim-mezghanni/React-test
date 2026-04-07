import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewProjectModal } from '../components/ui/NewProjectModal.tsx';
import { ContextActions, type ContextAction } from '../components/ui/ContextActions.tsx';
import { availableUseCases } from '../mocks/usecaseMock.ts';

const navRoutes: Record<string, string> = {
  dashboard: '/',
  chat: '/chat',
  selection: '/selection',
  tables: '/tables',
  library: '/library',
  workflows: '/workflows',
  settings: '/settings',
};

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
  onRemoveProject?: (id: string) => void;
  onRemoveChat?: (id: string) => void;
  onMoveChatToProject?: (chatId: string) => void;
  className?: string;
}

const defaultNavItems: SidebarNavItem[] = [
  { id: 'dashboard', icon: 'grid_view', label: 'Dashboard' },
  { id: 'chat', icon: 'chat_bubble', label: 'Chat' },
  { id: 'selection', icon: 'checklist', label: 'Selection' },
  { id: 'tables', icon: 'table_rows', label: 'Tables' },
  { id: 'library', icon: 'style', label: 'Library' },
  { id: 'analytics', icon: 'leaderboard', label: 'Analytics' },
  { id: 'settings', icon: 'settings', label: 'Settings' },
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
  onRemoveProject,
  onRemoveChat,
  onMoveChatToProject,
  className = '',
}: SidebarProps) {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState<'projects' | 'usecases'>('projects');
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuConfig, setMenuConfig] = useState<{
    id: string;
    position: { top: number; left: number };
    actions: ContextAction[]
  } | null>(null);

  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    () => new Set(projects.filter(p => p.expanded).map(p => p.id))
  );

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.children?.some(c => c.label.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredChats = chats.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUseCases = availableUseCases.filter(uc =>
    uc.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uc.category.toLowerCase().includes(searchQuery.toLowerCase())
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
          const route = navRoutes[item.id] ?? '/';

          return (
            <button
              key={item.id}
              title={item.label}
              onClick={() => { navigate(route); onNavChange?.(item.id); }}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${isActive
                ? 'bg-primary-container/15 text-primary/80'
                : 'text-outline/40 hover:text-primary/70 hover:bg-primary-container/10'
                }`}
            >
              <span className="icon text-xl">{item.icon}</span>
            </button>
          );
        })}

        <div className="my-2 w-6 border-t border-outline-variant/10" />

        {/* Use Cases Toggle */}
        <button
          title="Use Cases"
          onClick={() => setActivePanel(activePanel === 'usecases' ? 'projects' : 'usecases')}
          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${activePanel === 'usecases'
            ? 'bg-primary-container/20 text-primary shadow-sm'
            : 'text-outline/40 hover:text-primary/70 hover:bg-primary-container/10'
            }`}
        >
          <span className="icon text-xl">apps</span>
        </button>

        {/* Bottom icons */}
        <div className="mt-auto flex flex-col items-center gap-3 pb-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-outline/40 hover:text-primary/70 hover:bg-primary-container/10 transition-colors">
            <span className="icon text-xl">help</span>
          </button>
        </div>
      </aside>

      {/* Side Panel */}
      <aside className="w-56 fixed left-[50px] top-14 h-[calc(100vh-56px)] z-30 bg-white/40 backdrop-blur-sm border-r border-outline-variant/10 flex flex-col p-4">
        {/* Panel Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-on-surface font-headline">
            {activePanel === 'projects' ? panelTitle : 'Use Cases'}
          </h2>
          {activePanel === 'projects' && (
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
          )}
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <span className="icon absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
          <input
            className="w-full bg-surface-container-low/50 border border-outline-variant/10 rounded-lg py-1.5 pl-8 pr-3 text-xs font-label focus:outline-none focus:bg-surface-container-lowest focus:border-primary/20 transition-all"
            placeholder={activePanel === 'projects' ? 'Search Projects' : 'Search Use Cases'}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-1 sidebar-scroll">
          {activePanel === 'projects' ? (
            <>
              {/* Project Folders */}
              {filteredProjects.map(project => {
                const isExpanded = expandedProjects.has(project.id);
                return (
                  <div
                    key={project.id}
                    className={isExpanded
                      ? 'bg-primary-container/10 rounded-lg p-2 border border-primary-container/5'
                      : 'p-2 hover:bg-surface-container-low/50 rounded-lg cursor-pointer transition-colors'
                    }
                  >
                    <div
                      className="flex items-center justify-between group cursor-pointer relative"
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

                      <div className="flex items-center gap-1">
                        {project.children && project.children.length > 0 && (
                          <span className={`icon text-sm text-outline transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                            expand_more
                          </span>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const rect = e.currentTarget.getBoundingClientRect();
                            setMenuConfig({
                              id: project.id,
                              position: { top: rect.bottom + 4, left: rect.left },
                              actions: [
                                { id: 'remove', label: 'Remove Project', icon: 'delete', danger: true, onClick: () => onRemoveProject?.(project.id) }
                              ]
                            });
                          }}
                          className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-surface-container-highest opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <span className="icon text-sm text-outline">more_horiz</span>
                        </button>
                      </div>
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
              {filteredChats.length > 0 && (
                <>
                  <div className="px-2 mb-2 mt-4">
                    <h3 className="text-[10px] font-bold text-outline uppercase tracking-wider font-label">Chats</h3>
                  </div>
                  {filteredChats.map(chat => (
                    <div key={chat.id} className="relative group">
                      <button
                        onClick={() => onChatSelect?.(chat.id)}
                        className="w-full text-left p-2 hover:bg-surface-container-low/50 rounded-lg cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div>
                          <p className="text-[12px] font-medium text-on-surface-variant font-label">{chat.title}</p>
                          <p className="text-[9px] text-outline font-label">{chat.time}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const rect = e.currentTarget.getBoundingClientRect();
                            setMenuConfig({
                              id: chat.id,
                              position: { top: rect.bottom + 4, left: rect.left },
                              actions: [
                                { id: 'move', label: 'Add to Project', icon: 'create_new_folder', onClick: () => onMoveChatToProject?.(chat.id) },
                                { id: 'remove', label: 'Remove Chat', icon: 'delete', danger: true, onClick: () => onRemoveChat?.(chat.id) }
                              ]
                            });
                          }}
                          className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-surface-container-highest opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <span className="icon text-sm text-outline">more_horiz</span>
                        </button>
                      </button>
                    </div>
                  ))}
                </>
              )}
            </>
          ) : (
            /* Use Cases List */
            <div className="space-y-4 pt-2">
              {filteredUseCases.map(uc => (
                <button
                  key={uc.id}
                  onClick={() => navigate(`/usecase/${uc.id}`)}
                  className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-primary-container/10 transition-all group text-left border border-transparent hover:border-primary-container/20 shadow-sm hover:shadow-md"
                >
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-surface-container-high flex items-center justify-center group-hover:bg-primary-container/20 transition-colors">
                    <span className="icon text-[20px] text-primary" style={{ color: uc.color }}>{uc.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-[12px] font-bold text-on-surface truncate pr-1">
                        {uc.label}
                      </p>
                      {uc.status && (
                        <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${uc.status === 'New' ? 'bg-primary text-white' : 'bg-secondary-container text-on-secondary-container'
                          }`}>
                          {uc.status}
                        </span>
                      )}
                    </div>
                    <p className="text-[9px] text-outline uppercase font-bold tracking-tight opacity-70">
                      {uc.category}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {((activePanel === 'projects' && filteredProjects.length === 0 && filteredChats.length === 0) ||
            (activePanel === 'usecases' && filteredUseCases.length === 0)) && searchQuery && (
              <div className="p-4 text-center">
                <p className="text-[11px] text-outline font-label">No results for "{searchQuery}"</p>
              </div>
            )}
        </div>

        {menuConfig && (
          <ContextActions
            actions={menuConfig.actions}
            position={menuConfig.position}
            onClose={() => setMenuConfig(null)}
          />
        )}
      </aside>

      <NewProjectModal
        open={newProjectOpen}
        onClose={() => setNewProjectOpen(false)}
        onCreate={(project) => console.log('New project:', project)}
      />
    </div>
  );
}
