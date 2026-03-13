import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormField } from '@/shared/models/forms/form-field.model';
import { fileSizeValidator } from './file-size.validator';

export function buildDynamicForm(formBuilder: FormBuilder, fields: FormField[]): FormGroup {
  const groupConfig: Record<string, FormControl> = {};

  for (const field of fields) {
    const initialValue = getInitialValue(field);
    const validators = [...(field.validators ?? [])];
    if (field.maxFileSizeMb) validators.push(fileSizeValidator(field.maxFileSizeMb));

    groupConfig[field.key] = new FormControl(
      { value: initialValue, disabled: !!field.readonly },
      { validators },
    );
  }

  return formBuilder.group(groupConfig);
}

function getInitialValue(field: FormField): unknown {
  if (field.type === 'number') return null;
  if (field.type === 'date') return null;
  if (field.type === 'file') return null;
  if (field.type === 'checkbox') return false;
  return '';
}
