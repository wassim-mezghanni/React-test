import type { UseCaseSchema, UseCaseField } from '../../types/usecase';
import Input from '../../components/form/Input';
import { DatePicker } from '../../components/form/DatePicker';
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
      case 'date':
        return (
          <DatePicker
            key={field.id}
            {...commonProps}
            value={values[field.id] || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(field.id, e.target.value)}
          />
        );

      case 'dropdown':
        if (field.source && field.endpoint) {
          return (
            <MetadataDropdown
              key={field.id}
              source={field.source}
              endpoint={field.endpoint}
              value={values[field.id] || ''}
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
            options={field.options || []}
            value={values[field.id] || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
          />
        );

      case 'number':
        return (
          <Input
            key={field.id}
            {...commonProps}
            type="number"
            value={values[field.id] || ''}
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

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-surface-container-low/20 rounded-2xl border border-outline-variant/10 ${className}`}>
      {schema.fields.map(renderField)}
    </div>
  );
}
