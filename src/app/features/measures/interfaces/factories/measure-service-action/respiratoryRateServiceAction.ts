import { MeasureServiceAction } from '@/features/measures/interfaces/measureServiceAction';
import { MeasureModel } from '@/features/measures/models/measureModel';
import { MeasureServiceActionBase } from '../measure-service-action/MeasureServiceActionBase';
import { MeasuresStore } from '@/features/measures/services/measures-store';
import { MeasuresApi } from '@/features/measures/services/measures-api';

export class RespiratoryRateServiceAction
  extends MeasureServiceActionBase
  implements MeasureServiceAction
{
  constructor(measureApi: MeasuresApi, measureStore: MeasuresStore) {
    super(measureApi, measureStore);
  }
  getEndpoint(healthRecordNumber: number): string {
    return healthRecordNumber + '/respiratory_rate';
  }

  async getMeasure(data: number): Promise<MeasureModel[]> {
    const currentData = this._measureStore.respiratoryRateArray();

    if (!currentData || currentData.length === 0) {
      const response = await this._measureApi.getMeasure(this.getEndpoint(data));
      this._measureStore.setRespiratoryRate(response);
    }

    return this._measureStore.respiratoryRateArray() || [];
  }

  public addMeasure(measureToModify: MeasureModel): void {
    this._measureStore.addRespiratoryRate(measureToModify);
  }

  public modify(id: number, newValue: number): void {
    this._measureStore.modifyRespiratoryRate(id, newValue);
  }

  public remove(id: number): void {
    this._measureStore.removeRespiratoryRate(id);
  }
}
