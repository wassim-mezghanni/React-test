import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import UseCaseLayout from '../UseCaseLayout';
import SchemaRenderer from '../SchemaRenderer';
import type { UseCaseSchema, UseCaseResult, AgentResult, AccountRow } from '../../../types/usecase';
import Tabs from '../../../components/ui/Tabs';
import { Accordion } from '../../../components/ui/Accordion';
import { KPICard } from '../../../components/charts/KPICard';
import { BarChart } from '../../../components/charts/BarChart';
import { DataTable } from '../../../components/charts/DataTable';
import { DonutChart } from '../../../components/charts/DonutChart';
import Chip from '../../../components/ui/Chip';

import schemaJson from './uc_001_schema.json';
import resultJson from './uc_001_result.json';

// Build schema from JSON
const UC001_SCHEMA: UseCaseSchema = {
  id: schemaJson.usecase_id,
  name: schemaJson.name,
  description: schemaJson.description,
  fields: [],
  sections: schemaJson.sections.map((s) => ({
    id: s.id,
    label: s.label,
    fields: s.fields.map((f: any) => ({
      id: f.id,
      label: f.label,
      type: f.type,
      required: f.required,
      source: f.source,
      default: f.default,
      placeholder: f.placeholder,
      options: f.options,
      fields: f.fields?.map((sf: any) => ({
        id: sf.id,
        label: sf.label,
        type: sf.type,
        required: sf.required,
        source: sf.source,
        default: sf.default,
      })),
    })),
  })),
};

const MOCK_RESULT = resultJson as unknown as UseCaseResult;

// Helpers
const fmtCurrency = (v: number) => {
  const abs = Math.abs(v);
  if (abs >= 1_000_000) return `${v < 0 ? '-' : ''}$${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${v < 0 ? '-' : ''}$${(abs / 1_000).toFixed(1)}K`;
  return `$${v.toLocaleString()}`;
};

