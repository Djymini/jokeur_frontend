import { MeasuresStore } from '@/features/measures/services/measures-store';
import { MeasuresApi } from '@/features/measures/services/measures-api';

export class MeasureServiceActionBase {
  protected _measureStore: MeasuresStore;
  protected _measureApi: MeasuresApi;

  constructor(measureApi: MeasuresApi, measureStore: MeasuresStore) {
    this._measureApi = measureApi;
    this._measureStore = measureStore;
  }
}
