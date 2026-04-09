import type { UseCaseSchema, UseCaseField } from '../../types/usecase';

/**
 * Convert a raw use-case schema JSON file into a typed UseCaseSchema.
 * Works for any use case that follows the standard section/field format.
 */
interface SchemaFieldJson {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  source?: string;
  default?: string | number;
  placeholder?: string;
  options?: string[];
  fields?: SchemaFieldJson[];
}

interface SchemaSectionJson {
  id: string;
  label: string;
  fields: SchemaFieldJson[];
}

interface SchemaJson {
  usecase_id: string;
  name: string;
  description: string;
  sections: SchemaSectionJson[];
}

export function parseSchemaJson(json: SchemaJson): UseCaseSchema {
  const mapField = (f: SchemaFieldJson): UseCaseField => ({
    id: f.id,
    label: f.label,
    type: f.type as UseCaseField['type'],
    required: f.required,
    source: f.source,
    default: f.default,
    placeholder: f.placeholder,
    options: f.options,
    fields: f.fields?.map(mapField),
  });

  return {
    id: json.usecase_id,
    name: json.name,
    description: json.description,
    fields: [],
    sections: json.sections.map((s) => ({
      id: s.id,
      label: s.label,
      fields: s.fields.map(mapField),
    })),
  };
}
