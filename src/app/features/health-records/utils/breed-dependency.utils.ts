import { FormGroup } from '@angular/forms';
import { SelectOption } from '@/shared/models/forms/form-field.model';
import { HealthRecordFormMetadata } from '@/features/health-records/services/health-record-metadata.api';

export function applyBreedDependencyRule(
  form: FormGroup,
  metadata: HealthRecordFormMetadata | null,
): void {
  if (!metadata) return;

  const animalType = String(form.get('animalType')?.value ?? '');
  const breedCtrl = form.get('breed');
  if (!breedCtrl) return;

  if (!animalType) {
    if (String(breedCtrl.value ?? '') !== '') breedCtrl.setValue('');
    return;
  }

  const options: SelectOption[] = metadata.breedsByAnimalType?.[animalType] ?? [];
  const allowed = options.map((o) => o.code);
  const current = String(breedCtrl.value ?? '');

  if (current && !allowed.includes(current)) {
    breedCtrl.setValue(allowed.includes('OTHER') ? 'OTHER' : '');
    breedCtrl.markAsDirty();
  }
}
