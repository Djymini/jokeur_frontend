import { inject, Injectable } from '@angular/core';
import { MeasuresApi } from '../services/measures-api';
import { MeasuresStore } from '../services/measures-store';
import { AddMeasureDtoRecord } from '@/features/measures/models/addMeasureDtoRecord';
import { MeasureModel } from '@/features/measures/models/measureModel';
import { toast } from 'ngx-sonner';
import { MeasureRules } from '../domain/measure.rules';
import { MeasureDtoRecord } from '@/features/measures/models/measureDtoRecord';

@Injectable({
  providedIn: 'root',
})
export class MeasuresFacade {
  private _measureApi = inject(MeasuresApi);
  private _measureStore = inject(MeasuresStore);

  private _apiGetActions: Record<
    string,
    {
      apiAction: (healthRecord: number) => Promise<MeasureModel[]>;
      storeAction: (measures: MeasureModel[]) => void;
      getStoreSignal: () => MeasureModel[] | undefined;
    }
  >;

  private _storeAddActions: Record<string, (measure: MeasureModel) => void>;
  private _storeModdifyActions: Record<string, (id: number, newValue: number) => void>;
  private _storeRemoveActions: Record<string, (id: number) => void>;

  constructor() {
  this._apiGetActions = {
      weight: {
        apiAction: (healthRecord): Promise<MeasureModel[]> => this._measureApi.getWeight(healthRecord),
        storeAction: (measures): void => this._measureStore.setWeight(measures),
        getStoreSignal: (): MeasureModel[] | undefined => this._measureStore.weightArray(),
      },
      temperature: {
        apiAction: (healthRecord): Promise<MeasureModel[]> => this._measureApi.getTemperature(healthRecord),
        storeAction: (measures): void => this._measureStore.setTemperature(measures),
        getStoreSignal: (): MeasureModel[] | undefined => this._measureStore.temperatureArray(),
      },
      bpm: {
        apiAction: (healthRecord): Promise<MeasureModel[]> => this._measureApi.getBpm(healthRecord),
        storeAction: (measures): void => this._measureStore.setBpm(measures),
        getStoreSignal: (): MeasureModel[] | undefined => this._measureStore.bpmArray(),
      },
      'respiratory rate': {
        apiAction: (healthRecord): Promise<MeasureModel[]> => this._measureApi.getRespiratoryRate(healthRecord),
        storeAction: (measures): void => this._measureStore.setRespiratoryRate(measures),
        getStoreSignal: (): MeasureModel[] | undefined => this._measureStore.respiratoryRateArray(),
      },
    };

  this._storeAddActions = {
    weight: (measure): void => this._measureStore.addWeight(measure),
    temperature: (measure):void => this._measureStore.addTemperature(measure),
    bpm: (measure):void => this._measureStore.addBpm(measure),
    'respiratory rate': (measure):void => this._measureStore.addRespiratoryRate(measure),
  };

  this._storeModdifyActions = {
      weight: (id, newValue):void => this._measureStore.modifyWeight(id, newValue),
      temperature: (id, newValue):void => this._measureStore.modifyTemperature(id, newValue),
      bpm: (id, newValue): void => this._measureStore.modifyBpm(id, newValue),
      'respiratory rate': (id, newValue):void => this._measureStore.modifyRespiratoryRate(id, newValue),
    };

  this._storeRemoveActions = {
      weight: (id):void => this._measureStore.removeWeight(id),
      temperature: (id):void => this._measureStore.removeTemperature(id),
      bpm: (id): void => this._measureStore.removeBpm(id),
      'respiratory rate': (id): void => this._measureStore.removeRespiratoryRate(id),
    };
  }




  async getMeasure(data: number, type: string): Promise<MeasureModel[]> {
    MeasureRules.validateType(type);
    const action = this._apiGetActions[type];

    const currentData = action.getStoreSignal();

    if (!currentData || currentData.length === 0) {
      const response = await action.apiAction(data);
      action.storeAction(response);
    }

    toast.success('Valeur ajoutée au carnet', {
      duration: 2000,
    });

    return action.getStoreSignal() || [];
  }

  async addMeasure(data: AddMeasureDtoRecord): Promise<MeasureModel> {
    //TODO: measure facade wait backend for finish
    //const newMeasure: MeasureModel = await this._measureApi.addMeasure(data);
    console.log(data);
    const newMeasure: MeasureModel = {
      id: 50,
      value: data.value,
      type: data.type,
      creationDate: '2025-02-05',
      healthRecordNumber: data.healthRecordNumber,
    };

    MeasureRules.validateType(newMeasure.type);
    this._storeAddActions[newMeasure.type](newMeasure);

    toast.success('Valeur ajoutée au carnet', {
      duration: 2000,
    });
    return newMeasure;
  }

  async modify(data: MeasureDtoRecord): Promise<MeasureModel> {
    //TODO: measure facade wait backend for finish
    //const newMeasure = await this._measureApi.modifyMeasure(data);
    const newMeasure: MeasureModel = {
      id: data.id,
      value: data.value,
      type: data.type,
      creationDate: data.creationDate,
      healthRecordNumber: data.healthRecordNumber,
    };

    MeasureRules.validateType(newMeasure.type);
    this._storeModdifyActions[newMeasure.type](newMeasure.id, newMeasure.value);

    toast.success('Valeur ajoutée au carnet', {
      duration: 2000,
    });
    return newMeasure;
  }

  async remove(data: MeasureDtoRecord): Promise<void> {
    //TODO: measure facade wait backend for finish
    //const msgConfirmation = await this._measureApi.deleteeasure(data);
    const msgConfirmation = "C'est fait";

    MeasureRules.validateType(data.type);
    this._storeRemoveActions[data.type](data.id);

    toast.success(msgConfirmation, {
      duration: 2000,
    });
  }
}
