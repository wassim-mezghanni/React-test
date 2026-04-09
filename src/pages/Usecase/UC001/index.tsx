import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import UseCaseLayout from '../UseCaseLayout';
import SchemaRenderer from '../SchemaRenderer';
import { parseSchemaJson } from '../utils';
import { UseCaseSidebar } from '../UseCaseSidebar';
import { AgentDimensionPanel } from '../AgentDimensionPanel';
import { AgentFindingsGrid } from '../AgentFindingsGrid';
import type { UseCaseResult, AccountRow } from '../../../types/usecase';
import { fmtCurrency, fmtPct, humanize } from '../../../utils/format';
import { VarianceValue } from '../../../components/ui/VarianceValue';
import { SectionCard } from '../../../components/ui/SectionCard';
import { NarrativeCard } from '../../../components/ui/NarrativeCard';
import Tabs from '../../../components/ui/Tabs';
import { KPICard } from '../../../components/charts/KPICard';
import { BarChart } from '../../../components/charts/BarChart';
import { DataTable } from '../../../components/charts/DataTable';
import { DonutChart } from '../../../components/charts/DonutChart';

import schemaJson from './uc_001_schema.json';
import resultJson from './uc_001_result.json';

const UC001_SCHEMA = parseSchemaJson(schemaJson);
const MOCK_RESULT = resultJson as unknown as UseCaseResult;

const AGENT_COLORS = ['#1A4D2E', '#2E7D52', '#4CAF50', '#81C784', '#A5D6A7'];

type View = 'parameters' | 'results';

export default function UC001() {
  const { state } = useLocation();
  const [formValues, setFormValues] = useState<Record<string, string | number | boolean>>(state?.prefilled || {});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [view, setView] = useState<View>('parameters');
  const [activeTab, setActiveTab] = useState('summary');

  const handleExecute = () => {
    setErrors({});
    setView('results');
  };

  const result = view === 'results' ? MOCK_RESULT : null;
  const flaggedAccounts = result?.accounts.filter(a => a.flagged) || [];

  const donutData = result?.agent_results.map((a, i) => ({
    id: a.dimension,
    name: humanize(a.dimension),
    value: a.records_fetched,
    color: AGENT_COLORS[i % AGENT_COLORS.length],
  })) || [];

  return (
    <UseCaseLayout
      title={UC001_SCHEMA.name}
      usecaseId={UC001_SCHEMA.id}
      sidebar={
        <UseCaseSidebar
          description={UC001_SCHEMA.description}
          result={result}
          formValues={formValues}
        />
      }
    >
      {/* Parameter Section */}
      {view === 'parameters' && (
        <section className="space-y-4 animate-in fade-in duration-500">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-on-surface font-heading">Analysis Parameters</h2>
            <button
              onClick={handleExecute}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 cursor-pointer"
            >
              <span className="icon text-lg">play_arrow</span>
              Run Analysis
            </button>
          </div>

          <SchemaRenderer
            schema={UC001_SCHEMA}
            values={formValues}
            errors={errors}
            onChange={(id, val) => setFormValues(prev => ({ ...prev, [id]: val }))}
          />
        </section>
      )}

      {/* Results Section */}
      {result && view === 'results' && (
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-on-surface font-heading">Execution Results</h2>
            <button
              onClick={() => setView('parameters')}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 cursor-pointer"
            >
              <span className="icon text-lg">tune</span>
              Edit Parameters
            </button>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <KPICard
              title="Total Variance"
              value={fmtCurrency(result.agent_results[0]?.statistical_summary.total_amount || 0)}
              icon="trending_down"
              trend={{ value: -100 }}
            />
            <KPICard title="Flagged Accounts" value={result.flagged_count} icon="flag" trend={{ value: result.flagged_count }} />
            <KPICard title="Dimensions Analyzed" value={result.agent_results.length} icon="hub" />
            <KPICard title="Total Records" value={result.agent_results.reduce((s, a) => s + a.records_fetched, 0)} icon="database" />
          </div>

          {/* Main Tabs */}
          <div className="space-y-6">
            <div className="border-b border-outline-variant/10 pb-2">
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
                <NarrativeCard title="Executive Root Cause Summary" icon="auto_awesome">
                  {result.executive_summary.replace(/^###\s.*\n\n?/m, '')}
                </NarrativeCard>

                <NarrativeCard title="CRO / Revenue Intelligence Summary" icon="monitoring">
                  {result.cro_summary}
                </NarrativeCard>

                <AgentFindingsGrid agents={result.agent_results} />

                <SectionCard title="Records by Dimension">
                  <DonutChart
                    data={donutData}
                    centerLabel="Total Records"
                    centerValue={result.agent_results.reduce((s, a) => s + a.records_fetched, 0)}
                    height={260}
                  />
                </SectionCard>
              </div>
            )}

            {/* AGENTS TAB */}
            {activeTab === 'agents' && (
              <AgentDimensionPanel agents={result.agent_results} usecaseId="uc001" />
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
                      {
                        key: 'absolute_difference_amount', label: 'Abs. Diff', align: 'right', sortable: true,
                        render: (v: number) => <VarianceValue value={v} formatter={fmtCurrency} />,
                      },
                      {
                        key: 'relative_difference_amount', label: 'Rel. Diff %', align: 'right', sortable: true,
                        render: (v: number) => <VarianceValue value={v} formatter={fmtPct} />,
                      },
                      {
                        key: 'flagged', label: 'Flagged', align: 'center', sortable: true,
                        render: (v: boolean) => v
                          ? <span className="icon text-error text-lg">flag</span>
                          : <span className="text-outline">—</span>,
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
                <SectionCard title="Flagged GL Accounts — Period Comparison">
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
                </SectionCard>

                <SectionCard title="Absolute Difference — Flagged Accounts">
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
                </SectionCard>

                <SectionCard title="Records Fetched by Agent">
                  <DonutChart
                    data={donutData}
                    centerLabel="Total"
                    centerValue={result.agent_results.reduce((s, a) => s + a.records_fetched, 0)}
                    height={280}
                    valueFormatter={(v) => `${v} records`}
                  />
                </SectionCard>
              </div>
            )}
          </div>
        </section>
      )}
    </UseCaseLayout>
  );
}
