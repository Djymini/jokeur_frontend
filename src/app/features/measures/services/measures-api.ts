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
    return this.get<MeasureModel[]>(endpoint);
  }

  async addMeasure(measureRecord: AddMeasureDtoRecord): Promise<MeasureModel> {
    return this.post<MeasureModel>('measure', measureRecord);
  }

  async modifyMeasure(measureRecord: MeasureDtoRecord): Promise<MeasureModel> {
    return this.put<MeasureModel>('measure', measureRecord);
  }

  async deleteMeasure(measureRecord: MeasureDtoRecord): Promise<string> {
    return this.delete<string>('measure/' + measureRecord.id);
  }
}
