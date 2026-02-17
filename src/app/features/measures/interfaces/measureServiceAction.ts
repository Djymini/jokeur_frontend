import { MeasureModel } from '@/features/measures/models/measureModel';

export interface MeasureServiceAction {
  getEndpoint(healthRecordNumber: number, type: string): string;
  getMeasure(healthRecordNumber: number): Promise<MeasureModel[]>;
  addMeasure(measureToModify: MeasureModel): void;
  modify(id: number, newValue: number): void;
  remove(id: number): void;
}
