import { FormGroup } from '@angular/forms';
import { FormField, SelectOption } from '@/shared/models/forms/form-field.model';

export function resolveSelectOptions(
  field: FormField,
  form: FormGroup,
  metadata: unknown | null,
): SelectOption[] {
  const selectSource = field.selectSource;
  if (!selectSource) return [];

  if (selectSource.kind === 'static') return selectSource.options;

  if (!metadata || typeof metadata !== 'object') return [];

  const metadataObject = metadata as Record<string, unknown>;

  if (selectSource.kind === 'metadata') {
    const optionsFromMetadata = metadataObject[selectSource.key];
    return Array.isArray(optionsFromMetadata)
      ? (optionsFromMetadata as SelectOption[])
      : [];
  }

  if (selectSource.kind === 'metadataBy') {
    const parentFieldValue = String(form.get(selectSource.dependsOn)?.value ?? '');
    if (!parentFieldValue) return [];

    const optionsByParentValue = metadataObject[selectSource.key];
    if (!optionsByParentValue || typeof optionsByParentValue !== 'object') return [];

    const optionsForSelectedParent = (optionsByParentValue as Record<string, unknown>)[parentFieldValue];
    return Array.isArray(optionsForSelectedParent)
      ? (optionsForSelectedParent as SelectOption[])
      : [];
  }

  return [];
}
