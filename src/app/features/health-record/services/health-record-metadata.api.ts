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
    return this.get<HealthRecordFormMetadata>('/health-records/form-metadata');
  }
}