const fmtPct = (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`;

const statusColor = (s: string) => {
  switch (s) {
    case 'New': return 'primary';
    case 'Removed': return 'error';
    default: return 'surface';
  }
};

// Dimension key helper for agent data
const dimKey = (dimension: string) => {
  switch (dimension) {
    case 'CostCenter': return 'cost_center';
    case 'ProfitCenter': return 'profit_center';
    case 'Customer': return 'customer';
    case 'Supplier': return 'supplier';
    case 'DocumentType': return 'document_type';
    default: return dimension.toLowerCase();
  }
};

export default function UC001() {
  const { state } = useLocation();
  const [formValues, setFormValues] = useState<Record<string, any>>(state?.prefilled || {});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');
  const [activeAgentTab, setActiveAgentTab] = useState(MOCK_RESULT.agent_results[0]?.dimension || '');

  const handleExecute = () => {
    setErrors({});
    setSubmitted(true);
  };

  const result = submitted ? MOCK_RESULT : null;
  const activeAgent: AgentResult | undefined = result?.agent_results.find(a => a.dimension === activeAgentTab);

  // Top flagged accounts
  const flaggedAccounts = result?.accounts.filter(a => a.flagged) || [];

  // Build stat summary data for donut
  const donutData = result?.agent_results.map((a, i) => ({
    id: a.dimension,
    name: a.dimension.replace(/([A-Z])/g, ' $1').trim(),
    value: a.records_fetched,
    color: ['#1A4D2E', '#2E7D52', '#4CAF50', '#81C784', '#A5D6A7'][i % 5],
  })) || [];

  return (
    <UseCaseLayout
      title="Financial Variance Analysis"
      usecaseId="UC_001"
      sidebar={
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-[10px] font-bold text-outline uppercase tracking-wider mb-2">About</h3>
            <p className="text-[12px] text-on-surface-variant leading-relaxed">
              {UC001_SCHEMA.description}
            </p>
          </div>

          {/* AI Insight */}
          {result && (
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 animate-in fade-in duration-500">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Result Summary</h3>
              <p className="text-[12px] text-on-surface-variant leading-relaxed">
                {result.result_summary}
              </p>
            </div>
          )}

          {/* Flagged Accounts */}
          {flaggedAccounts.length > 0 && (
            <div className="space-y-3 animate-in fade-in duration-700">
              <h3 className="text-[10px] font-bold text-error uppercase tracking-wider px-1">
                <span className="icon text-[14px] mr-1 align-middle">flag</span>
                {result?.flagged_count} Flagged Account{result?.flagged_count !== 1 ? 's' : ''}
              </h3>
              <div className="space-y-2">
                {flaggedAccounts.map((a) => (
                  <div key={a.gl_account} className="px-3 py-2 bg-error/5 rounded-lg border border-error/10">
                    <div className="text-[11px] font-bold text-on-surface">{a.gl_account}</div>
                    <div className="text-[10px] text-on-surface-variant truncate">{a.gl_account_name}</div>
                    <div className="text-[10px] text-error font-semibold mt-0.5">
                      {fmtCurrency(a.absolute_difference_amount)} ({fmtPct(a.relative_difference_amount)})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-outline uppercase tracking-wider px-1">Active Filters</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(formValues).map(([k, v]) => (
                v && (
                  <div key={k} className="px-2 py-1 bg-surface-container-high rounded-md text-[10px] font-medium text-on-surface-variant border border-outline-variant/10">
                    <span className="text-outline">{k}:</span> {String(v)}
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      }
    >
      {/* Parameter Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-on-surface font-heading">Analysis Parameters</h2>
          <button
            onClick={handleExecute}
            className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 cursor-pointer"
          >
            {submitted ? 'Re-run Analysis' : 'Run Analysis'}
          </button>
        </div>

        <SchemaRenderer
          schema={UC001_SCHEMA}
          values={formValues}
          errors={errors}
          onChange={(id, val) => setFormValues(prev => ({ ...prev, [id]: val }))}
        />
      </section>

      {/* Results Section */}
      {result && (
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <KPICard
              title="Total Variance"
              value={fmtCurrency(result.agent_results[0]?.statistical_summary.total_amount || 0)}
              icon="trending_down"
              trend={{ value: -100 }}
            />
            <KPICard
              title="Flagged Accounts"
              value={result.flagged_count}
              icon="flag"
              trend={{ value: result.flagged_count }}
            />
            <KPICard
              title="Dimensions Analyzed"
              value={result.agent_results.length}
              icon="hub"
            />
            <KPICard
              title="Total Records"
              value={result.agent_results.reduce((s, a) => s + a.records_fetched, 0)}
              icon="database"
            />
          </div>

          {/* Main Tabs */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-outline-variant/10 pb-2">
              <h2 className="text-lg font-bold text-on-surface font-heading">Execution Results</h2>
              <Tabs
                activeTabId={activeTab}
                onChange={setActiveTab}
                tabs={[
                  { id: 'summary', label: 'Executive Summary', icon: 'description' },
                  { id: 'agents', label: 'Dimension Analysis', icon: 'hub' },
                  { id: 'accounts', label: 'GL Accounts', icon: 'account_balance' },
                  { id: 'charts', label: 'Charts', icon: 'bar_chart' },
                ]}
                variant="pill"
                className="w-auto"
              />
            </div>

            {/* SUMMARY TAB */}
            {activeTab === 'summary' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                {/* Executive Summary */}
                <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="icon text-primary">auto_awesome</span>
                    <h3 className="text-sm font-bold text-on-surface">Executive Root Cause Summary</h3>
                  </div>
                  <div className="prose prose-sm max-w-none text-on-surface-variant text-[13px] leading-relaxed whitespace-pre-line">
                    {result.executive_summary.replace(/^###\s.*\n\n?/m, '')}
                  </div>
                </div>

                {/* CRO Summary */}
                <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="icon text-primary">monitoring</span>
                    <h3 className="text-sm font-bold text-on-surface">CRO / Revenue Intelligence Summary</h3>
                  </div>
                  <div className="prose prose-sm max-w-none text-on-surface-variant text-[13px] leading-relaxed">
                    {result.cro_summary}
                  </div>
                </div>

                {/* Agent Key Findings */}
                <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="icon text-primary">psychology</span>
                    <h3 className="text-sm font-bold text-on-surface">Agent Key Findings</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.agent_results.map((agent) => (
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
                </div>

                {/* Records distribution donut */}
                <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
                  <h3 className="text-sm font-bold text-on-surface mb-4">Records by Dimension</h3>
                  <DonutChart
                    data={donutData}
                    centerLabel="Total Records"
                    centerValue={result.agent_results.reduce((s, a) => s + a.records_fetched, 0)}
                    height={260}
                  />
                </div>
              </div>
            )}

            {/* AGENTS TAB */}
            {activeTab === 'agents' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                {/* Agent dimension tabs */}
                <Tabs
                  activeTabId={activeAgentTab}
                  onChange={setActiveAgentTab}
                  tabs={result.agent_results.map(a => ({
                    id: a.dimension,
                    label: a.dimension.replace(/([A-Z])/g, ' $1').trim(),
                    icon: 'smart_toy',
                  }))}
                  variant="pill"
                />

                {activeAgent && (
                  <div className="space-y-6">
                    {/* Agent stats */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <KPICard title="Total Amount" value={fmtCurrency(activeAgent.statistical_summary.total_amount)} icon="payments" />
                      <KPICard title="Mean" value={fmtCurrency(activeAgent.statistical_summary.mean)} icon="calculate" />
                      <KPICard title="Std Dev" value={fmtCurrency(activeAgent.statistical_summary.std_dev)} icon="show_chart" />
                      <KPICard title="Min Variance" value={fmtCurrency(activeAgent.statistical_summary.min)} icon="arrow_downward" />
                      <KPICard title="Max Variance" value={fmtCurrency(activeAgent.statistical_summary.max)} icon="arrow_upward" />
                    </div>

                    {/* Variance bar chart — top 10 by absolute variance */}
                    <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
                      <h3 className="text-sm font-bold text-on-surface mb-4">Top Variances — {activeAgent.agent_name}</h3>
                      <BarChart
                        data={[...activeAgent.data]
                          .sort((a, b) => Math.abs(b.variance) - Math.abs(a.variance))
                          .slice(0, 10)
                          .map(r => ({
                            category: r[dimKey(activeAgent.dimension)] || r.gl_account,
                            variance: r.variance,
                          }))}
                        categoryKey="category"
                        series={[{ key: 'variance', color: '#1A4D2E', name: 'Variance' }]}
                        height={320}
                        valueFormatter={fmtCurrency}
                      />
                    </div>

                    {/* Data table */}
                    <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10">
                      <DataTable
                        title={<span className="text-sm font-bold">{activeAgent.agent_name} — Detail Records</span>}
                        data={activeAgent.data.map((r, i) => ({ _id: i, ...r }))}
                        columns={[
                          { key: 'gl_account', label: 'GL Account', sortable: true, filterable: true },
                          { key: dimKey(activeAgent.dimension), label: activeAgent.dimension.replace(/([A-Z])/g, ' $1').trim(), sortable: true, filterable: true },
                          { key: 'amount_period_1', label: 'Period A', align: 'right' as const, sortable: true, render: (v: number) => fmtCurrency(v) },
                          { key: 'amount_period_2', label: 'Period B', align: 'right' as const, sortable: true, render: (v: number) => fmtCurrency(v) },
                          { key: 'variance', label: 'Variance', align: 'right' as const, sortable: true, render: (v: number) => (
                            <span className={v < 0 ? 'text-error' : v > 0 ? 'text-primary' : ''}>{fmtCurrency(v)}</span>
                          )},
                          { key: 'variance_pct', label: 'Var %', align: 'right' as const, sortable: true, render: (v: number) => (
                            <span className={v < 0 ? 'text-error' : v > 0 ? 'text-primary' : ''}>{fmtPct(v)}</span>
                          )},
                          { key: 'status', label: 'Status', render: (v: string) => <Chip label={v} variant={statusColor(v) as any} /> },
                        ]}
                        enableSearch
                        enableSorting
                        enableExport
                        exportFilename={`uc001_${activeAgent.dimension}`}
                        rowsPerPage={10}
                      />
                    </div>

                    {/* Narrative */}
                    <Accordion
                      items={[{
                        id: 'narrative',
                        title: `${activeAgent.agent_name} — Full Narrative Analysis`,
                        icon: 'article',
                        content: (
                          <div className="prose prose-sm max-w-none text-on-surface-variant text-[13px] leading-relaxed whitespace-pre-line p-4">
                            {activeAgent.narrative}
                          </div>
                        ),
                      }]}
                    />
                  </div>
                )}
              </div>
            )}

            {/* ACCOUNTS TAB */}
            {activeTab === 'accounts' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10">
                  <DataTable<AccountRow & { _id: number }>
                    title={<span className="text-sm font-bold">GL Account Balances — {result.accounts.length} accounts</span>}
                    data={result.accounts.map((a, i) => ({ _id: i, ...a }))}
                    columns={[
                      { key: 'gl_account', label: 'GL Account', sortable: true, filterable: true },
                      { key: 'gl_account_name', label: 'Account Name', sortable: true, filterable: true },
                      { key: 'period_balance_amount', label: 'Period A', align: 'right', sortable: true, render: (v: number) => fmtCurrency(v) },
                      { key: 'comparison_period_balance_amount', label: 'Period B', align: 'right', sortable: true, render: (v: number) => fmtCurrency(v) },
                      { key: 'absolute_difference_amount', label: 'Abs. Diff', align: 'right', sortable: true, render: (v: number) => (
                        <span className={v < 0 ? 'text-error' : v > 0 ? 'text-primary' : ''}>{fmtCurrency(v)}</span>
                      )},
                      { key: 'relative_difference_amount', label: 'Rel. Diff %', align: 'right', sortable: true, render: (v: number) => (
                        <span className={v < 0 ? 'text-error' : v > 0 ? 'text-primary' : ''}>{fmtPct(v)}</span>
                      )},
                      { key: 'flagged', label: 'Flagged', align: 'center', sortable: true, render: (v: boolean) =>
                        v ? <span className="icon text-error text-lg">flag</span> : <span className="text-outline">—</span>
                      },
                    ]}
                    enableSearch
                    searchPlaceholder="Search GL account or name..."
                    enableSorting
                    enableExport
                    exportFilename="uc001_gl_accounts"
                    enableFilter
                    rowsPerPage={15}
                  />
                </div>
              </div>
            )}

            {/* CHARTS TAB */}
            {activeTab === 'charts' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                {/* Variance by Account - Period comparison */}
                <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
                  <h3 className="text-sm font-bold text-on-surface mb-4">Flagged GL Accounts — Period Comparison</h3>
                  <BarChart
                    data={flaggedAccounts.map(a => ({
                      account: `${a.gl_account}\n${a.gl_account_name.slice(0, 20)}`,
                      'Period A': a.period_balance_amount,
                      'Period B': a.comparison_period_balance_amount,
                    }))}
                    categoryKey="account"
                    series={[
                      { key: 'Period A', color: '#1A4D2E', name: 'Period A' },
                      { key: 'Period B', color: '#81C784', name: 'Period B' },
                    ]}
                    height={350}
                    valueFormatter={fmtCurrency}
                  />
                </div>

                {/* Absolute Difference chart */}
                <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
                  <h3 className="text-sm font-bold text-on-surface mb-4">Absolute Difference — Flagged Accounts</h3>
                  <BarChart
                    data={flaggedAccounts.map(a => ({
                      account: a.gl_account,
                      difference: a.absolute_difference_amount,
                    }))}
                    categoryKey="account"
                    series={[{ key: 'difference', color: '#E53935', name: 'Absolute Difference' }]}
                    height={300}
                    valueFormatter={fmtCurrency}
                  />
                </div>

                {/* Agent records donut */}
                <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
                  <h3 className="text-sm font-bold text-on-surface mb-4">Records Fetched by Agent</h3>
                  <DonutChart
                    data={donutData}
                    centerLabel="Total"
                    centerValue={result.agent_results.reduce((s, a) => s + a.records_fetched, 0)}
                    height={280}
                    valueFormatter={(v) => `${v} records`}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </UseCaseLayout>
  );
}
