import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { MeasureModel } from '@/features/measures/models/measureModel';
import { HealthRecordStore } from '@/features/health-records/services/health-record.store';

@Injectable({
  providedIn: 'root',
})
export class MeasuresStore {
  private _healthRecordStore = inject(HealthRecordStore);

  private _weightArraySignal = signal<MeasureModel[]>([]);
  private _bpmArraySignal = signal<MeasureModel[]>([]);
  private _temperatureArraySignal = signal<MeasureModel[]>([]);
  private _respiratoryRateArraySignal = signal<MeasureModel[]>([]);

  public weightArray = computed(() => this._weightArraySignal());
  public bpmArray = computed(() => this._bpmArraySignal());
  public temperatureArray = computed(() => this._temperatureArraySignal());
  public respiratoryRateArray = computed(() => this._respiratoryRateArraySignal());

  private _setMeasures(
    measures: MeasureModel[],
    arraySignal: WritableSignal<MeasureModel[]>,
  ): void {
    arraySignal.set(measures);
  }

  setWeight(weights: MeasureModel[]): void {
    this._setMeasures(weights, this._weightArraySignal);
  }

  setBpm(bpms: MeasureModel[]): void {
    this._setMeasures(bpms, this._bpmArraySignal);
  }

  setTemperature(temperatures: MeasureModel[]): void {
    this._setMeasures(temperatures, this._temperatureArraySignal);
  }

  setRespiratoryRate(respiratoryRates: MeasureModel[]): void {
    this._setMeasures(respiratoryRates, this._respiratoryRateArraySignal);
  }

  private _addMeasure(
    measure: MeasureModel,
    arraySignal: WritableSignal<MeasureModel[] | undefined>,
  ): void {
    arraySignal.update((measures) => [...(measures as MeasureModel[]), measure]);
  }

  addWeight(weight: MeasureModel): void {
    this._addMeasure(weight, this._weightArraySignal);
    this._healthRecordStore.modifyCurrentWeight(weight.value);
  }

  addBpm(bpm: MeasureModel): void {
    this._addMeasure(bpm, this._bpmArraySignal);
  }

  addTemperature(temperature: MeasureModel): void {
    this._addMeasure(temperature, this._temperatureArraySignal);
  }

  addRespiratoryRate(respiratoryRate: MeasureModel): void {
    this._addMeasure(respiratoryRate, this._respiratoryRateArraySignal);
  }

  private _removeMeasure(
    id: number,
    arraySignal: WritableSignal<MeasureModel[] | undefined>,
  ): void {
    arraySignal.update((measures) => measures!.filter((measure) => measure.id !== id));
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

  private _modifyValueMeasure(
    id: number,
    newValue: number,
    arraySignal: WritableSignal<MeasureModel[] | undefined>,
  ): void {
    arraySignal.update((measures) =>
      measures!.map((measure) => (measure.id === id ? { ...measure, value: newValue } : measure)),
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
