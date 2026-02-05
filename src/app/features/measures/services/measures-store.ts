import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { MeasureModel } from '@/features/measures/models/measureModel';

@Injectable({
  providedIn: 'root',
})
export class MeasuresStore {
  private _weightArraySignal = signal<MeasureModel[] | undefined>(undefined);
  private _bpmArraySignal = signal<MeasureModel[] | undefined>(undefined);
  private _temperatureArraySignal = signal<MeasureModel[] | undefined>(undefined);
  private _respiratoryRateArraySignal = signal<MeasureModel[] | undefined>(undefined);

  public weightArray = computed(() => this._weightArraySignal());
  public bpmArray = computed(() => this._bpmArraySignal());
  public temperatureArray = computed(() => this._temperatureArraySignal());
  public respiratoryRateArray = computed(() => this._respiratoryRateArraySignal());

  private _addMeasure(measure: MeasureModel, arraySignal:WritableSignal<MeasureModel[] | undefined>):void {
    arraySignal.update(measures => [...(measures as MeasureModel[]), measure])
  }

  addWeight(weight: MeasureModel): void {
    this._addMeasure(weight, this._weightArraySignal);
  }

  addBpm(bpm: MeasureModel): void {
    this._addMeasure(bpm, this._bpmArraySignal)
  }

  addTemperature(temperature: MeasureModel): void {
    this._addMeasure(temperature, this._temperatureArraySignal)
  }

  addRespiratoryRate(respiratoryRate: MeasureModel): void {
    this._addMeasure(respiratoryRate, this._respiratoryRateArraySignal)
  }

  private _removeMeasure(id: number, arraySignal:WritableSignal<MeasureModel[] | undefined>): void {
    arraySignal.update(measures => measures!.filter(measure => measure.id !== id));
  }

  removeWeight(id: number): void {
    this._removeMeasure(id, this._weightArraySignal);
  }

  removeBpm(id: number): void {
    this._removeMeasure(id, this._bpmArraySignal);
  }

  removeTemperature(id: number): void {
    this._removeMeasure(id, this._temperatureArraySignal);
  }

  removeRespiratoryRate(id: number): void {
    this._removeMeasure(id, this._respiratoryRateArraySignal);
  }

  private _modifyValueMeasure(id: number, newValue: number, arraySignal:WritableSignal<MeasureModel[] | undefined>): void {
    arraySignal.update(measures =>
      measures!.map(measure =>
        measure.id === id
          ? { ...measure, value: newValue }
          : measure
      )
    );
  }

  modifyWeight(id: number, newValue: number): void {
    this._modifyValueMeasure(id, newValue, this._weightArraySignal);
  }

  modifyBpm(id: number, newValue: number): void {
    this._modifyValueMeasure(id, newValue, this._bpmArraySignal);
  }

  modifyTemperature(id: number, newValue: number): void {
    this._modifyValueMeasure(id, newValue, this._temperatureArraySignal);
  }

  modifyRespiratoryRate(id: number, newValue: number): void {
    this._modifyValueMeasure(id, newValue, this._respiratoryRateArraySignal);
  }
}
