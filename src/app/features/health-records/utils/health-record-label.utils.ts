import { HealthRecordFormMetadata } from '../services/health-record-metadata.api';

export function resolveLabel(
  code: string | null | undefined,
  options: { code: string; label: string }[],
): string {
  if (!code) return '';
  return options.find((o) => o.code === code)?.label ?? code;
}

export function resolveBreedLabel(
  breed: string | null | undefined,
  animalType: string | null | undefined,
  metadata: HealthRecordFormMetadata | null,
): string {
  if (!breed || !animalType || !metadata) return breed ?? '';
  const breeds = metadata.breedsByAnimalType[animalType] ?? [];
  return breeds.find((o) => o.code === breed)?.label ?? breed;
}
