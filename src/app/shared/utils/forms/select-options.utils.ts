import { FormGroup } from '@angular/forms';
import { FormField, SelectOption } from '@/shared/models/forms/form-field.model';

export function resolveSelectOptions(
  field: FormField,
  form: FormGroup,
  metadata: unknown | null,
): SelectOption[] {
  const source = field.selectSource;
  if (!source) return [];

  if (source.kind === 'static') return source.options;

  if (!metadata || typeof metadata !== 'object') return [];

  const m = metadata as Record<string, unknown>;

  if (source.kind === 'metadata') {
    const value = m[source.key];
    return Array.isArray(value) ? (value as SelectOption[]) : [];
  }

  if (source.kind === 'metadataBy') {
    const dependsValue = String(form.get(source.dependsOn)?.value ?? '');
    if (!dependsValue) return [];

    const dict = m[source.key];
    if (!dict || typeof dict !== 'object') return [];

    const options = (dict as Record<string, unknown>)[dependsValue];
    return Array.isArray(options) ? (options as SelectOption[]) : [];
  }

  return [];
}
