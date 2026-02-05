import { inject, Injectable } from '@angular/core';
import { MeasuresApi } from '@/features/measures/services/measures-api';
import { MeasuresStore } from '@/features/measures/services/measures-store';
import { AddMeasureDtoRecord } from '@/features/measures/models/addMeasureDtoRecord';
import { MeasureModel } from '@/features/measures/models/measureModel';
import { toast } from 'ngx-sonner';
import { MeasureRules } from '@/features/measures/domain/measure.rules';
import { MeasureDtoRecord } from '@/features/measures/models/measureDtoRecord';

@Injectable({
  providedIn: 'root',
})
export class MeasuresFacade {
  private _measureApi = inject(MeasuresApi);
  private _measureStore = inject(MeasuresStore);

  private _storeAddActions: Record<string, (measure: MeasureModel) => void> = {
    weight: (measure) => this._measureStore.addWeight(measure),
    temperature: (measure) => this._measureStore.addTemperature(measure),
    bpm: (measure) => this._measureStore.addBpm(measure),
    'respiratory rate': (measure) => this._measureStore.addRespiratoryRate(measure),
  };

  private _storeModdifyActions: Record<string, (id: number, newValue: number) => void> = {
    weight: (id, newValue) => this._measureStore.modifyWeight(id, newValue),
    temperature: (id, newValue) => this._measureStore.modifyTemperature(id, newValue),
    bpm: (id, newValue) => this._measureStore.modifyBpm(id, newValue),
    'respiratory rate': (id, newValue) => this._measureStore.modifyRespiratoryRate(id, newValue),
  };

  private _storeRemoveActions: Record<string, (id: number) => void> = {
    weight: (id) => this._measureStore.removeWeight(id),
    temperature: (id) => this._measureStore.removeTemperature(id),
    bpm: (id) => this._measureStore.removeBpm(id),
    'respiratory rate': (id) => this._measureStore.removeRespiratoryRate(id),
  };

  async addMeasure(data: AddMeasureDtoRecord): Promise<MeasureModel> {
    //TODO: measure facade wait backend for finish
    //const newMeasure: MeasureModel = await this._measureApi.addMeasure(data);
    console.log(data);
    const newMeasure: MeasureModel = {
      id: 50,
      value: data.value,
      type: data.type,
      creationDate: "2025-02-05",
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
    const msgConfirmation = "C'est fait"

    MeasureRules.validateType(data.type);
    this._storeRemoveActions[data.type](data.id);

    toast.success(msgConfirmation, {
      duration: 2000,
    });
  }
}
