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
  return (
    <SectionCard title={title} icon={icon} className={className}>
      <div className="narrative-prose">
        <ReactMarkdown>{children}</ReactMarkdown>
      </div>
    </SectionCard>
  );
}
