import ReactMarkdown from 'react-markdown';
import type { AgentResult } from '../../types/usecase';
import { fmtCurrency, fmtPct, statusChipVariant, dimKey, humanize } from '../../utils/format';
import { VarianceValue } from '../../components/ui/VarianceValue';
import { SectionCard } from '../../components/ui/SectionCard';
import { Accordion } from '../../components/ui/Accordion';
import { KPICard } from '../../components/charts/KPICard';
import { BarChart } from '../../components/charts/BarChart';
import { DataTable } from '../../components/charts/DataTable';
import Chip from '../../components/ui/Chip';

interface AgentDimensionPanelProps {
  /** The agent to display — pass a single agent, tab selection is handled by the parent */
  agent: AgentResult;
  usecaseId: string;
  className?: string;
}

/**
 * Detail view for a single agent dimension — reusable across any use case.
 * Renders: statistical KPI row, top-variance bar chart, data table, narrative.
 * Tab selection is controlled by the parent component.
 */
export function AgentDimensionPanel({ agent, usecaseId, className = '' }: AgentDimensionPanelProps) {
  return (
    <div className={`space-y-6 animate-in fade-in duration-500 ${className}`}>
      {/* Stat KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <KPICard compact title="Total Amount" value={fmtCurrency(agent.statistical_summary.total_amount)} icon="payments" />
        <KPICard compact title="Mean" value={fmtCurrency(agent.statistical_summary.mean)} icon="calculate" />
        <KPICard compact title="Std Dev" value={fmtCurrency(agent.statistical_summary.std_dev)} icon="show_chart" />
        <KPICard compact title="Min Variance" value={fmtCurrency(agent.statistical_summary.min)} icon="arrow_downward" />
        <KPICard compact title="Max Variance" value={fmtCurrency(agent.statistical_summary.max)} icon="arrow_upward" />
      </div>

      {/* Top variance bar chart */}
      <SectionCard title={`Top Variances — ${agent.agent_name}`}>
        <BarChart
          data={[...agent.data]
            .sort((a, b) => Math.abs(b.variance) - Math.abs(a.variance))
            .slice(0, 10)
            .map(r => ({
              category: r[dimKey(agent.dimension)] || r.gl_account,
              variance: r.variance,
            }))}
          categoryKey="category"
          series={[{ key: 'variance', color: '#1A4D2E', name: 'Variance' }]}
          height={320}
          valueFormatter={fmtCurrency}
        />
      </SectionCard>

      {/* Data table */}
      <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
        <DataTable
          subtitle={humanize(agent.dimension)}
          title="Detail Records"
          data={agent.data.map((r, i) => ({ _id: i, ...r }))}
          columns={[
            { key: 'gl_account', label: 'GL Account', sortable: true, filterable: true },
            { key: dimKey(agent.dimension), label: humanize(agent.dimension), sortable: true, filterable: true },
            {
              key: 'amount_period_1', label: 'Period A', align: 'right' as const, sortable: true,
              render: (v: number) => fmtCurrency(v),
            },
            {
              key: 'amount_period_2', label: 'Period B', align: 'right' as const, sortable: true,
              render: (v: number) => fmtCurrency(v),
            },
            {
              key: 'variance', label: 'Variance', align: 'right' as const, sortable: true,
              render: (v: number) => <VarianceValue value={v} formatter={fmtCurrency} />,
            },
            {
              key: 'variance_pct', label: 'Var %', align: 'right' as const, sortable: true,
              render: (v: number) => <VarianceValue value={v} formatter={fmtPct} />,
            },
            {
              key: 'status', label: 'Status',
              render: (v: string) => <Chip label={v} variant={statusChipVariant(v)} />,
            },
          ]}
          enableSearch
          enableSorting
          enableExport
          exportFilename={`${usecaseId}_${agent.dimension}`}
          rowsPerPage={10}
        />
      </div>

      {/* Narrative accordion */}
      <Accordion
        items={[{
          id: 'narrative',
          title: `${agent.agent_name} — Full Narrative Analysis`,
          icon: 'article',
          content: (
            <div className="narrative-prose p-4">
              <ReactMarkdown>{agent.narrative}</ReactMarkdown>
            </div>
          ),
        }]}
      />
    </div>
  );
}
