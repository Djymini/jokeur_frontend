import { Injectable, inject, DOCUMENT } from '@angular/core';
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
  private readonly _document = inject(DOCUMENT);

  async getMetadata(): Promise<HealthRecordFormMetadata> {
    const baseUrl = this._document.location.origin;
    const res = await fetch(`${baseUrl}/mocks/health-record-form-metadata.json`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`Failed to load metadata (${res.status})`);
    }
    return (await res.json()) as HealthRecordFormMetadata;
  }
}
