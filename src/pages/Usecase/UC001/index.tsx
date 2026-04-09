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
import { useChatStore } from '../../../lib/store';

import schemaJson from './uc_001_schema.json';
import resultJson from './uc_001_result.json';

const UC001_SCHEMA = parseSchemaJson(schemaJson);
const MOCK_RESULT = resultJson as unknown as UseCaseResult;

type View = 'parameters' | 'results';

export default function UC001() {
  const { state } = useLocation();
  const [formValues, setFormValues] = useState<Record<string, string | number | boolean>>(state?.prefilled || {});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [view, setView] = useState<View>('parameters');
  const [activeTab, setActiveTab] = useState('gl_accounts');

  const pushMessage = useChatStore((state) => state.pushMessage);

  const handleExecute = () => {
    setErrors({});
    setView('results');
    // Ensure we don't duplicate the automated message if they click it multiple times in a row,
    // although for a mock this is fine.
    setTimeout(() => {
      pushMessage('assistant', MOCK_RESULT.result_summary);
    }, 500);
  };

  const result = view === 'results' ? MOCK_RESULT : null;
  const flaggedAccounts = result?.accounts.filter(a => a.flagged) || [];
  const activeAgent = result?.agent_results.find(a => a.dimension === activeTab);

  // Build unified tabs: GL Accounts + each agent dimension
  const dimensionTabs = result
    ? [
      { id: 'gl_accounts', label: 'GL Accounts', icon: 'account_balance' },
      ...result.agent_results.map(a => ({
        id: a.dimension,
        label: humanize(a.dimension),
        icon: 'smart_toy',
      })),
    ]
    : [];

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
      {/* ─── Parameter Section ─── */}
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

      {/* ─── Results Section ─── */}
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
              compact
              title="Total Variance"
              value={fmtCurrency(result.agent_results[0]?.statistical_summary.total_amount || 0)}
              icon="trending_down"
              trend={{ value: -100 }}
            />
            <KPICard title="Flagged Accounts" value={result.flagged_count} icon="flag" trend={{ value: result.flagged_count }} />
            <KPICard title="Dimensions Analyzed" value={result.agent_results.length} icon="hub" />
            <KPICard title="Total Records" value={result.agent_results.reduce((s, a) => s + a.records_fetched, 0)} icon="database" />
          </div>

          {/* Two-column: Narratives (left) + Chart (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left — Narrative cards */}
            <div className="space-y-6">
              <NarrativeCard title="Executive Root Cause Summary" icon="auto_awesome">
                {result.executive_summary.replace(/^###\s.*\n\n?/m, '')}
              </NarrativeCard>

              <NarrativeCard title="CRO / Revenue Intelligence Summary" icon="monitoring">
                {result.cro_summary}
              </NarrativeCard>
            </div>

            {/* Right — Period comparison chart */}
            <SectionCard title="Flagged GL Accounts — Period Comparison" className="h-fit">
              <BarChart
                data={flaggedAccounts.map(a => ({
                  account: `${a.gl_account} — ${a.gl_account_name.slice(0, 24)}`,
                  'Period A': a.period_balance_amount,
                  'Period B': a.comparison_period_balance_amount,
                }))}
                categoryKey="account"
                series={[
                  { key: 'Period A', color: '#1A4D2E', name: 'Period A' },
                  { key: 'Period B', color: '#81C784', name: 'Period B' },
                ]}
                height={380}
                valueFormatter={fmtCurrency}
              />
            </SectionCard>
          </div>

          {/* Agent Key Findings */}
          <AgentFindingsGrid agents={result.agent_results} />

          {/* Unified 6-tab panel: GL Accounts + 5 Dimensions */}
          <div className="space-y-6">
            <div className="border-b border-outline-variant/10 pb-2">
              <Tabs
                activeTabId={activeTab}
                onChange={setActiveTab}
                tabs={dimensionTabs}
                variant="pill"
              />
            </div>

            {/* GL Accounts tab */}
            {activeTab === 'gl_accounts' && (
              <div className="animate-in fade-in duration-500">
                <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
                  <DataTable<AccountRow & { _id: number }>
                    subtitle={`${result.accounts.length} accounts`}
                    title="GL Account Balances"
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

            {/* Dimension agent tabs */}
            {activeAgent && (
              <AgentDimensionPanel agent={activeAgent} usecaseId="uc001" />
            )}
          </div>
        </section>
      )}
    </UseCaseLayout>
  );
}
