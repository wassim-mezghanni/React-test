import { useState } from 'react';
import Navbar from '../../layouts/Navbar.tsx';
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

export default function Home() {
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

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="pt-32 pb-20 px-8 max-w-7xl mx-auto">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: UI Elements */}
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
                <Tabs
                  tabs={tabs}
                  activeTabId={activeTab}
                  onChange={setActiveTab}
                  variant="underline"
                />
                <Tabs
                  tabs={tabs}
                  activeTabId={activeTab}
                  onChange={setActiveTab}
                  variant="pill"
                />
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
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={12} 
                  onPageChange={setCurrentPage} 
                />
              </Card>
            </section>
          </div>

          {/* Right Column: Forms */}
          <div className="lg:col-span-5 space-y-12">
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="icon text-primary bg-primary-container/10 p-2 rounded-lg">edit_note</span>
                <h2 className="text-2xl font-bold font-heading">Input & Forms</h2>
              </div>
              <Card className="space-y-8" elevation="medium">
                <Input
                  label="Full Name"
                  placeholder="Enter your name"
                  icon="person"
                  value={formValues.name}
                  onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                />

                <Select
                  label="Analysis Period"
                  options={selectOptions}
                  value={formValues.allocation}
                  onChange={(e) => setFormValues({ ...formValues, allocation: e.target.value })}
                />

                <DatePicker 
                  label="Effective Date" 
                  value={formValues.startDate}
                  onChange={(e) => setFormValues({ ...formValues, startDate: e.target.value })}
                />

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

        <section className="mt-12 space-y-6">
          <div className="flex items-center gap-4">
             <span className="icon text-primary bg-primary-container/10 p-2 rounded-lg">notifications_active</span>
             <h2 className="text-2xl font-bold font-heading">System Feedback</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Alert 
              variant="success" 
              title="Transaction Successful" 
              message="Your transfer of 10.4 BTC to vault alpha-4 has been confirmed on-chain."
            />
            <Alert 
              variant="error" 
              title="Authentication Required" 
              message="Please re-verify your identity using the hardware key to proceed with this trade."
            />
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-outline-variant/30 text-center text-on-surface-variant/50 text-xs tracking-widest uppercase">
        &copy; 2026 Querai
      </footer>
    </div>
  );
}
