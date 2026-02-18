import { computed, Injectable, signal } from '@angular/core';
import { HealthRecord } from '../models/health-record.model';

@Injectable({ providedIn: 'root' })
export class HealthRecordStore {
  private readonly _healthRecords = signal<HealthRecord[]>([]);
  private _healthRecordSignal = signal<HealthRecord | undefined>(undefined);

  healthRecord = computed(() => this._healthRecordSignal());
  weightArray = computed(() => this._healthRecordSignal()!.measures.weight);
  bpmArray = computed(() => this._healthRecordSignal()!.measures.bpm);
  temperatureArray = computed(() => this._healthRecordSignal()!.measures.temperature);
  respiratoryRateArray = computed(() => this._healthRecordSignal()!.measures.respiratoryRate);

  readonly healthRecords = this._healthRecords.asReadonly();

  addHealthRecord(healthRecord: HealthRecord): void {
    this._healthRecords.update((records) => [...records, healthRecord]);
  }

  removeHealthRecord(healthRecordNumber: number): void {
    this._healthRecords.update((records) => records.filter((r) => r.id !== healthRecordNumber));
  }

  updateHealthRecord(updated: HealthRecord): void {
    this._healthRecords.update((records) =>
      records.map((r) => (r.id === updated.id ? updated : r)),
    );
  }

  clear(): void {
    this._healthRecords.set([]);
  }

  setHealthRecords(records: HealthRecord[]): void {
    this._healthRecords.set(records);
  }

  setHealthRecord(newHealthRecord: HealthRecord): void {
    this._healthRecordSignal.set(newHealthRecord);
  }
}
