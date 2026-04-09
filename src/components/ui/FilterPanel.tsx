import { useState } from 'react';
import { FilterChip } from './FilterChip.tsx';

export interface FilterGroup {
  key: string;
  label: string;
  values: string[];
}

export interface FilterPanelProps {
  groups: FilterGroup[];
  activeFilters: Record<string, string[]>;
  onFiltersChange: (filters: Record<string, string[]>) => void;
  className?: string;
}

export function FilterPanel({
  groups,
  activeFilters,
  onFiltersChange,
  className = '',
}: FilterPanelProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  if (groups.length === 0) return null;

  const hasActive = Object.values(activeFilters).some(v => v.length > 0);

  const toggleValue = (groupKey: string, value: string) => {
    const current = activeFilters[groupKey] ?? [];
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onFiltersChange({ ...activeFilters, [groupKey]: next });
  };

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups(prev => ({ ...prev, [groupKey]: !prev[groupKey] }));
  };

  const INITIAL_LIMIT = 10;

  return (
    <div className={`p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/20 shadow-[0_4px_16px_-2px_rgba(25,28,29,0.06)] ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-headline font-bold text-on-surface-variant uppercase tracking-widest">
          Filter by
        </span>
        {hasActive && (
          <button
            className="text-xs font-label text-primary hover:underline"
            onClick={() => onFiltersChange({})}
          >
            Clear all
          </button>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {groups.map(group => {
          const selected = activeFilters[group.key] ?? [];
          const isExpanded = expandedGroups[group.key];

          // Make sure selected values are always visible
          const baseVisible = group.values.slice(0, INITIAL_LIMIT);
          const extraVisible = selected.filter(v => !baseVisible.includes(v));
          const visibleValues = isExpanded 
            ? group.values 
            : Array.from(new Set([...baseVisible, ...extraVisible]));
          
          const hiddenCount = group.values.length - visibleValues.length;

          return (
            <div key={group.key}>
              <p className="text-[11px] font-label font-bold text-outline uppercase tracking-wider mb-2">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {visibleValues.map(val => (
                  <FilterChip
                    key={val}
                    label={val}
                    active={selected.includes(val)}
                    onClick={() => toggleValue(group.key, val)}
                  />
                ))}
                
                {!isExpanded && hiddenCount > 0 && (
                  <button
                    onClick={() => toggleGroup(group.key)}
                    className="px-3 py-1 rounded-lg border border-outline-variant/30 text-surface-variant hover:bg-surface-container-low hover:text-primary hover:border-primary/30 transition-colors text-xs font-bold flex items-center cursor-pointer"
                  >
                    +{hiddenCount} more
                  </button>
                )}
                
                {isExpanded && group.values.length > INITIAL_LIMIT && (
                  <button
                    onClick={() => toggleGroup(group.key)}
                    className="px-3 py-1 rounded-lg border border-outline-variant/30 text-surface-variant hover:bg-surface-container-low hover:text-primary hover:border-primary/30 transition-colors text-xs font-bold flex items-center cursor-pointer"
                  >
                    Show less
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
