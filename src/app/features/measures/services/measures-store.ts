import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { MeasureModel } from '@/features/measures/models/measureModel';

@Injectable({
  providedIn: 'root',
})
export class MeasuresStore {
  private _weightArraySignal = signal<MeasureModel[] | undefined>([
  {
    id: 6,
    value: 28.1,
    type: "weight",
    creationDate: "2025-02-01",
    healthRecordNumber: 1001,
  },
  {
    id: 7,
    value: 28.3,
    type: "weight",
    creationDate: "2025-02-02",
    healthRecordNumber: 1001,
  },
  {
    id: 8,
    value: 28.4,
    type: "weight",
    creationDate: "2025-02-03",
    healthRecordNumber: 1001,
  },
  {
    id: 9,
    value: 28.5,
    type: "weight",
    creationDate: "2025-02-04",
    healthRecordNumber: 1001,
  },
  {
    id: 10,
    value: 28.6,
    type: "weight",
    creationDate: "2025-02-05",
    healthRecordNumber: 1001,
  }
]);
  private _bpmArraySignal = signal<MeasureModel[] | undefined>([
  {
    id: 11,
    value: 90,
    type: "bpm",
    creationDate: "2025-02-01",
    healthRecordNumber: 1001,
  },
  {
    id: 12,
    value: 92,
    type: "bpm",
    creationDate: "2025-02-02",
    healthRecordNumber: 1001,
  },
  {
    id: 13,
    value: 91,
    type: "bpm",
    creationDate: "2025-02-03",
    healthRecordNumber: 1001,
  },
  {
    id: 14,
    value: 93,
    type: "bpm",
    creationDate: "2025-02-04",
    healthRecordNumber: 1001,
  },
  {
    id: 15,
    value: 94,
    type: "bpm",
    creationDate: "2025-02-05",
    healthRecordNumber: 1001,
  }
]);
  private _temperatureArraySignal = signal<MeasureModel[] | undefined>(
    [
      {
        id: 16,
        value: 38.2,
        type: "temperature",
        creationDate: "2025-02-01",
        healthRecordNumber: 1001,
      },
      {
        id: 17,
        value: 38.3,
        type: "temperature",
        creationDate: "2025-02-02",
        healthRecordNumber: 1001,
      },
      {
        id: 18,
        value: 38.4,
        type: "temperature",
        creationDate: "2025-02-03",
        healthRecordNumber: 1001,
      },
      {
        id: 19,
        value: 38.5,
        type: "temperature",
        creationDate: "2025-02-04",
        healthRecordNumber: 1001,
      },
      {
        id: 20,
        value: 38.6,
        type: "temperature",
        creationDate: "2025-02-05",
        healthRecordNumber: 1001,
      }
    ]
  );
  private _respiratoryRateArraySignal = signal<MeasureModel[] | undefined>([
  {
    id: 1,
    value: 22,
    type: "respiratoryRate",
    creationDate: "2025-02-01",
    healthRecordNumber: 1001,
  },
  {
    id: 2,
    value: 23,
    type: "respiratoryRate",
    creationDate: "2025-02-02",
    healthRecordNumber: 1001,
  },
  {
    id: 3,
    value: 21,
    type: "respiratoryRate",
    creationDate: "2025-02-03",
    healthRecordNumber: 1001,
  },
  {
    id: 4,
    value: 22,
    type: "respiratoryRate",
    creationDate: "2025-02-04",
    healthRecordNumber: 1001,
  },
  {
    id: 5,
    value: 24,
    type: "respiratoryRate",
    creationDate: "2025-02-05",
    healthRecordNumber: 1001,
  }
]);

  public weightArray = computed(() => this._weightArraySignal());
  public bpmArray = computed(() => this._bpmArraySignal());
  public temperatureArray = computed(() => this._temperatureArraySignal());
  public respiratoryRateArray = computed(() => this._respiratoryRateArraySignal());

  private _addMeasure(
    measure: MeasureModel,
    arraySignal: WritableSignal<MeasureModel[] | undefined>,
  ): void {
    arraySignal.update((measures) => [...(measures as MeasureModel[]), measure]);
  }

  addWeight(weight: MeasureModel): void {
    this._addMeasure(weight, this._weightArraySignal);
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
