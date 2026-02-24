import { inject, Injectable } from '@angular/core';
import { AddMeasureDtoRecord } from '@/features/measures/models/addMeasureDtoRecord';
import { MeasureModel } from '@/features/measures/models/measureModel';
import { toast } from 'ngx-sonner';
import { MeasureRules } from '../domain/measure.rules';
import { MeasureServiceAction } from '@/features/measures/interfaces/measureServiceAction';
import { MeasureServiceActionFactory } from '../../measures/interfaces/factories/measure-service-action/measureServiceActionFactory';
import { MeasuresApi } from '../services/measures-api';
import { MeasuresStore } from '../services/measures-store';
import { MeasureDtoRecord } from '@/features/measures/models/measureDtoRecord';
import { HealthRecordStore } from '@/features/health-records/services/health-record.store';

@Injectable({
  providedIn: 'root',
})
export class MeasuresFacade {
  private _measureApi = inject(MeasuresApi);
  private _measureStore = inject(MeasuresStore);
  private _healthRecordStore = inject(HealthRecordStore);

  private _measuresServiceAction: MeasureServiceAction =
    MeasureServiceActionFactory.createMeasureServiceAction(
      'default',
      this._measureApi,
      this._measureStore,
    );

  public initializeMeasureServiceAction(type: string): void {
    this._measuresServiceAction = MeasureServiceActionFactory.createMeasureServiceAction(
      type,
      this._measureApi,
      this._measureStore,
    );
  }

  async getMeasure(healthRecordNumber: number, type: string): Promise<MeasureModel[]> {
    if (!MeasureRules.validateType(type)) {
      toast.error("L'action n'a pas pu aboutir", {
        duration: 3000,
      });
      throw new Error('Type invalide');
    }
    return this._measuresServiceAction.getMeasure(healthRecordNumber);
  }

  async addMeasure(data: AddMeasureDtoRecord): Promise<MeasureModel> {
    MeasureRules.validateType(data.measureType);
    const newMeasure: MeasureModel = await this._measureApi.addMeasure(data);
    this._measuresServiceAction.addMeasure(newMeasure);
    console.log(newMeasure);
    console.log(data);

    if (data.measureType === 'respiratory_rate') {
      this._healthRecordStore.addMeasureToCurrentRecord(newMeasure, 'respiratoryRate');
    } else {
      this._healthRecordStore.addMeasureToCurrentRecord(
        newMeasure,
        data.measureType.toLowerCase() as 'temperature' | 'weight' | 'respiratoryRate' | 'bpm',
      );
    }

    toast.success('Valeur ajoutée au carnet', {
      duration: 2000,
    });
    return newMeasure;
  }

  async modify(measure: MeasureModel, newValue: number): Promise<void> {
    const measureForUpdate: MeasureDtoRecord = {
      id: measure.id,
      value: newValue,
      measureType: measure.measureType,
      creationDate: measure.creationDate,
      healthRecordId: measure.healthRecordId,
    };

    const newMeasure = await this._measureApi.modifyMeasure(measureForUpdate);

    this._measuresServiceAction.modify(newMeasure.id, newMeasure.value);
    this._healthRecordStore.modifyMeasureInCurrentRecord(
      measureForUpdate,
      measureForUpdate.measureType.toLowerCase() as
        | 'temperature'
        | 'weight'
        | 'respiratoryRate'
        | 'bpm',
    );

    toast.success('Valeur ajoutée au carnet', {
      duration: 2000,
    });
  }

  async remove(measure: MeasureDtoRecord): Promise<void> {
    const msgConfirmation = await this._measureApi.deleteMeasure(measure);

    this._measuresServiceAction.remove(measure.id);
    this._healthRecordStore.removeMeasureFromCurrentRecord(
      measure.id,
      measure.measureType.toLowerCase() as 'temperature' | 'weight' | 'respiratoryRate' | 'bpm',
    );

    toast.success(msgConfirmation, {
      duration: 2000,
    });
  }
}
