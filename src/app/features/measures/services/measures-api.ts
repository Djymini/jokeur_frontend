import { Injectable } from '@angular/core';
import { AddMeasureDtoRecord } from '@/features/measures/models/addMeasureDtoRecord';
import { MeasureModel } from '@/features/measures/models/measureModel';
import { MeasureDtoRecord } from '@/features/measures/models/measureDtoRecord';
import { BaseApi } from '../../../internal-shared/services/base.api';

@Injectable({
  providedIn: 'root',
})
export class MeasuresApi extends BaseApi {
  async getMeasure(endpoint: string): Promise<MeasureModel[]> {
    return this.get<MeasureModel[]>('/measures/' + endpoint);
  }

  async addMeasure(measureRecord: AddMeasureDtoRecord): Promise<MeasureModel> {
    return this.post<MeasureModel>('/measures', measureRecord);
  }

  async modifyMeasure(measureRecord: MeasureDtoRecord): Promise<MeasureModel> {
    return this.put<MeasureModel>(
      `/measures/${measureRecord.healthRecordId}/${measureRecord.id}`,
      measureRecord.value,
    );
  }

  async deleteMeasure(measureRecord: MeasureDtoRecord): Promise<string> {
    return this.delete<string>(`/measures/${measureRecord.healthRecordId}/${measureRecord.id}`);
  }
}
