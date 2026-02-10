import { MeasureServiceAction } from '@/features/measures/interfaces/measureServiceAction';
import { MeasureModel } from '@/features/measures/models/measureModel';
import {
  MeasureServiceActionBase
} from '../measure-service-action/MeasureServiceActionBase';
import { MeasuresApi } from '@/features/measures/services/measures-api';
import { MeasuresStore } from '@/features/measures/services/measures-store';

export class BpmServiceAction extends MeasureServiceActionBase implements MeasureServiceAction {
  constructor(measureApi: MeasuresApi, measureStore: MeasuresStore) {
    super(measureApi, measureStore);
  }

  getEndpoint(healthRecordNumber: number): string {
    return '/measure/bpm/' + healthRecordNumber;
  }

  async getMeasure(data: number): Promise<MeasureModel[]> {
    const currentData = this._measureStore.bpmArray()

    if (!currentData || currentData.length === 0) {
      const response = await this._measureApi.getMeasure(this.getEndpoint(data));
      this._measureStore.setRespiratoryRate(response);
    }

    return this._measureStore.respiratoryRateArray() || [];
  }

  public addMeasure(data: MeasureModel):void  {
    this._measureStore.addRespiratoryRate(data);
  }

  public modify(id: number, newValue:number):void {
    this._measureStore.modifyRespiratoryRate(id, newValue);
  }

  public remove(id: number):void {
    this._measureStore.removeRespiratoryRate(id);
  }
}
