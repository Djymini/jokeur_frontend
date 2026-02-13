import { Injectable, inject } from '@angular/core';
import { HealthRecordFormMetadata, HealthRecordMetadataApi } from './health-record-metadata.api';
import { HealthRecordApi } from './health-record.api';
import { CreateHealthRecordDto } from '../models/create-health-record.dto';
import { HealthRecord } from '../models/health-record.model';
import { HealthRecordRules } from '../domain/health-record.rules';

@Injectable({ providedIn: 'root' })
export class HealthRecordFacade {
  private readonly _api = inject(HealthRecordApi);
  private readonly _metadataApi = inject(HealthRecordMetadataApi);

  async loadFormMetadata(): Promise<HealthRecordFormMetadata> {
    try {
      return await this._metadataApi.getMetadata();
    } catch (error) {
      console.error('[METADATA ERROR]', error);

      try {
        const url = new URL('assets/mocks/health-record-form-metadata.json', document.baseURI).toString();
        const res = await fetch(url, { cache: 'no-store' });

        if (!res.ok) {
          throw new Error(`Failed to load metadata (${res.status})`);
        }

        return (await res.json()) as HealthRecordFormMetadata;
      } catch (fallbackError) {
        console.error('[FALLBACK ERROR]', fallbackError);
        throw new Error('Impossible de charger les données du formulaire');
      }
    }
  }

  async createFromFormPayload(
    payload: Record<string, unknown>,
    ownerId: number,
  ): Promise<HealthRecord> {
    try {
      const dto: CreateHealthRecordDto = {
        ownerId,
        petName: this._requiredString(payload, 'petName'),
        animalType: this._requiredString(payload, 'animalType'),
        breed: this._optionalString(payload, 'breed'),
        sex: this._requiredString(payload, 'sex'),
        birthDate: this._optionalString(payload, 'birthDate'),
        currentWeight: this._requiredNumber(payload, 'currentWeight'),
        color: this._optionalString(payload, 'color'),
        identificationNumber: this._optionalString(payload, 'identificationNumber'),
        tattooNumber: this._optionalString(payload, 'tattooNumber'),
        allergy: this._optionalString(payload, 'allergy'),
      };

      HealthRecordRules.validate(dto);

      const healthRecord = await this._api.createHealthRecord(dto);

      return healthRecord;

    } catch (error) {
      console.error('[CREATE HEALTH RECORD ERROR]', error);

      if (error instanceof Error) {
        throw error;
      }

      throw new Error('Une erreur inattendue est survenue');
    }
  }

  private _requiredString(payload: Record<string, unknown>, key: string): string {
    const value = String(payload[key] ?? '').trim();
    if (!value) {
      throw new Error(`Le champ "${key}" est requis`);
    }
    return value;
  }

  private _optionalString(payload: Record<string, unknown>, key: string): string | null {
    const value = String(payload[key] ?? '').trim();
    return value.length === 0 ? null : value;
  }

  private _requiredNumber(payload: Record<string, unknown>, key: string): number {
    const value = Number(payload[key]);
    if (!Number.isFinite(value) || value <= 0) {
      throw new Error(`Le champ "${key}" doit être un nombre positif valide`);
    }
    return value;
  }
}
