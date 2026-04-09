import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import type { AgentResult } from '../../types/usecase';
import { fmtCurrency, fmtPct, statusChipVariant, dimKey, humanize } from '../../utils/format';
import { VarianceValue } from '../../components/ui/VarianceValue';
import { SectionCard } from '../../components/ui/SectionCard';
import Tabs from '../../components/ui/Tabs';
import { Accordion } from '../../components/ui/Accordion';
import { KPICard } from '../../components/charts/KPICard';
import { BarChart } from '../../components/charts/BarChart';
import { DataTable } from '../../components/charts/DataTable';
import Chip from '../../components/ui/Chip';

interface AgentDimensionPanelProps {
  agents: AgentResult[];
  usecaseId: string;
  className?: string;
}

/**
 * Full "Dimension Analysis" panel — reusable across any use case
 * that returns agent_results[]. Renders:
 *   - Dimension sub-tabs
 *   - Statistical KPI row
 *   - Top-variance bar chart
 *   - Full data table with search/sort/export
 *   - Collapsible narrative accordion
 */
export function AgentDimensionPanel({ agents, usecaseId, className = '' }: AgentDimensionPanelProps) {
  const [activeTab, setActiveTab] = useState(agents[0]?.dimension || '');
  const active = agents.find(a => a.dimension === activeTab);

  if (!agents.length) return null;

  return (
    <div className={`space-y-6 animate-in fade-in duration-500 ${className}`}>
      {/* Dimension sub-tabs */}
      <Tabs
        activeTabId={activeTab}
        onChange={setActiveTab}
        tabs={agents.map(a => ({
          id: a.dimension,
          label: humanize(a.dimension),
          icon: 'smart_toy',
        }))}
        variant="pill"
      />

      {active && (
        <div className="space-y-6">
          {/* Stat KPI row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <KPICard title="Total Amount" value={fmtCurrency(active.statistical_summary.total_amount)} icon="payments" />
            <KPICard title="Mean" value={fmtCurrency(active.statistical_summary.mean)} icon="calculate" />
            <KPICard title="Std Dev" value={fmtCurrency(active.statistical_summary.std_dev)} icon="show_chart" />
            <KPICard title="Min Variance" value={fmtCurrency(active.statistical_summary.min)} icon="arrow_downward" />
            <KPICard title="Max Variance" value={fmtCurrency(active.statistical_summary.max)} icon="arrow_upward" />
          </div>

          {/* Top variance bar chart */}
          <SectionCard title={`Top Variances — ${active.agent_name}`}>
            <BarChart
              data={[...active.data]
                .sort((a, b) => Math.abs(b.variance) - Math.abs(a.variance))
                .slice(0, 10)
                .map(r => ({
                  category: r[dimKey(active.dimension)] || r.gl_account,
                  variance: r.variance,
                }))}
              categoryKey="category"
              series={[{ key: 'variance', color: '#1A4D2E', name: 'Variance' }]}
              height={320}
              valueFormatter={fmtCurrency}
            />
          </SectionCard>

          {/* Data table */}
          <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10">
            <DataTable
              title={<span className="text-sm font-bold">{active.agent_name} — Detail Records</span>}
              data={active.data.map((r, i) => ({ _id: i, ...r }))}
              columns={[
                { key: 'gl_account', label: 'GL Account', sortable: true, filterable: true },
                { key: dimKey(active.dimension), label: humanize(active.dimension), sortable: true, filterable: true },
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
              exportFilename={`${usecaseId}_${active.dimension}`}
              rowsPerPage={10}
            />
          </div>

          {/* Narrative accordion */}
          <Accordion
            items={[{
              id: 'narrative',
              title: `${active.agent_name} — Full Narrative Analysis`,
              icon: 'article',
              content: (
                <div className="narrative-prose p-4">
                  <ReactMarkdown>{active.narrative}</ReactMarkdown>
                </div>
              ),
            }]}
          />
        </div>
      )}
    </div>
  );
}
