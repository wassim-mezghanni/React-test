import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { SectionCard } from './SectionCard';

interface NarrativeCardProps {
  title: string;
  icon?: string;
  children: string;
  className?: string;
}

/**
 * A card that renders markdown narrative content.
 * Used for executive summaries, CRO insights, agent narratives, etc.
 */
export function NarrativeCard({ title, icon, children, className = '' }: NarrativeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const needsExpansion = children.trim().length > 400;

  return (
    <SectionCard title={title} icon={icon} className={className}>
      <div className={`relative transition-all duration-300 ${!isExpanded && needsExpansion ? 'max-h-[180px] overflow-hidden' : ''}`}>
        <div className="narrative-prose pb-2">
          <ReactMarkdown>{children}</ReactMarkdown>
        </div>

        {/* Gradient blur over text when collapsed */}
        {!isExpanded && needsExpansion && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface-container-low via-surface-container-low/80 to-transparent pointer-events-none" />
        )}
      </div>

      {needsExpansion && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-surface-container-high/50 hover:bg-surface-container-highest transition-colors text-xs font-bold text-primary cursor-pointer active:scale-95"
        >
          <span>{isExpanded ? 'Read less' : 'Read more'}</span>
          <span className="icon text-[16px]">{isExpanded ? 'expand_less' : 'expand_more'}</span>
        </button>
      )}
    </SectionCard>
  );
}
