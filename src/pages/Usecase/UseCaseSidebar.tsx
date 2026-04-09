import type { UseCaseResult } from '../../types/usecase';
import { fmtCurrency, fmtPct } from '../../utils/format';

interface UseCaseSidebarProps {
  description: string;
  result: UseCaseResult | null;
  formValues: Record<string, string | number | boolean>;
}

/**
 * Reusable sidebar panel for any use-case page.
 * Shows: about, result summary, flagged accounts, active filters.
 */
export function UseCaseSidebar({ description, result, formValues }: UseCaseSidebarProps) {
  const flaggedAccounts = result?.accounts.filter(a => a.flagged) || [];

  return (
    <div className="p-6 space-y-6">
      {/* Description */}
      <div>
        <h3 className="text-[10px] font-bold text-outline uppercase tracking-wider mb-2">About</h3>
        <p className="text-[12px] text-on-surface-variant leading-relaxed">
          {description}
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
  );
}
