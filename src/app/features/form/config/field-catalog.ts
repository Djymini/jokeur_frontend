import { FormField } from '../models/form-field.model';

const defineField = <T extends FormField>(field: T): T => field;

export const FIELD_CATALOG = {
  petName: defineField({
    key: 'petName',
    label: 'Nom',
    placeholder: 'Ex : Nala',
    required: true,
    type: 'text',
  }),

} as const;

export type FieldKey = keyof typeof FIELD_CATALOG;
