import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import UseCaseLayout from '../UseCaseLayout';
import SchemaRenderer from '../SchemaRenderer';
import type { UseCaseSchema, UseCaseExecutionResponse } from '../../../types/usecase';
import { useSessionStore } from '../../../lib/store';
import { usecase, chat } from '../../../services/api';
import { useMutation } from '@tanstack/react-query';
import Tabs from '../../../components/ui/Tabs';
import { KPICard } from '../../../components/charts/KPICard';
import { BarChart } from '../../../components/charts/BarChart';
import { DataTable } from '../../../components/charts/DataTable';

const UC001_SCHEMA: UseCaseSchema = {
  id: 'UC_001',
  name: 'Financial Variance Analysis',
  description: 'Analyze variances between actual and budget data across periods and cost centers.',
  fields: [
    { id: 'company_code', label: 'Company Code', type: 'dropdown', source: 'sap', endpoint: 'company-codes', required: true },
    { id: 'fiscal_year', label: 'Fiscal Year', type: 'dropdown', source: 'sap', endpoint: 'fiscal-years', required: true },
    { id: 'period_from', label: 'Period From', type: 'dropdown', source: 'sap', endpoint: 'periods', required: true },
    { id: 'period_to', label: 'Period To', type: 'dropdown', source: 'sap', endpoint: 'periods', required: true },
    { id: 'ledger', label: 'Ledger', type: 'dropdown', source: 'sap', endpoint: 'ledgers', defaultValue: '0L' },
    { id: 'cost_center', label: 'Cost Center', type: 'text', placeholder: 'Optional: filter by cost center' },
  ],
};

export default function UC001() {
  const { state } = useLocation();
  const { sessionId } = useSessionStore();
  const [formValues, setFormValues] = useState<Record<string, any>>(state?.prefilled || {});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('summary');

  // Execution Mutation
  const executeMutation = useMutation({
    mutationFn: (data: Record<string, any>) => usecase.execute('UC_001', data),
    onSuccess: (res: UseCaseExecutionResponse) => {
      // After success, send context to chat
      if (sessionId && res.insight) {
        chat.context({
          session_id: sessionId,
          usecase_id: 'UC_001',
          result_summary: res.insight,
          key_data: res.results,
        });
      }
    },
  });

  const handleExecute = () => {
    // Validation
    const newErrors: Record<string, string> = {};
    UC001_SCHEMA.fields.forEach(f => {
      if (f.required && !formValues[f.id]) {
        newErrors[f.id] = `${f.label} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    executeMutation.mutate(formValues);
  };

  const resultsData = executeMutation.data?.results || {};

  return (
    <UseCaseLayout
      title="Financial Variance Analysis"
      usecaseId="UC_001"
      sidebar={
        <div className="p-6 space-y-6">
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Contextual Insights</h3>
            <p className="text-[12px] text-on-surface-variant leading-relaxed">
              {executeMutation.data?.insight || 'Submit the analysis to generate AI-driven insights based on your selected parameters.'}
            </p>
          </div>
          
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
          <h2 className="text-lg font-bold text-on-surface font-headline">Analysis Parameters</h2>
          <button
            onClick={handleExecute}
            disabled={executeMutation.isPending}
            className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50"
          >
            {executeMutation.isPending ? 'Executing...' : 'Run Analysis'}
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
      {(executeMutation.data || resultsData) && (
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center justify-between border-b border-outline-variant/10 pb-2">
            <h2 className="text-lg font-bold text-on-surface font-headline">Execution Results</h2>
            <Tabs
              activeTabId={activeTab}
              onChange={setActiveTab}
              tabs={[
                { id: 'summary', label: 'Summary' },
                { id: 'trends', label: 'Trends' },
                { id: 'data', label: 'Raw Data' },
              ]}
              variant="pill"
              className="w-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KPICard title="Total Actual" value="$1.2M" trend={{ value: 5.2 }} icon="payments" />
            <KPICard title="Total Budget" value="$1.15M" trend={{ value: -2.1 }} icon="receipt_long" />
            <KPICard title="Variance" value="+$50k" icon="difference" />
          </div>

          {activeTab === 'summary' && (
            <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
              <h3 className="text-sm font-bold text-on-surface mb-6">Variance by Cost Center</h3>
              <BarChart
                data={[
                  { category: 'Marketing', value: 45000 },
                  { category: 'R&D', value: -12000 },
                  { category: 'Operations', value: 8000 },
                  { category: 'Sales', value: 32000 },
                ]}
                categoryKey="category"
                series={[{ key: 'value', color: '#1A4D2E', name: 'Variance' }]}
                height={300}
              />
            </div>
          )}

          {activeTab === 'data' && (
            <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10">
              <DataTable
                data={[
                  { id: 1, cost_center: 'Marketing', actual: 450000, budget: 405000, variance: 45000 },
                  { id: 2, cost_center: 'R&D', actual: 280000, budget: 292000, variance: -12000 },
                ]}
                columns={[
                  { key: 'cost_center', label: 'Cost Center' },
                  { key: 'actual', label: 'Actual', render: (val) => `$${val.toLocaleString()}` },
                  { key: 'budget', label: 'Budget', render: (val) => `$${val.toLocaleString()}` },
                  { key: 'variance', label: 'Variance', render: (val) => `$${val.toLocaleString()}` },
                ]}
              />
            </div>
          )}
        </section>
      )}
    </UseCaseLayout>
  );
}
