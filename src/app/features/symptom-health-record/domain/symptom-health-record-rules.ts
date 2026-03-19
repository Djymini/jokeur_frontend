import { CreateUpdateSymptomRecordDto } from '@/features/symptom-health-record/model/create-update-symptom-record-dto';

export class SymptomHealthRecordRules {
  static validate(dto: CreateUpdateSymptomRecordDto): void {
    if (!dto.symptomId) {
      throw new Error("L'id de symptôme est requis");
    }

    if (!dto.observationDate) {
      throw new Error("La date d'observation de symptôme est requise");
    }

    if (dto.endDate && new Date(dto.endDate) < new Date(dto.observationDate)) {
      throw new Error("La date de fin ne peut pas être antérieure à la date d'observation.");
    }

    if (dto.active && dto.endDate) {
      throw new Error('Un symptôme actif ne peut pas avoir de date de fin');
    }
  }

  static canBeAdded(dto: CreateUpdateSymptomRecordDto): boolean {
    if (!dto.symptomId || !dto.observationDate) {
      return false;
    }

    if (dto.endDate && new Date(dto.endDate) < new Date(dto.observationDate)) {
      return false;
    }

    if (dto.active && dto.endDate) {
      return false;
    }
    return true;
  }
}
