export type TextLikeFieldType = 'text' | 'textarea';
export type FieldType = TextLikeFieldType | 'number' | 'date' | 'datetime' | 'select' | 'file';

export type SelectOption<T = string> = {
  label: string;
  value: T;
};

type BaseField = {
  key: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
};

export type TextField = BaseField & {
  type: 'text' | 'textarea';
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
};

export type NumberField = BaseField & {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
};

export type DateField = BaseField & {
  type: 'date' | 'datetime';
};

export type SelectField = BaseField & {
  type: 'select';
  options: SelectOption[];
};

export type FileField = BaseField & {
  type: 'file';
  accept?: string;
  multiple?: boolean;
};

export type FormField = TextField | NumberField | DateField | SelectField | FileField;
