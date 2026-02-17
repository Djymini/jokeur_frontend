import { Injectable } from '@angular/core';
import { BaseApi } from '@/internal-shared/services/base.api';
import { HealthRecordModel } from '@/internal-shared/domaine/HealthRecordModel';

@Injectable({ providedIn: 'root' })
export class HealthRecordApiService extends BaseApi {
  private readonly _endpoint = '/health-records';

  async getAnimalInformation(): Promise<HealthRecordModel[]> {
    const idOwner = 1;
    return this.get<HealthRecordModel[]>(this._endpoint + `?idOwner=${idOwner}`);
  }
}
