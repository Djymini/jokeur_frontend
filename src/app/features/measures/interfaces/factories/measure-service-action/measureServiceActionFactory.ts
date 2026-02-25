import { MeasureServiceAction } from '../../measureServiceAction';
import { WeightServiceAction } from '../measure-service-action/weightServiceAction';
import { BpmServiceAction } from '../measure-service-action/bpmServiceAction';
import { TemperatureServiceAction } from '../measure-service-action/temperatureServiceAction';
import { RespiratoryRateServiceAction } from '../measure-service-action/respiratoryRateServiceAction';
import { MeasuresStore } from '@/features/measures/services/measures-store';
import { MeasuresApi } from '@/features/measures/services/measures-api';

export class MeasureServiceActionFactory {
  public static createMeasureServiceAction(
    canal: string,
    measureApi: MeasuresApi,
    measureStore: MeasuresStore,
  ): MeasureServiceAction {
    if (canal === null || canal.length === 0) {
      throw new Error('canal invalide la création de measureServiceAction ne peut se faire');
    }

    switch (canal) {
      case 'weight':
        return new WeightServiceAction(measureApi, measureStore);
      case 'bpm':
        return new BpmServiceAction(measureApi, measureStore);
      case 'temperature':
        return new TemperatureServiceAction(measureApi, measureStore);
      case 'respiratory_rate':
        return new RespiratoryRateServiceAction(measureApi, measureStore);
      default:
        return new WeightServiceAction(measureApi, measureStore);
    }
  }
}
