import { Injectable } from '@angular/core';
import { BaseApi } from '@/internal-shared/services/base.api';
import { SelectOption } from '@/shared/models/forms/form-field.model';

export type HealthRecordFormMetadata = {
  animalTypes: SelectOption[];
  sexes: SelectOption[];
  colors: SelectOption[];
  breedsByAnimalType: Record<string, SelectOption[]>;
};

@Injectable({ providedIn: 'root' })
export class HealthRecordMetadataApi extends BaseApi {
  async getMetadata(): Promise<HealthRecordFormMetadata> {
    const res = await fetch('/mocks/health-record-form-metadata.json', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Failed to load metadata (${res.status})`);
    }
    return (await res.json()) as HealthRecordFormMetadata;
  }
}
