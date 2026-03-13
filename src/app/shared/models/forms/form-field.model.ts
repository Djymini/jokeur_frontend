import { ValidatorFn } from '@angular/forms';

export type SelectOption = { code: string; label: string };

export type FieldType = 'text' | 'number' | 'date' | 'textarea' | 'file' | 'select' | 'checkbox' | 'radio';

export type SelectSource =
  | { kind: 'static'; options: SelectOption[] }
  | { kind: 'metadata'; key: 'animalTypes' | 'sexes' | 'colors' }
  | { kind: 'metadataBy'; key: 'breedsByAnimalType'; dependsOn: string };

export type RadioOption = { value: string; label: string };

export type FormField = {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  ariaLabel?: string;
  readonly?: boolean;
  inputMode?: 'text' | 'numeric' | 'decimal';
  validators?: ValidatorFn[];
  accept?: string;
  maxFileSizeMb?: number;
  selectSource?: SelectSource;
  checkboxLabel?: string;
  radioOptions?: RadioOption[];
};
