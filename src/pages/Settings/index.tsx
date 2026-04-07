import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppLayout from '../../layouts/AppLayout.tsx';
import { Tabs } from '../../components/ui/Tabs.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Input } from '../../components/form/Input.tsx';
import { Select } from '../../components/form/Select.tsx';
import { DataTable } from '../../components/charts/DataTable.tsx';
import type { ColumnDef } from '../../components/charts/DataTable.tsx';
import { Chip } from '../../components/ui/Chip.tsx';
import { UserRole } from '../../types/auth.ts';
import { mockUsers } from '../../mocks/adminMock.ts';
import type { AuthUser } from '../../mocks/adminMock.ts';
import { useAuth } from '../../contexts/AuthContext.tsx';

function ProfileTab({ name, email }: { name: string; email: string }) {
  const [form, setForm] = useState({
    name,
    email,
    dateFormat: 'DD/MM/YYYY',
    currency: 'EUR',
    threshold: 'Percentage',
  });

  return (
    <div className="max-w-2xl space-y-8">
      {/* Account */}
      <section>
        <h3 className="text-xs font-bold text-outline uppercase tracking-wider font-label mb-4">Account</h3>
        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Full Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            icon="person"
          />
          <Input
            label="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            icon="mail"
            disabled
          />
        </div>
      </section>

      {/* Preferences */}
      <section>
        <h3 className="text-xs font-bold text-outline uppercase tracking-wider font-label mb-4">Preferences</h3>
        <div className="grid grid-cols-3 gap-6">
          <Select
            label="Date Format"
            value={form.dateFormat}
            onChange={e => setForm({ ...form, dateFormat: e.target.value })}
            options={[
              { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
              { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
              { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
            ]}
          />
          <Select
            label="Default Currency"
            value={form.currency}
            onChange={e => setForm({ ...form, currency: e.target.value })}
            options={[
              { label: 'EUR', value: 'EUR' },
              { label: 'USD', value: 'USD' },
              { label: 'GBP', value: 'GBP' },
            ]}
          />
          <Select
            label="Threshold Type"
            value={form.threshold}
            onChange={e => setForm({ ...form, threshold: e.target.value })}
            options={[
              { label: 'Percentage', value: 'Percentage' },
              { label: 'Absolute', value: 'Absolute' },
            ]}
          />
        </div>
      </section>

      <div className="pt-4">
        <Button variant="primary" icon="save">Save Changes</Button>
      </div>
    </div>
  );
}

function ConnectionsTab() {
  const connections = [
    { source: 'SAP', host: 'sap.client.internal', connected: true },
    { source: 'Oracle', host: 'oracle.client.internal', connected: false },
  ];

  return (
    <div className="max-w-2xl space-y-4">
      <h3 className="text-xs font-bold text-outline uppercase tracking-wider font-label mb-4">Data Sources</h3>
      {connections.map(conn => (
        <div
          key={conn.source}
          className="flex items-center justify-between p-4 rounded-xl bg-surface-container-lowest"
        >
          <div className="flex items-center gap-3">
            <span className={`icon text-xl ${conn.connected ? 'text-primary' : 'text-outline/40'}`}>
              database
            </span>
            <div>
              <p className="text-sm font-bold text-on-surface font-heading">{conn.source}</p>
              <p className="text-[11px] text-outline font-label">{conn.host}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${conn.connected ? 'bg-primary' : 'bg-error'}`} />
              <span className="text-[11px] font-label text-on-surface-variant">
                {conn.connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <Button variant="secondary" icon="sync" className="!p-1.5" title="Test Connection" />
          </div>
        </div>
      ))}

      <div className="pt-4 flex items-center gap-3">
        <span className="icon text-base text-outline">smart_toy</span>
        <div>
          <p className="text-sm font-bold text-on-surface font-heading">LLM</p>
          <p className="text-[11px] text-outline font-label">OpenAI - Connected</p>
        </div>
      </div>
    </div>
  );
}

function UsersTab() {
  const [users] = useState<AuthUser[]>(mockUsers);

  const columns: ColumnDef<AuthUser>[] = [
    {
      key: 'name',
      label: 'User',
      sortable: true,
      render: (name: string, user: AuthUser) => (
        <div className="flex flex-col">
          <span className="font-bold text-on-surface">{name}</span>
          <span className="text-[10px] text-outline font-label">{user.email}</span>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      filterable: true,
      render: (role: UserRole) => {
        const variants: Record<string, 'primary' | 'secondary' | 'surface' | 'outline'> = {
          [UserRole.ADMIN]: 'primary',
          [UserRole.USER]: 'surface',
        };
        return (
          <Chip
            label={role === UserRole.ADMIN ? 'Admin (Quatelio)' : 'User'}
            variant={variants[role] || 'outline'}
          />
        );
      },
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (status: string) => (
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-primary' : 'bg-outline'}`} />
          <span className="text-xs capitalize text-on-surface-variant">{status}</span>
        </div>
      ),
    },
    {
      key: 'lastSeen',
      label: 'Last Seen',
      sortable: true,
      render: (lastSeen: string) => (
        <span className="text-[11px] text-outline font-label">{lastSeen}</span>
      ),
    },
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: () => (
        <div className="flex justify-end gap-2">
          <Button variant="secondary" icon="edit" className="!p-1.5" />
          <Button variant="secondary" icon="more_horiz" className="!p-1.5" />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      title="User Directory"
      subtitle="QUATELIO ADMIN"
      data={users}
      columns={columns}
      enableSearch
      enableFilter
      enableSorting
      actions={
        <Button variant="primary" icon="person_add">
          Add User
        </Button>
      }
    />
  );
}

export default function Settings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isAdmin } = useAuth();

  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || 'profile');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const tabs = [
    { id: 'profile', label: 'Profile & Preferences', icon: 'person' },
    { id: 'connections', label: 'Connections', icon: 'cable' },
    ...(isAdmin ? [{ id: 'users', label: 'Users', icon: 'group' }] : []),
  ];

  return (
    <AppLayout
      activeNavId="settings"
      user={user ? { name: user.name, email: user.email, role: user.role } : undefined}
    >
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-on-surface font-heading">Settings</h1>
          <p className="text-xs text-outline font-label mt-1">Manage your account, preferences and platform access.</p>
        </div>

        <Tabs
          tabs={tabs}
          activeTabId={activeTab}
          onChange={handleTabChange}
        />

        {activeTab === 'profile' && <ProfileTab name={user?.name ?? ''} email={user?.email ?? ''} />}
        {activeTab === 'connections' && <ConnectionsTab />}
        {activeTab === 'users' && isAdmin && <UsersTab />}
      </div>
    </AppLayout>
  );
}
