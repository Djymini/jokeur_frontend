import { computed, Injectable, signal } from '@angular/core';
import { HealthRecord } from '../models/health-record.model';
import { MeasureModel } from '@/features/measures/models/measureModel';
import { MeasureDtoRecord } from '@/features/measures/models/measureDtoRecord';

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
    if (this._healthRecordSignal()?.id === updated.id) {
      this.setHealthRecord(updated);
    }
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

  addMeasureToCurrentRecord(newMeasure: MeasureModel, type: keyof HealthRecord['measures']): void {
    const current = this._healthRecordSignal();
    if (current) {
      this._healthRecordSignal.set({
        ...current,
        measures: {
          ...current.measures,
          [type]: [...current.measures[type], newMeasure],
        },
      });
    }
  }

  modifyMeasureInCurrentRecord(
    updatedMeasure: MeasureDtoRecord,
    type: keyof HealthRecord['measures'],
  ): void {
    const newMeasure: MeasureModel = {
      id: updatedMeasure.id,
      value: updatedMeasure.value,
      healthRecordId: updatedMeasure.healthRecordId,
      measureType: updatedMeasure.measureType,
      creationDate: updatedMeasure.creationDate,
    };
    const current = this._healthRecordSignal();
    if (current) {
      this._healthRecordSignal.set({
        ...current,
        measures: {
          ...current.measures,
          [type]: current.measures[type].map((m) => (m.id === newMeasure.id ? newMeasure : m)),
        },
      });
    }

    if (
      newMeasure.measureType.toLowerCase() === 'weight' &&
      newMeasure.id ===
        this.healthRecord()?.measures.weight[this.healthRecord()!.measures.weight.length - 1]?.id
    ) {
      this.modifyCurrentWeight(newMeasure.value);
    }
  }

  modifyCurrentWeight(newCurrentWeight: number): void {
    const current = this._healthRecordSignal();
    if (current) {
      this._healthRecordSignal.set({
        ...current,
        currentWeight: newCurrentWeight,
      });
    }
  }

  removeMeasureFromCurrentRecord(measureId: number, type: keyof HealthRecord['measures']): void {
    const current = this._healthRecordSignal();
    if (current) {
      this._healthRecordSignal.set({
        ...current,
        measures: {
          ...current.measures,
          [type]: current.measures[type].filter((m) => m.id !== measureId),
        },
      });
    }
  }
}
