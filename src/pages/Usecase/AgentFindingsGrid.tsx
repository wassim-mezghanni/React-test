import type { AgentResult } from '../../types/usecase';
import Chip from '../../components/ui/Chip';
import { SectionCard } from '../../components/ui/SectionCard';

interface AgentFindingsGridProps {
  agents: AgentResult[];
  className?: string;
}

/**
 * Grid of agent key-finding cards with record count and confidence chips.
 * Reusable across any use case that returns agent_results.
 */
export function AgentFindingsGrid({ agents, className = '' }: AgentFindingsGridProps) {
  return (
    <SectionCard title="Agent Key Findings" icon="psychology" className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {agents.map((agent) => (
          <div
            key={agent.dimension}
            className="flex items-start gap-3 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="icon text-primary text-lg">smart_toy</span>
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-on-surface">{agent.agent_name}</div>
              <div className="text-[11px] text-on-surface-variant mt-0.5 line-clamp-2">
                {agent.key_finding}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Chip label={`${agent.records_fetched} records`} variant="surface" />
                <Chip
                  label={agent.confidence}
                  variant={agent.confidence === 'high' ? 'primary' : 'secondary'}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
