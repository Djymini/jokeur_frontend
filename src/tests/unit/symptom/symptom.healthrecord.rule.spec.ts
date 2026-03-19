import { CreateUpdateSymptomRecordDto } from '@/features/symptom-health-record/model/create-update-symptom-record-dto';
import { SymptomHealthRecordRules } from '@/features/symptom-health-record/domain/symptom-health-record-rules';

describe("SymptomHealthRecordRules (unite test)", () => {

  let symptomRecord: CreateUpdateSymptomRecordDto;
  beforeEach(() => {
    symptomRecord = {
      symptomId: 1,
      observationDate: new Date('2026-03-16'),
      endDate: new Date(),
      observation: 'caca moux',
      active: true
    }
  });

  it('should validate a correct active symptom', () => {
    expect(SymptomHealthRecordRules.canBeAdded(symptomRecord)).toBeTruthy;
  });

  it('should throw error id symptom id is missing', () => {
    const invalid = {...symptomRecord, symptomId: 0};
    expect(() => SymptomHealthRecordRules.validate(invalid))
      .toThrow("L'id de symptôme est requis");
  })

  it('should throw error if observation date is missing', () => {
    const invalid = { ...symptomRecord, observationDate: undefined };
    expect(() => SymptomHealthRecordRules.validate(invalid))
      .toThrow("La date d'observation de symptôme est requise");
  })
  it('should throw error if endDate is before observationdate', () => {
    const invalid = { ...symptomRecord, endDate:  new Date('2026-03-01'), active: false };
    expect(() => SymptomHealthRecordRules.validate(invalid))
      .toThrow("La date de fin ne peut pas être antérieure à la date d'observation.");

  });

  it('should throw error if active symptom has an endDate', () => {
    const invalid = {...symptomRecord, endDate:  new Date(), active: true };
    expect(() => SymptomHealthRecordRules.validate(invalid))
      .toThrow("Un symptôme actif ne peut pas avoir de date de fin");
  })

  it('should validate inactive symptom with valid endDate', () => {
    const valid = {...symptomRecord, endDate: new Date('2026-03-15'), isActive: false};
    expect(() => SymptomHealthRecordRules.validate(valid))
      .toBeTruthy();
  })

})
