import { MeasureServiceAction } from '@/features/measures/interfaces/measureServiceAction';
import { MeasureServiceActionBase } from '../measure-service-action/MeasureServiceActionBase';
import { MeasureModel } from '@/features/measures/models/measureModel';
import { MeasuresApi } from '@/features/measures/services/measures-api';
import { MeasuresStore } from '@/features/measures/services/measures-store';

export class WeightServiceAction extends MeasureServiceActionBase implements MeasureServiceAction {
  constructor(measureApi: MeasuresApi, measureStore: MeasuresStore) {
    super(measureApi, measureStore);
  }

  getEndpoint(healthRecordNumber: number): string {
    return healthRecordNumber + '/weight';
  }

  async getMeasure(data: number): Promise<MeasureModel[]> {
    const currentData = this._measureStore.weightArray();

    if (!currentData || currentData.length === 0) {
      const response = await this._measureApi.getMeasure(this.getEndpoint(data));
      this._measureStore.setWeight(response);
    }

    return this._measureStore.weightArray() || [];
  }

  public addMeasure(measureToModify: MeasureModel): void {
    this._measureStore.addWeight(measureToModify);
  }

  public modify(id: number, newValue: number): void {
    this._measureStore.modifyWeight(id, newValue);
  }

  public remove(id: number): void {
    this._measureStore.removeWeight(id);
  }
}
