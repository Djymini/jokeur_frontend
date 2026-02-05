import { Injectable } from '@angular/core';
import { AddMeasureDtoRecord } from '@/features/measures/models/addMeasureDtoRecord';
import { MeasureDtoResponse } from '@/features/measures/models/measureDtoResponse';
import { MeasureDtoRecord } from '@/features/measures/models/measureDtoRecord';
import { BaseApi } from '@/internal-shared/services/base.api';

@Injectable({
  providedIn: 'root',
})
export class MeasuresApi extends BaseApi {
  async getMeasure(healthRecordNumber: number): Promise<MeasureDtoResponse[]> {
    return this.get<MeasureDtoResponse[]>('/measure/'+healthRecordNumber);
  }

  async addMeasure(measureRecord: AddMeasureDtoRecord): Promise<MeasureDtoResponse> {
    return this.post<MeasureDtoResponse>('measure', measureRecord);
  }

  async modifyMeasure(measureRecord: MeasureDtoRecord): Promise<MeasureDtoResponse> {
    return this.put<MeasureDtoResponse>('measure', measureRecord);
  }

  async deleteeasure(measureRecord: MeasureDtoRecord): Promise<string> {
    return this.delete<string>('measure/'+measureRecord.id);
  }
}
