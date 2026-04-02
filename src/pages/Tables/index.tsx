import AppLayout from '../../layouts/AppLayout.tsx';
import { DataTable, type ColumnDef } from '../../components/charts/DataTable.tsx';
import { sidebarProjects, sidebarChats, defaultUser } from '../../mocks/sidebarMock.ts';
import {
  financialTableData,
  companyCodeMap,
  docTypeMap,
  type FinancialEntry,
} from '../../mocks/financialTableMock.ts';

const columns: ColumnDef<FinancialEntry>[] = [
  {
    key: 'BUKRS',
    label: 'Co. Code (BUKRS)',
    sortable: true,
    filterable: true,
    render: (val: string) => (
      <span>
        <span className="font-bold">{val}</span>
        <span className="text-on-surface-variant text-[10px] ml-1.5">{companyCodeMap[val]}</span>
      </span>
    ),
  },
  {
    key: 'BELNR',
    label: 'Doc. No (BELNR)',
    sortable: true,
    render: (val: string) => <span className="font-mono text-xs">{val}</span>,
  },
  {
    key: 'BLART',
    label: 'Doc. Type (BLART)',
    sortable: true,
    filterable: true,
    render: (val: string) => (
      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-tight bg-surface-container-high text-on-surface-variant">
        {val} — {docTypeMap[val]}
      </span>
    ),
  },
  {
    key: 'HKONT',
    label: 'G/L Acct (HKONT)',
    sortable: true,
    render: (val: string) => <span className="font-mono text-xs">{val}</span>,
  },
  {
    key: 'GJAHR',
    label: 'Fisc. Year (GJAHR)',
    sortable: true,
    filterable: true,
  },
  {
    key: 'MONAT',
    label: 'Period (MONAT)',
    sortable: true,
    filterable: true,
  },
  {
    key: 'BUDAT',
    label: 'Post. Date (BUDAT)',
    sortable: true,
  },
  {
    key: 'SHKZG',
    label: 'D/C (SHKZG)',
    sortable: true,
    filterable: true,
    render: (val: string) => (
      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
        val === 'S'
          ? 'bg-primary-container/10 text-primary-container'
          : 'bg-error/10 text-error'
      }`}>
        {val === 'S' ? 'Debit' : 'Credit'}
      </span>
    ),
  },
  {
    key: 'DMBTR',
    label: 'Amount (DMBTR)',
    align: 'right',
    sortable: true,
    csvValue: (val: number) => val.toFixed(2),
    render: (val: number, row: FinancialEntry) => (
      <span className={`font-heading font-extrabold ${
        row.SHKZG === 'S' ? 'text-primary-container' : 'text-error'
      }`}>
        {row.SHKZG === 'H' ? '-' : ''}{val.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </span>
    ),
  },
  {
    key: 'WAERS',
    label: 'Curr. (WAERS)',
    sortable: true,
    filterable: true,
    render: (val: string) => (
      <span className="text-[11px] font-bold tracking-tight text-on-surface-variant">{val}</span>
    ),
  },
];

export default function Tables() {
  return (
    <AppLayout
      activeNavId="tables"
      projects={sidebarProjects}
      chats={sidebarChats}
      user={defaultUser}
    >
      <div className="p-8 pb-20 max-w-[1400px] mx-auto">
        <header className="mb-12">
          <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-2 block font-heading">
            Financial Ledger
          </span>
          <h1 className="text-4xl font-extrabold text-on-surface font-heading tracking-tighter mb-3">
            General Ledger Line Items
          </h1>
          <p className="text-on-surface-variant max-w-xl leading-relaxed">
            SAP FI document line items.
          </p>
        </header>

        <DataTable
          title="FI Documents"
          subtitle="G/L Account Line Items (FAGLL03)"
          columns={columns}
          data={financialTableData}
          rowsPerPage={10}
          enableSearch
          enableSorting
          enableFilter
          enableExport
          enableDensityToggle
          enableReordering
          exportFilename="gl_line_items"
        />
      </div>
    </AppLayout>
  );
}
