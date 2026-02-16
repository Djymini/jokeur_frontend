import { FormField } from './form-field.model';

export type FormModalConfig<TValue extends Record<string, unknown> = Record<string, unknown>> = {
  title: string;
  submitLabel: string;
  cancelLabel: string;
  fields: FormField[];
  initialValue?: Partial<TValue>;
  layout: 'oneColumn' | 'twoColumns';
};
