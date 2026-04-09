import type { ReactNode } from 'react';

interface SectionCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: string;
}

/**
 * Standard content card used across use-case result panels.
 * Applies the design system's surface + ghost-border pattern.
 */
export function SectionCard({ children, className = '', title, icon }: SectionCardProps) {
  return (
    <div className={`bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 ${className}`}>
      {title && (
        <div className="flex items-center gap-2 mb-4">
          {icon && <span className="icon text-primary">{icon}</span>}
          <h3 className="text-sm font-bold text-on-surface">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
}
