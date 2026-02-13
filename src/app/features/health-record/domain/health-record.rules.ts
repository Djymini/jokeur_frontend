import { CreateHealthRecordDto } from '../models/create-health-record.dto';


export class HealthRecordRules {
  static validate(data: CreateHealthRecordDto): void {
    if (!data.petName?.trim()) {
      throw new Error('Le nom de l\'animal est requis');
    }

    if (!data.animalType?.trim()) {
      throw new Error('Le type d\'animal est requis');
    }

    if (!data.sex?.trim()) {
      throw new Error('Le sexe est requis');
    }

    if (!Number.isFinite(data.currentWeight) || data.currentWeight <= 0) {
      throw new Error('Le poids doit être un nombre positif');
    }
  }
}
