import { MeasureModel } from '@/features/measures/models/measureModel';

export type HealthRecord = {
  id: number;
  userId: number;
  petName: string;
  breed: string;
  sex: string;
  birthDate: Date;
  currentWeight: number;
  color: string;
  identificationNumber: string;
  tattoo: number;
  allergy: number;
  animalType: string;
  photoKey?: string | null;
  measures: {
    temperature: MeasureModel[];
    weight: MeasureModel[];
    respiratoryRate: MeasureModel[];
    bpm: MeasureModel[];
  };
};
