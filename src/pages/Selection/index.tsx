import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../layouts/AppLayout.tsx';
import { Card } from '../../components/ui/Card.tsx';
import { Select } from '../../components/form/Select.tsx';
import { DatePicker } from '../../components/form/DatePicker.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { sidebarProjects, sidebarChats, defaultUser } from '../../mocks/sidebarMock.ts';

const companyCodeOptions = [
  { label: 'Select company code', value: '' },
  { label: '1000 — SAP Global Corp', value: '1000' },
  { label: '2000 — Querai Europe GmbH', value: '2000' },
  { label: '3000 — Querai North America Inc.', value: '3000' },
  { label: '4000 — Querai Asia Pacific Ltd.', value: '4000' },
];

const ledgerOptions = [
  { label: 'Select ledger', value: '' },
  { label: '0L — Leading Ledger', value: '0L' },
  { label: '2L — IFRS Ledger', value: '2L' },
  { label: '3L — Tax Ledger', value: '3L' },
  { label: '4L — Management Ledger', value: '4L' },
];

const financialStatementOptions = [
  { label: 'Select financial statement', value: '' },
  { label: 'INT1 — Income Statement', value: 'INT1' },
  { label: 'BAL1 — Balance Sheet', value: 'BAL1' },
  { label: 'CFS1 — Cash Flow Statement', value: 'CFS1' },
  { label: 'EQY1 — Statement of Equity', value: 'EQY1' },
];


export default function Selection() {
  const navigate = useNavigate();
  const [companyCode, setCompanyCode] = useState('');
  const [ledger, setLedger] = useState('');
  const [financialStatement, setFinancialStatement] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!companyCode) newErrors.companyCode = 'Company code is required';
    if (!ledger) newErrors.ledger = 'Ledger is required';
    if (!financialStatement) newErrors.financialStatement = 'Financial statement is required';
    if (!fromDate) newErrors.fromDate = 'Start date is required';
    if (!toDate) newErrors.toDate = 'End date is required';

    if (fromDate && toDate && toDate < fromDate) {
      newErrors.toDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleValidate = () => {
    if (validate()) {
      navigate('/tables');
    }
  };

  return (
    <AppLayout
      activeNavId="selection"
      projects={sidebarProjects}
      chats={sidebarChats}
      user={defaultUser}
    >
      <div className="p-8 pb-20 max-w-4xl mx-auto">
        <header className="mb-12">
          <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-2 block font-heading">
            Data Configuration
          </span>
          <h1 className="text-4xl font-extrabold text-on-surface font-heading tracking-tighter mb-3">
            Selection Parameters
          </h1>
          <p className="text-on-surface-variant max-w-xl leading-relaxed">
            Configure the company, ledger, and fiscal period to generate your financial analysis.
          </p>
        </header>

        <div className="space-y-8">
          {/* Company & Ledger */}
          <Card elevation="low" padding="large">
            <div className="flex items-center gap-3 mb-8">
              <span className="icon text-primary bg-primary-container/10 p-2 rounded-lg">domain</span>
              <h2 className="text-lg font-bold font-heading">Entity & Ledger</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Company Code"
                options={companyCodeOptions}
                value={companyCode}
                onChange={(e) => setCompanyCode(e.target.value)}
                error={errors.companyCode}
              />
              <Select
                label="Ledger"
                options={ledgerOptions}
                value={ledger}
                onChange={(e) => setLedger(e.target.value)}
                error={errors.ledger}
              />
            </div>
          </Card>

          {/* Financial Statement */}
          <Card elevation="low" padding="large">
            <div className="flex items-center gap-3 mb-8">
              <span className="icon text-primary bg-primary-container/10 p-2 rounded-lg">description</span>
              <h2 className="text-lg font-bold font-heading">Financial Statement</h2>
            </div>
            <Select
              label="Statement Version"
              options={financialStatementOptions}
              value={financialStatement}
              onChange={(e) => setFinancialStatement(e.target.value)}
              error={errors.financialStatement}
            />
          </Card>

          {/* Fiscal Period */}
          <Card elevation="low" padding="large">
            <div className="flex items-center gap-3 mb-8">
              <span className="icon text-primary bg-primary-container/10 p-2 rounded-lg">date_range</span>
              <h2 className="text-lg font-bold font-heading">Fiscal Period</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DatePicker
                label="From"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                error={errors.fromDate}
              />
              <DatePicker
                label="To"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                error={errors.toDate}
              />
            </div>
          </Card>

          {/* Validate */}
          <div className="flex justify-end pt-4">
            <Button
              variant="primary"
              icon="check_circle"
              onClick={handleValidate}
              className="px-10 py-4 text-base rounded-xl"
            >
              Validate Selection
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
