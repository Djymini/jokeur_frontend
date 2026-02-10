import { MeasureModel } from '@/features/measures/models/measureModel';

export interface MeasureServiceAction {
  getEndpoint(healthRecordNumber: number, type: string): string;
  getMeasure(data: number): Promise<MeasureModel[]>;
  addMeasure(data: MeasureModel): void;
  modify(id: number, newValue: number): void;
  remove(id: number): void;
}
