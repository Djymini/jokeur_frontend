import { MeasureModel } from '@/features/measures/models/measureModel';

export type HealthRecordModel = {
  id: number;
  petName: string;
  breed: string;
  sex: string;
  birthDate: Date;
  currentWeight: number;
  color: string;
  identificationNumber: string;
  tattoo: number;
  allergy: number;
  image: string;
  imageType: string;
  AnimalType: string;
  measures: {
    temperature: MeasureModel[];
    weight: MeasureModel[];
    respiratoryRate: MeasureModel[];
    bpm: MeasureModel[];
  };
};
