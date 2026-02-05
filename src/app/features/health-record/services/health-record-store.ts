import { computed, Injectable, signal } from '@angular/core';
import { HealthRecordModel } from '@/features/health-record/models/healthRecordModel';

@Injectable({
  providedIn: 'root',
})
export class HealthRecordStore {
  //Todo: complete the health record store
  private _healthRecordSignal = signal<HealthRecordModel | undefined>( undefined)

  healthRecord = computed(() => this._healthRecordSignal());
  weightArray = computed(() => this._healthRecordSignal()!.weight);
  bpmArray = computed(() => this._healthRecordSignal()!.bpm);
  temperatureArray = computed(() => this._healthRecordSignal()!.temperature);
  respiratoryRateArray = computed(() => this._healthRecordSignal()!.respiratoryRate);
}
