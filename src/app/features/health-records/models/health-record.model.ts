import { MeasureModel } from '@/features/measures/models/measureModel';

export type HealthRecord = {
  id: number;
  ownerId: number;
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
  animalType: string;
  measures: {
    temperature: MeasureModel[];
    weight: MeasureModel[];
    respiratoryRate: MeasureModel[];
    bpm: MeasureModel[];
  };
};
