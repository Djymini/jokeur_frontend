import { computed, Injectable, signal } from '@angular/core';
import { HealthRecordModel } from '@/features/health-record/models/healthRecordModel';

@Injectable({
  providedIn: 'root',
})
export class HealthRecordStore {
  //Todo: complete the health record store
  private _healthRecordSignal = signal<HealthRecordModel | undefined>(undefined);

  healthRecord = computed(() => this._healthRecordSignal());
  weightArray = computed(() => this._healthRecordSignal()!.measures.weight);
  bpmArray = computed(() => this._healthRecordSignal()!.measures.bpm);
  temperatureArray = computed(() => this._healthRecordSignal()!.measures.temperature);
  respiratoryRateArray = computed(() => this._healthRecordSignal()!.measures.respiratoryRate);

  setHealthRecord(newHealthRecord: HealthRecordModel): void {
    this._healthRecordSignal.set(newHealthRecord);
  }
}
