import { FormField } from './form-field.model';

export type FormDefinition = {
  id: string;
  title: string;
  submitLabel: string;
  cancelLabel: string;
  fields: FormField[];
};
