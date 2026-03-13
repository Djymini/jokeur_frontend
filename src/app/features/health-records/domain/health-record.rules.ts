import { CreateHealthRecordDto } from '../models/create-health-record.dto';

export class HealthRecordRules {
  static validate(data: CreateHealthRecordDto): void {
    if (!data.petName?.trim()) {
      throw new Error("Le nom de l'animal est requis");
    }

    if (!data.animalType?.trim()) {
      throw new Error("Le type d'animal est requis");
    }

    if (!data.sex?.trim()) {
      throw new Error('Le sexe est requis');
    }

    if (!Number.isFinite(data.currentWeight) || data.currentWeight <= 0) {
      throw new Error('Le poids doit être un nombre positif');
    }
  }

  static validateDate(birthDate: Date): void {
    if (new Date(birthDate).getFullYear() > new Date().getFullYear()) {
      throw new Error("Date de naissance supérieur à l'année en cours");
    }
  }

  static calculateAge(birthDate: Date): string {
    this.validateDate(birthDate);
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(birthDate).getFullYear();
    if (currentYear - birthYear <= 1) {
      return currentYear - birthYear + 'an';
    }
    return currentYear - birthYear + 'ans';
  }

  static displayWeight(weight: number): string {
    return weight + 'kg';
  }
}
