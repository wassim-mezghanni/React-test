import type { UseCaseSchema, UseCaseSection, UseCaseField } from '../../types/usecase';
import Input from '../../components/form/Input';
import Select from '../../components/form/Select';
import { MetadataDropdown } from '../../components/form/MetadataDropdown';

interface SchemaRendererProps {
  schema: UseCaseSchema;
  values: Record<string, any>;
  errors: Record<string, string>;
  onChange: (id: string, value: any) => void;
  className?: string;
}

export default function SchemaRenderer({
  schema,
  values,
  errors,
  onChange,
  className = '',
}: SchemaRendererProps) {

  const renderField = (field: UseCaseField) => {
    const commonProps = {
      label: field.label,
      placeholder: field.placeholder,
      error: errors[field.id],
      required: field.required,
      className: 'transition-all duration-300',
    };

    switch (field.type) {
      case 'toggle':
        // Segmented toggle for string options like ["Absolute", "Percentage"]
        const options = (field.options || []) as string[];
        const current = values[field.id] || field.default || options[0];
        return (
          <div key={field.id} className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              {field.label}
              {field.required && <span className="text-error ml-0.5">*</span>}
            </label>
            <div className="flex bg-surface-container-high rounded-xl p-1 gap-1">
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onChange(field.id, opt)}
                  className={`flex-1 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    current === opt
                      ? 'bg-primary text-white shadow-md'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );

      case 'period_range':
        // Group of sub-fields rendered as a labeled card
        return (
          <div key={field.id} className="col-span-full">
            <div className="bg-surface-container-lowest/50 rounded-xl p-5 border border-outline-variant/10 space-y-4">
              <div className="flex items-center gap-2">
                <span className="icon text-primary text-lg">date_range</span>
                <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">{field.label}</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(field.fields || []).map(renderField)}
              </div>
            </div>
          </div>
        );

      case 'dropdown':
        if (field.source) {
          return (
            <MetadataDropdown
              key={field.id}
              source={field.source.split('/')[0] || field.source}
              endpoint={field.source.split('/')[1] || field.source}
              value={values[field.id] || field.default || field.defaultValue || ''}
              onChange={(val) => onChange(field.id, val)}
              label={field.label}
              icon="database"
              className={commonProps.className}
            />
          );
        }
        return (
          <Select
            key={field.id}
            {...commonProps}
            options={(field.options || []).map(o =>
              typeof o === 'string' ? { value: o, label: o } : o
            )}
            value={values[field.id] || field.default || field.defaultValue || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
          />
        );

      case 'number':
        return (
          <Input
            key={field.id}
            {...commonProps}
            type="number"
            value={values[field.id] ?? field.default ?? field.defaultValue ?? ''}
            onChange={(e) => onChange(field.id, e.target.value)}
          />
        );

      default: // text
        return (
          <Input
            key={field.id}
            {...commonProps}
            type="text"
            value={values[field.id] || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
          />
        );
    }
  };

  const renderSection = (section: UseCaseSection) => (
    <div key={section.id} className="space-y-4">
      <div className="flex items-center gap-2 pb-1">
        <div className="w-1 h-4 rounded-full bg-primary" />
        <h3 className="text-sm font-bold text-on-surface font-heading tracking-tight">{section.label}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {section.fields.map(renderField)}
      </div>
    </div>
  );

  // If schema has sections, render sectioned layout
  if (schema.sections && schema.sections.length > 0) {
    return (
      <div className={`space-y-6 p-6 bg-surface-container-low/20 rounded-2xl border border-outline-variant/10 ${className}`}>
        {schema.sections.map(renderSection)}
      </div>
    );
  }

  // Fallback: flat fields
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-surface-container-low/20 rounded-2xl border border-outline-variant/10 ${className}`}>
      {schema.fields.map(renderField)}
    </div>
  );
}
