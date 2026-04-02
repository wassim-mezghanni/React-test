import { useState } from 'react';
import AppLayout from '../../layouts/AppLayout.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Card } from '../../components/ui/Card.tsx';
import { Chip } from '../../components/ui/Chip.tsx';
import { Tabs } from '../../components/ui/Tabs.tsx';
import { Alert } from '../../components/ui/Alert.tsx';
import { Pagination } from '../../components/ui/Pagination.tsx';
import { Input } from '../../components/form/Input.tsx';
import { Checkbox } from '../../components/form/Checkbox.tsx';
import { Radio } from '../../components/form/RadioButton.tsx';
import { Select } from '../../components/form/Select.tsx';
import { Toggle } from '../../components/form/Toggle.tsx';
import { DatePicker } from '../../components/form/DatePicker.tsx';
import { LineChart } from '../../components/charts/LineChart.tsx';
import { DonutChart } from '../../components/charts/DonutChart.tsx';
import { CategoryBarList } from '../../components/charts/CategoryBarList.tsx';
import { DataTable, type ColumnDef } from '../../components/charts/DataTable.tsx';
import { KPICard } from '../../components/charts/KPICard.tsx';
import { BarChart } from '../../components/charts/BarChart.tsx';
import { HeroBanner } from '../../components/ui/HeroBanner.tsx';
import { Accordion } from '../../components/ui/Accordion.tsx';
import { Skeleton, SkeletonCard } from '../../components/ui/Skeleton.tsx';

import { sidebarProjects, sidebarChats, defaultUser } from '../../mocks/sidebarMock.ts';

