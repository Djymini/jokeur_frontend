export type CreateHealthRecordDto = {
  ownerId: number;
  petName: string;
  animalType: string;
  breed?: string | null;
  sex: string;
  birthDate?: string | null;
  currentWeight: number;
  color?: string | null;
  identificationNumber?: string | null;
  tattooNumber?: string | null;
  allergy?: string | null;
};
