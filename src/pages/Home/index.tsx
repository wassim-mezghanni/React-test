import { useNavigate } from 'react-router-dom';
import AppLayout from '../../layouts/AppLayout.tsx';
import { Card } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { KPICard } from '../../components/charts/KPICard.tsx';
import { LineChart } from '../../components/charts/LineChart.tsx';
import { BarChart } from '../../components/charts/BarChart.tsx';
import { DataTable, type ColumnDef } from '../../components/charts/DataTable.tsx';
import { sidebarProjects, sidebarChats, defaultUser } from '../../mocks/sidebarMock.ts';
import {
  revenueData,
  postingActivityData,
  companyComparisonData,
  recentTransactions,
  analysisSessions,
  aiInsights,
  type RecentTransaction,
} from '../../mocks/dashboardMock.ts';

const transactionColumns: ColumnDef<RecentTransaction>[] = [
  {
    key: 'date',
    label: 'Date',
    sortable: true,
    render: (val: string) => <span className="text-xs text-on-surface-variant">{val}</span>,
  },
  {
    key: 'docNumber',
    label: 'Document',
    render: (val: string) => <span className="font-mono text-xs">{val}</span>,
  },
  {
    key: 'companyName',
    label: 'Company',
    sortable: true,
  },
  {
    key: 'docType',
    label: 'Type',
    render: (val: string) => (
      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-tight bg-surface-container-high text-on-surface-variant">
        {val}
      </span>
    ),
  },
  {
    key: 'amount',
    label: 'Amount',
    align: 'right',
    sortable: true,
    csvValue: (val: number) => val.toFixed(2),
    render: (val: number, row: RecentTransaction) => (
      <span className={`font-heading font-extrabold ${row.type === 'debit' ? 'text-primary-container' : 'text-error'}`}>
        {row.type === 'credit' ? '-' : ''}{val.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        <span className="text-[10px] font-bold text-on-surface-variant ml-1">{row.currency}</span>
      </span>
    ),
  },
];

const statusStyles: Record<string, string> = {
  completed: 'bg-primary-container/15 text-primary-container',
  running: 'bg-tertiary-container/15 text-tertiary',
  queued: 'bg-surface-container-high text-on-surface-variant',
};

const severityStyles: Record<string, { bg: string; border: string; icon: string }> = {
  warning: { bg: 'bg-[#FFF3E0]', border: 'border-[#FF9800]/20', icon: 'text-[#E65100]' },
  error: { bg: 'bg-error/5', border: 'border-error/15', icon: 'text-error' },
  success: { bg: 'bg-primary-container/5', border: 'border-primary-container/15', icon: 'text-primary-container' },
  info: { bg: 'bg-primary/5', border: 'border-primary/15', icon: 'text-primary' },
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <AppLayout
      activeNavId="dashboard"
      projects={sidebarProjects}
      chats={sidebarChats}
      user={defaultUser}
    >
      <div className="p-8 pb-20 max-w-[1400px] mx-auto">
        {/* Header */}
        <header className="mb-10">
          <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-2 block font-heading">
            SAP Command Center
          </span>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-on-surface font-heading tracking-tighter mb-2">
                Dashboard
              </h1>
              <p className="text-on-surface-variant max-w-xl leading-relaxed">
                Real-time overview of SAP Financial postings, AI-driven anomaly detection, and operational intelligence.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" icon="refresh" onClick={() => window.location.reload()}>
                Refresh
              </Button>
              <Button variant="primary" icon="add" onClick={() => navigate('/selection')}>
                New Analysis
              </Button>
            </div>
          </div>
        </header>

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <KPICard
            title="Open Documents"
            icon="description"
            value="924"
            trend={{ value: 12.3, label: 'vs last period' }}
            description={<p>Across all company codes</p>}
          />
          <KPICard
            title="Pending Approvals"
            icon="pending_actions"
            value="47"
            trend={{ value: -8.5, label: 'vs last period' }}
            description={<p>Awaiting authorization</p>}
          />
          <KPICard
            title="Reconciliation Rate"
            icon="verified"
            value="96.4%"
            trend={{ value: 2.1, label: 'vs last period' }}
            description={<p>Intercompany matching</p>}
          />
          <KPICard
            title="Anomalies Detected"
            icon="psychology"
            value="3"
            trend={{ value: -25.0, label: 'vs last period' }}
            description={<p>AI-flagged this period</p>}
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Revenue Trend */}
            <Card className="p-8 group hover:shadow-[0_10px_40px_-10px_rgba(26,77,46,0.15)] transition-shadow duration-500">
              <header className="mb-8">
                <span className="text-[10px] font-bold tracking-[0.2em] text-outline uppercase mb-1 block font-heading">
                  Revenue Trend
                </span>
                <div className="flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-on-surface font-heading tracking-tight">
                    6-Month Performance
                  </h3>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary-container font-heading">+37.9%</p>
                    <p className="text-xs text-on-surface-variant font-medium">Nov 2025 — Apr 2026</p>
                  </div>
                </div>
              </header>
              <LineChart
                data={revenueData}
                xAxisKey="month"
                series={[{ key: 'revenue', color: '#1A4D2E', name: 'Revenue' }]}
                yAxisFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
              />
            </Card>

            {/* G/L Posting Activity */}
            <Card className="p-8 group hover:shadow-[0_10px_40px_-10px_rgba(26,77,46,0.15)] transition-shadow duration-500">
              <header className="mb-8">
                <span className="text-[10px] font-bold tracking-[0.2em] text-outline uppercase mb-1 block font-heading">
                  Posting Volume
                </span>
                <div className="flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-on-surface font-heading tracking-tight">
                    G/L Posting Activity by Company Code
                  </h3>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary-container font-heading">924</p>
                    <p className="text-xs text-on-surface-variant font-medium">Total documents</p>
                  </div>
                </div>
              </header>
              <BarChart
                data={postingActivityData}
                categoryKey="company"
                layout="horizontal"
                series={[
                  { key: 'SA', color: '#1A4D2E', name: 'G/L Account' },
                  { key: 'DZ', color: '#366847', name: 'Payment' },
                  { key: 'RE', color: '#5A8A6A', name: 'Invoice' },
                  { key: 'KR', color: '#8BB09A', name: 'Credit Memo' },
                  { key: 'AB', color: '#B8D4C4', name: 'Clearing' },
                ]}
              />
            </Card>

            {/* Company Code Comparison */}
            <Card className="p-8 group hover:shadow-[0_10px_40px_-10px_rgba(26,77,46,0.15)] transition-shadow duration-500">
              <header className="mb-8">
                <span className="text-[10px] font-bold tracking-[0.2em] text-outline uppercase mb-1 block font-heading">
                  Entity Comparison
                </span>
                <h3 className="text-2xl font-extrabold text-on-surface font-heading tracking-tight">
                  Documents by Company Code
                </h3>
              </header>
              <BarChart
                data={companyComparisonData}
                categoryKey="company"
                layout="vertical"
                series={[{ key: 'documents', color: '#1A4D2E', name: 'Documents' }]}
              />
            </Card>

            {/* Recent Transactions */}
            <DataTable
              title="Recent Transactions"
              subtitle="Last 5 FI document postings"
              columns={transactionColumns}
              data={recentTransactions}
              rowsPerPage={5}
              enableSorting
              enableExport
              exportFilename="recent_transactions"
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Actions */}
            <Card elevation="low" padding="large">
              <div className="flex items-center gap-3 mb-6">
                <span className="icon text-primary bg-primary-container/10 p-2 rounded-lg">bolt</span>
                <h3 className="text-lg font-bold font-heading">Quick Actions</h3>
              </div>
              <div className="space-y-3">
                <Button variant="primary" icon="checklist" className="w-full justify-start" onClick={() => navigate('/selection')}>
                  New Selection
                </Button>
                <Button variant="secondary" icon="psychology" className="w-full justify-start" onClick={() => navigate('/chat')}>
                  Run AI Analysis
                </Button>
                <Button variant="secondary" icon="download" className="w-full justify-start">
                  Export Report
                </Button>
                <Button variant="tertiary" icon="table_rows" className="w-full justify-start" onClick={() => navigate('/tables')}>
                  View Ledger Items
                </Button>
              </div>
            </Card>

            {/* Recent AI Analysis Sessions */}
            <Card elevation="low" padding="large">
              <div className="flex items-center gap-3 mb-6">
                <span className="icon text-primary bg-primary-container/10 p-2 rounded-lg">history</span>
                <h3 className="text-lg font-bold font-heading">Recent Analyses</h3>
              </div>
              <div className="space-y-4">
                {analysisSessions.map((session) => (
                  <div key={session.id} className="flex items-start gap-3 group cursor-pointer">
                    <span className={`icon text-lg mt-0.5 ${session.status === 'running' ? 'text-tertiary animate-pulse' : 'text-on-surface-variant'}`}>
                      {session.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
                        {session.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-on-surface-variant font-mono">{session.companyCode}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusStyles[session.status]}`}>
                          {session.status === 'running' ? 'Running' : session.status === 'completed' ? 'Done' : 'Queued'}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-on-surface-variant whitespace-nowrap mt-1">{session.timestamp}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Insights Panel */}
            <Card elevation="low" padding="large">
              <div className="flex items-center gap-3 mb-6">
                <span className="icon text-primary bg-primary-container/10 p-2 rounded-lg">auto_awesome</span>
                <div>
                  <h3 className="text-lg font-bold font-heading">AI Insights</h3>
                  <p className="text-[10px] text-on-surface-variant">Anomaly detection & recommendations</p>
                </div>
              </div>
              <div className="space-y-4">
                {aiInsights.map((insight) => {
                  const styles = severityStyles[insight.severity];
                  return (
                    <div
                      key={insight.id}
                      className={`p-4 rounded-xl ${styles.bg} border ${styles.border} transition-all hover:scale-[1.01] cursor-pointer`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`icon text-lg mt-0.5 ${styles.icon}`}>{insight.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <p className="text-sm font-bold text-on-surface">{insight.title}</p>
                            <span className="text-[9px] text-on-surface-variant whitespace-nowrap">{insight.timestamp}</span>
                          </div>
                          <p className="text-xs text-on-surface-variant leading-relaxed">{insight.message}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
