import { inject, Injectable } from '@angular/core';
import { HealthRecordApi } from '@/features/health-record/services/health-record-api';
import { HealthRecordStore } from '@/features/health-record/services/health-record-store';
import { HealthRecordModel } from '@/features/health-record/models/healthRecordModel';

@Injectable({
  providedIn: 'root',
})
export class HealthRecordFacade {
  //TODO: make the health record facade
  private _healthRecordApi = inject(HealthRecordApi);
  private _healthRecordStore = inject(HealthRecordStore);

  async getHealthRecordById(id: string): Promise<HealthRecordModel> {
    if (
      this._healthRecordStore.healthRecord() === undefined ||
      this._healthRecordStore.healthRecord()!.id.toString() !== id
    ) {
      const newHealthRecord = await this._healthRecordApi.getHealthRecord(id);
      this._healthRecordStore.setHealthRecord(newHealthRecord);
    }

    return this._healthRecordStore.healthRecord()!;
  }
}
