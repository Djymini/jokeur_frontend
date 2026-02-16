import { Injectable, inject } from '@angular/core';
import { HealthRecordFormMetadata, HealthRecordMetadataApi } from './health-record-metadata.api';
import { HealthRecordApi } from './health-record.api';
import { HealthRecordStore } from './health-record.store';
import { CreateHealthRecordDto } from '../models/create-health-record.dto';
import { HealthRecord } from '../models/health-record.model';
import { HealthRecordRules } from '../domain/health-record.rules';

@Injectable({ providedIn: 'root' })
export class HealthRecordFacade {
  private readonly _api = inject(HealthRecordApi);
  private readonly _metadataApi = inject(HealthRecordMetadataApi);
  private readonly _store = inject(HealthRecordStore);

  async loadFormMetadata(): Promise<HealthRecordFormMetadata> {
    try {
      return await this._metadataApi.getMetadata();
    } catch (error) {
      console.error('[METADATA ERROR]', error);

      try {
        const res = await fetch('/mocks/health-record-form-metadata.json', { cache: 'no-store' });
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

  async loadHealthRecords(ownerId: number): Promise<HealthRecord[]> {
    try {
      const records = await this._api.getHealthRecordsByOwner(ownerId);

      this._store.setHealthRecords(records);

      return records;
    } catch (error) {
      console.error('[LOAD HEALTH RECORDS ERROR]', error);
      throw new Error('Impossible de charger les carnets de santé');
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

      this._store.addHealthRecord(healthRecord);

      return healthRecord;

    } catch (error) {
      console.error('[CREATE HEALTH RECORD ERROR]', error);

      if (error instanceof Error) {
        throw error;
      }

      throw new Error('Une erreur inattendue est survenue');
    }
  }

  async deleteHealthRecord(healthRecordNumber: number): Promise<void> {
    try {
      await this._api.deleteHealthRecord(healthRecordNumber);

      this._store.removeHealthRecord(healthRecordNumber);

    } catch (error) {
      console.error('[DELETE HEALTH RECORD ERROR]', error);
      throw new Error('Impossible de supprimer le carnet de santé');
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