export default function Library() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentPage, setCurrentPage] = useState(1);
  const [formValues, setFormValues] = useState({
    name: 'Sovereign Curator',
    allocation: 'daily',
    startDate: '2026-03-30'
  });

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'Settings' }
  ];

  const selectOptions = [
    { label: 'Daily Allocation', value: 'daily' },
    { label: 'Weekly Rebalance', value: 'weekly' },
    { label: 'Quarterly Analysis', value: 'quarterly' }
  ];

  const performanceData = [
    { month: 'Jan', value: 850000 },
    { month: 'Feb', value: 890000 },
    { month: 'Mar', value: 820000 },
    { month: 'Apr', value: 940000 },
    { month: 'May', value: 1050000 },
    { month: 'Jun', value: 1104200 },
    { month: 'Jul', value: 1250000 },
  ];

  const assetAllocation = [
    { id: '1', name: 'Equities', value: 1120000, color: '#1A4D2E', subtext: 'Global Markets' },
    { id: '2', name: 'Fixed Income', value: 620000, color: '#366847', subtext: 'Gov Bonds' },
    { id: '3', name: 'Alternatives', value: 496000, color: '#4f1c26', subtext: 'Private Equity' },
    { id: '4', name: 'Cash', value: 248000, color: '#717971', subtext: 'Liquid Reserve' },
  ];

  const categorySpending = [
    { id: '1', label: 'Housing & Utilities', icon: 'home', value: 4200 },
    { id: '2', label: 'Investments', icon: 'trending_up', value: 3500 },
    { id: '3', label: 'Lifestyle & Dining', icon: 'payments', value: 2100 },
    { id: '4', label: 'Transportation', icon: 'directions_car', value: 1800 },
  ];

  const revenueData = [
    { territory: 'North America', direct: 450000 },
    { territory: 'Europe', direct: 320000 },
    { territory: 'Asia Pacific', direct: 280000 },
    { territory: 'Middle East', direct: 150000 },
  ];

  const transactionData = [
    { id: '1', date: 'Oct 24, 2023', desc: 'AWS Cloud Services', category: 'Infrastructure', amount: -1240.00 },
    { id: '2', date: 'Oct 22, 2023', desc: 'Global Client Retention', category: 'Revenue', amount: 8500.00 },
    { id: '3', date: 'Oct 20, 2023', desc: 'Curated Beans Roastery', category: 'Operations', amount: -42.50 },
    { id: '4', date: 'Oct 18, 2023', desc: 'Skyline Airways', category: 'Travel', amount: -1890.12 },
  ];

  const tableColumns: ColumnDef<typeof transactionData[0]>[] = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'desc', label: 'Description', sortable: true },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      filterable: true,
      render: (val: string) => <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-tight bg-surface-container-high text-on-surface-variant">{val}</span>
    },
    {
      key: 'amount',
      label: 'Amount',
      align: 'right',
      sortable: true,
      csvValue: (val: number) => val.toFixed(2),
      render: (val: number) => (
        <span className={`font-headline font-extrabold ${val >= 0 ? 'text-primary-container' : 'text-on-surface'}`}>
          {val > 0 ? '+' : ''}{val < 0 ? `-$${Math.abs(val).toFixed(2)}` : `$${val.toFixed(2)}`}
        </span>
      )
    }
  ];

  return (
    <AppLayout
      activeNavId="library"
      projects={sidebarProjects}
      chats={sidebarChats}
      user={defaultUser}
    >
      <div className="p-8 pb-20 max-w-7xl mx-auto">
        <header className="mb-16">
          <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-2 block font-heading">
            Foundational Components
          </span>
          <h1 className="text-5xl font-extrabold text-on-surface font-heading tracking-tighter mb-4">
            Design Library Showcase
          </h1>
          <p className="text-on-surface-variant max-w-2xl leading-relaxed text-lg">
            A curated showcase of reusable atoms and primitives built for editorial clarity and Sovereign usability.
          </p>
        </header>

        <HeroBanner
          eyebrow="financial analysis"
          title="Financial analysis"
          description="A comprehensive financial analysis platform built for SAP data-driven decision making."
          backgroundImage=""
          primaryAction={{ label: 'Get Started', icon: 'north_east' }}
          secondaryAction={{ label: 'Documentation' }}
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-12">
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="icon text-primary bg-primary-container/10 p-2 rounded-lg">smart_button</span>
                <h2 className="text-2xl font-bold font-heading">Action Buttons</h2>
              </div>
              <Card className="flex flex-wrap items-center gap-6" elevation="low">
                <Button variant="primary" icon="add">Primary Action</Button>
                <Button variant="secondary" icon="search">Secondary Action</Button>
                <Button variant="tertiary" icon="arrow_forward" iconPosition="right">Tertiary Link</Button>
              </Card>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="icon text-primary bg-primary-container/10 p-2 rounded-lg">tab</span>
                <h2 className="text-2xl font-bold font-heading">Tabs & States</h2>
              </div>
              <Card className="space-y-8">
                <Tabs tabs={tabs} activeTabId={activeTab} onChange={setActiveTab} variant="underline" />
                <Tabs tabs={tabs} activeTabId={activeTab} onChange={setActiveTab} variant="pill" />
              </Card>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="icon text-primary bg-primary-container/10 p-2 rounded-lg">sell</span>
                <h2 className="text-2xl font-bold font-heading">Chips & Tags</h2>
              </div>
              <Card className="flex flex-wrap gap-3">
                <Chip label="Financial" icon="account_balance" active />
                <Chip label="AI Insights" icon="psychology" />
                <Chip label="High Intent" icon="bolt" />
                <Chip label="Dismissible" icon="tag" onDelete={() => { }} />
              </Card>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="icon text-primary bg-primary-container/10 p-2 rounded-lg">navigation</span>
                <h2 className="text-2xl font-bold font-heading">Navigation & Pagination</h2>
              </div>
              <Card className="p-8">
                <Pagination currentPage={currentPage} totalPages={12} onPageChange={setCurrentPage} />
              </Card>
            </section>
          </div>

          <div className="lg:col-span-5 space-y-12">
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="icon text-primary bg-primary-container/10 p-2 rounded-lg">edit_note</span>
                <h2 className="text-2xl font-bold font-heading">Input & Forms</h2>
              </div>
              <Card className="space-y-8" elevation="medium">
                <Input label="Full Name" placeholder="Enter your name" icon="person" value={formValues.name} onChange={(e) => setFormValues({ ...formValues, name: e.target.value })} />
                <Select label="Analysis Period" options={selectOptions} value={formValues.allocation} onChange={(e) => setFormValues({ ...formValues, allocation: e.target.value })} />
                <DatePicker label="Effective Date" value={formValues.startDate} onChange={(e) => setFormValues({ ...formValues, startDate: e.target.value })} />
                <div className="space-y-4 pt-4 border-t border-surface-container-high">
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Check & Toggle</p>
                  <div className="space-y-4">
                    <Checkbox label="Enable AI Smart-insights" checked />
                    <Checkbox label="Send weekly rebalance report" />
                    <Toggle label="Persistent Analysis" checked />
                    <Toggle label="Secure Protocol" />
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-surface-container-high">
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Portfolio Type</p>
                  <div className="flex flex-col gap-3">
                    <Radio name="portfolio" label="Public Markets" checked />
                    <Radio name="portfolio" label="Private Equity" />
                  </div>
                </div>
                <Button variant="primary" className="w-full mt-4">Save Configuration</Button>
              </Card>
            </section>
          </div>
        </div>

        <section className="mt-20 space-y-10">
          <div className="flex items-center gap-4">
            <span className="icon text-primary bg-primary-container/10 p-2 rounded-lg">monitoring</span>
            <h2 className="text-2xl font-bold font-heading">Data Visualizations & Analytics</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="p-8 group hover:shadow-[0_10px_40px_-10px_rgba(26,77,46,0.15)] transition-shadow duration-500">
                <header className="mb-8">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-outline uppercase mb-1 block font-label">Portfolio Growth</span>
                  <div className="flex justify-between items-end">
                    <h3 className="text-3xl font-extrabold text-on-surface font-heading tracking-tight">Performance 2024</h3>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary-container font-heading">+$124.5k</p>
                      <p className="text-xs text-on-surface-variant font-medium">Trailing 7 months</p>
                    </div>
                  </div>
                </header>
                <LineChart data={performanceData} xAxisKey="month" series={[{ key: 'value', color: '#1A4D2E' }]} yAxisFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} />
              </Card>
              <DataTable title="Transaction Archive" subtitle="Financial Ledger" columns={tableColumns} data={transactionData} rowsPerPage={5} enableSearch enableDensityToggle enableSorting enableReordering enableFilter enableExport exportFilename="transactions" />
              <Card className="p-8 group hover:shadow-[0_10px_40px_-10px_rgba(26,77,46,0.15)] transition-shadow duration-500">
                <header className="mb-8">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-outline uppercase mb-1 block font-label">Global Presence</span>
                  <div className="flex justify-between items-end">
                    <h3 className="text-3xl font-extrabold text-on-surface font-heading tracking-tight">Revenue by Territory</h3>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary-container font-heading">$1.2M</p>
                      <p className="text-xs text-on-surface-variant font-medium">Q2 Direct Sales</p>
                    </div>
                  </div>
                </header>
                <BarChart data={revenueData} categoryKey="territory" layout="vertical" series={[{ key: 'direct', color: '#1A4D2E', name: 'Direct Revenue' }]} valueFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} />
              </Card>
              <Card className="p-8 group hover:shadow-[0_10px_40px_-10px_rgba(26,77,46,0.15)] transition-shadow duration-500">
                <header className="mb-8">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-outline uppercase mb-1 block font-label">Volume Analysis</span>
                  <div className="flex justify-between items-end">
                    <h3 className="text-3xl font-extrabold text-on-surface font-heading tracking-tight">Regional Distribution</h3>
                  </div>
                </header>
                <BarChart data={revenueData} categoryKey="territory" layout="horizontal" series={[{ key: 'direct', color: '#366847', name: 'Direct Revenue' }]} valueFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} />
              </Card>
            </div>
            <div className="lg:col-span-4 space-y-8">
              <KPICard title="Net Worth" icon="account_balance_wallet" value="2,482,900" currency="USD" trend={{ value: 12.4 }} description={<p>Your portfolio grew significantly this month, driven by equity distribution.</p>} />
              <Card className="p-8 group hover:shadow-[0_10px_40px_-10px_rgba(26,77,46,0.15)] transition-shadow duration-500">
                <header className="mb-8 text-center">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-outline uppercase mb-1 block font-label">Distribution</span>
                  <h3 className="text-2xl font-extrabold text-on-surface font-heading tracking-tight">Asset Allocation</h3>
                </header>
                <DonutChart data={assetAllocation} centerLabel="Total Value" centerTrend={{ value: 12.4 }} valueFormatter={(v) => `$${(v/1000000).toFixed(2)}M`} />
              </Card>
              <Card className="p-8 group hover:shadow-[0_10px_40px_-10px_rgba(26,77,46,0.15)] transition-shadow duration-500">
                <header className="mb-8 border-b border-outline-variant/10 pb-6">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-outline uppercase mb-1 block font-label">Monthly Outflow</span>
                  <h3 className="text-2xl font-extrabold text-on-surface font-heading tracking-tight">Spending Categories</h3>
                </header>
                <CategoryBarList data={categorySpending} valueFormatter={(v) => `$${v.toLocaleString()}`} />
              </Card>
            </div>
          </div>
        </section>

        <section className="mt-20 space-y-6">
          <div className="flex items-center gap-4">
            <span className="icon text-primary bg-primary-container/10 p-2 rounded-lg">help</span>
            <h2 className="text-2xl font-bold font-heading">FAQ</h2>
          </div>
          <Accordion
            defaultOpenIds={['faq-1']}
            items={[
              { id: 'faq-1', title: 'How is my portfolio performance calculated?', icon: 'analytics', content: <p className="text-sm text-on-surface-variant leading-relaxed">Performance is calculated using time-weighted returns (TWR) across all asset classes, adjusted for deposits and withdrawals within each reporting period.</p> },
              { id: 'faq-2', title: 'What data sources power the insights?', icon: 'database', content: <p className="text-sm text-on-surface-variant leading-relaxed">We aggregate data from SAP Financial modules, market feeds and your connected banking institutions to provide real-time analysis.</p> },
              { id: 'faq-3', title: 'Can I export my reports?', icon: 'download', content: <p className="text-sm text-on-surface-variant leading-relaxed">Yes — all tables and charts support CSV export. Premium plans also include PDF report generation with custom branding.</p> },
            ]}
          />
        </section>

        <section className="mt-20 space-y-6">
          <div className="flex items-center gap-4">
            <span className="icon text-primary bg-primary-container/10 p-2 rounded-lg">hourglass_empty</span>
            <h2 className="text-2xl font-bold font-heading">Loading Skeletons</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkeletonCard elevation="low" />
            <SkeletonCard lines={2} icon={false} elevation="medium" />
          </div>
          <Card className="space-y-4">
            <Skeleton variant="text" className="w-1/3 h-5" />
            <Skeleton variant="text" className="w-full h-3" />
            <Skeleton variant="text" className="w-full h-3" />
            <Skeleton variant="text" className="w-2/3 h-3" />
            <div className="flex gap-4 pt-2">
              <Skeleton variant="circular" className="w-10 h-10" />
              <Skeleton variant="circular" className="w-10 h-10" />
              <Skeleton variant="circular" className="w-10 h-10" />
            </div>
            <Skeleton variant="rectangular" className="w-full h-32" />
          </Card>
        </section>

        <section className="mt-20 space-y-6">
          <div className="flex items-center gap-4">
            <span className="icon text-primary bg-primary-container/10 p-2 rounded-lg">notifications_active</span>
            <h2 className="text-2xl font-bold font-heading">System Feedback</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Alert variant="success" title="Transaction Successful" message="Your transfer of 10.4 BTC to vault alpha-4 has been confirmed on-chain." />
            <Alert variant="error" title="Authentication Required" message="Please re-verify your identity using the hardware key to proceed with this trade." />
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
