import { MeasureServiceAction } from '@/features/measures/interfaces/measureServiceAction';
import { MeasureModel } from '@/features/measures/models/measureModel';
import { MeasureServiceActionBase } from '../measure-service-action/MeasureServiceActionBase';
import { MeasuresApi } from '@/features/measures/services/measures-api';
import { MeasuresStore } from '@/features/measures/services/measures-store';

export class BpmServiceAction extends MeasureServiceActionBase implements MeasureServiceAction {
  constructor(measureApi: MeasuresApi, measureStore: MeasuresStore) {
    super(measureApi, measureStore);
  }

  getEndpoint(healthRecordNumber: number): string {
    return healthRecordNumber + '/bpm';
  }

  async getMeasure(data: number): Promise<MeasureModel[]> {
    const currentData = this._measureStore.bpmArray();

    if (!currentData || currentData.length === 0) {
      const response = await this._measureApi.getMeasure(this.getEndpoint(data));
      this._measureStore.setBpm(response);
    }

    return this._measureStore.respiratoryRateArray() || [];
  }

  public addMeasure(measureToModify: MeasureModel): void {
    this._measureStore.addBpm(measureToModify);
  }

  public modify(id: number, newValue: number): void {
    this._measureStore.modifyBpm(id, newValue);
  }

  public remove(id: number): void {
    this._measureStore.removeBpm(id);
  }
}
