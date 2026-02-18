import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormField } from '@/shared/models/forms/form-field.model';

export function buildDynamicForm(
  formBuilder: FormBuilder,
  fields: FormField[],
): FormGroup {
  const groupConfig: Record<string, FormControl> = {};

  for (const field of fields) {
    const initialValue = getInitialValue(field);
    groupConfig[field.key] = new FormControl(
      { value: initialValue, disabled: !!field.readonly },
      { validators: field.validators ?? [] },
    );
  }

  return formBuilder.group(groupConfig);
}

function getInitialValue(field: FormField): unknown {
  if (field.type === 'number') return null;
  if (field.type === 'date') return null;
  if (field.type === 'file') return null;
  return '';
}
