import { MeasureModel } from '@/features/measures/models/measureModel';

export type HealthRecordModel = {
  healthRecordNumber: number;
  ownerId: number;
  petName: string;
  animalType: string;
  breed: string;
  sex: string;
  birthDate: string;
  currentWeight: number;
  color: string;
  identificationNumber: string;
  tattooNumber: string;
  allergy: string;
  measures: {
    temperature: MeasureModel[];
    weight: MeasureModel[];
    respiratoryRate: MeasureModel[];
    bpm: MeasureModel[];
  };
};
