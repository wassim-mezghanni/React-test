import { useQuery } from '@tanstack/react-query';
import { metadata } from '../../services/api';
import { Dropdown } from '../ui/Dropdown';
import type { DropdownOption } from '../ui/Dropdown';

interface MetadataDropdownProps {
  source: string;
  endpoint: string;
  params?: Record<string, string>;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  icon?: string;
  className?: string;
}

export function MetadataDropdown({
  source,
  endpoint,
  params,
  value,
  onChange,
  label,
  icon,
  className = '',
}: MetadataDropdownProps) {
  const { data: options = [], isLoading, isError } = useQuery({
    queryKey: ['metadata', source, endpoint, params],
    queryFn: () => metadata.get(source, endpoint, params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const dropdownOptions: DropdownOption[] = options.map((opt) => ({
    id: opt.value,
    label: opt.label,
  }));

  if (isLoading) {
    return (
      <div className={`h-[36px] min-w-[120px] bg-surface-container-low animate-pulse rounded-lg ${className}`} />
    );
  }

  if (isError) {
    return (
      <div className={`text-[10px] text-error flex items-center gap-1 ${className}`}>
        <span className="icon text-[14px]">error</span>
        <span>Error loading options</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-[11px] font-semibold text-outline px-1">{label}</label>}
      <Dropdown
        options={dropdownOptions}
        value={value}
        onChange={onChange}
        icon={icon}
      />
    </div>
  );
}
