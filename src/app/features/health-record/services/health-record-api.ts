import { Injectable } from '@angular/core';
import { BaseApi } from '@/internal-shared/services/base.api';
import { HealthRecordModel } from '@/features/health-record/models/healthRecordModel';

@Injectable({
  providedIn: 'root',
})
export class HealthRecordApi extends BaseApi {
  //TODO: make the health record api
  private readonly _endpoint = '/health-records';

  async getAnimalInformation(): Promise<HealthRecordModel[]> {
    const idOwner = 1;
    return this.get<HealthRecordModel[]>(this._endpoint + `?idOwner=${idOwner}`);
  }

  async getHealthRecord(healthRecordId: string): Promise<HealthRecordModel> {
    return this.get<HealthRecordModel>(`/health-records/${healthRecordId}`);
  }
}
