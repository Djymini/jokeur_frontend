import { inject, Injectable } from '@angular/core';
import { AddMeasureDtoRecord } from '@/features/measures/models/addMeasureDtoRecord';
import { MeasureModel } from '@/features/measures/models/measureModel';
import { toast } from 'ngx-sonner';
import { MeasureRules } from '../domain/measure.rules';
import { MeasureServiceAction } from '@/features/measures/interfaces/measureServiceAction';
import { MeasureServiceActionFactory } from '../../measures/interfaces/factories/measure-service-action/measureServiceActionFactory';
import { MeasuresApi } from '../services/measures-api';
import { MeasuresStore } from '../services/measures-store';

@Injectable({
  providedIn: 'root',
})
export class MeasuresFacade {
  private _measureApi = inject(MeasuresApi);
  private _measureStore = inject(MeasuresStore);
  measuresServiceAction: MeasureServiceAction = MeasureServiceActionFactory.createMeasureServiceAction('default', this._measureApi, this._measureStore);

  public initializeMeasureServiceAction(type: string):void {
    this.measuresServiceAction = MeasureServiceActionFactory.createMeasureServiceAction(type, this._measureApi, this._measureStore);;
  }

  async getMeasure(data: number, type: string): Promise<MeasureModel[]> {
    MeasureRules.validateType(type);
    return this.measuresServiceAction.getMeasure(data)
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
    this.measuresServiceAction.addMeasure(newMeasure);

    toast.success('Valeur ajoutée au carnet', {
      duration: 2000,
    });
    return newMeasure;
  }

  async modify(id: number, data: number):Promise<void>  {
    //TODO: measure facade wait backend for finish
    //const newMeasure = await this._measureApi.modifyMeasure(data);

    this.measuresServiceAction.modify(id, data)

    toast.success('Valeur ajoutée au carnet', {
      duration: 2000,
    });
  }

  async remove(id: number): Promise<void> {
    //TODO: measure facade wait backend for finish
    //const msgConfirmation = await this._measureApi.deleteeasure(data);
    const msgConfirmation = "C'est fait";

    this.measuresServiceAction.remove(id);

    toast.success(msgConfirmation, {
      duration: 2000,
    });
  }
}
