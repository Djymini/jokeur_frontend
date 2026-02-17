import { Injectable, signal } from '@angular/core';
import { HealthRecord } from '../models/health-record.model';

@Injectable({ providedIn: 'root' })
export class HealthRecordStore {
  private readonly _healthRecords = signal<HealthRecord[]>([]);

  readonly healthRecords = this._healthRecords.asReadonly();

  addHealthRecord(healthRecord: HealthRecord): void {
    this._healthRecords.update((records) => [...records, healthRecord]);
  }

  removeHealthRecord(healthRecordNumber: number): void {
    this._healthRecords.update((records) =>
      records.filter((r) => r.healthRecordNumber !== healthRecordNumber),
    );
  }

  updateHealthRecord(updated: HealthRecord): void {
    this._healthRecords.update((records) =>
      records.map((r) => (r.healthRecordNumber === updated.healthRecordNumber ? updated : r)),
    );
  }

  clear(): void {
    this._healthRecords.set([]);
  }

  setHealthRecords(records: HealthRecord[]): void {
    this._healthRecords.set(records);
  }
}
