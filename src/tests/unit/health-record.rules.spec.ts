import { HealthRecordRules } from '@/features/health-records/domain/health-record.rules';
import { CreateHealthRecordDto } from '@/features/health-records/models/create-health-record.dto';


describe('HealthRecordRules', () => {
  describe('validate', () => {

    it('should pass validation with valid data', () => {
      const validDto: CreateHealthRecordDto = {
        idOwner: 1,
        petName: 'Rex',
        animalType: 'DOG',
        sex: 'MALE',
        currentWeight: 10.5,
        breed: 'Labrador',
        birthDate: '2020-01-01',
        color: 'Brown',
        identificationNumber: null,
        tattooNumber: null,
        allergy: null
      };

      expect(() => HealthRecordRules.validate(validDto)).not.toThrow();
    });


    it('should throw error when petName is empty string', () => {
      const invalidDto: CreateHealthRecordDto = {
        idOwner: 1,
        petName: '',
        animalType: 'DOG',
        sex: 'MALE',
        currentWeight: 10.5,
        breed: null,
        birthDate: null,
        color: null,
        identificationNumber: null,
        tattooNumber: null,
        allergy: null
      };

      expect(() => HealthRecordRules.validate(invalidDto))
        .toThrow(new Error("Le nom de l'animal est requis"));
    });

    it('should throw error when petName is only whitespace', () => {
      const invalidDto: CreateHealthRecordDto = {
        idOwner: 1,
        petName: '   ',
        animalType: 'DOG',
        sex: 'MALE',
        currentWeight: 10.5,
        breed: null,
        birthDate: null,
        color: null,
        identificationNumber: null,
        tattooNumber: null,
        allergy: null
      };

      expect(() => HealthRecordRules.validate(invalidDto))
        .toThrow(new Error("Le nom de l'animal est requis"));
    });


    it('should throw error when animalType is empty string', () => {
      const invalidDto: CreateHealthRecordDto = {
        idOwner: 1,
        petName: 'Rex',
        animalType: '',
        sex: 'MALE',
        currentWeight: 10.5,
        breed: null,
        birthDate: null,
        color: null,
        identificationNumber: null,
        tattooNumber: null,
        allergy: null
      };

      expect(() => HealthRecordRules.validate(invalidDto))
        .toThrow(new Error("Le type d'animal est requis"));
    });

    it('should throw error when animalType is only whitespace', () => {
      const invalidDto: CreateHealthRecordDto = {
        idOwner: 1,
        petName: 'Rex',
        animalType: '   ',
        sex: 'MALE',
        currentWeight: 10.5,
        breed: null,
        birthDate: null,
        color: null,
        identificationNumber: null,
        tattooNumber: null,
        allergy: null
      };

      expect(() => HealthRecordRules.validate(invalidDto))
        .toThrow(new Error("Le type d'animal est requis"));
    });


    it('should throw error when sex is empty string', () => {
      const invalidDto: CreateHealthRecordDto = {
        idOwner: 1,
        petName: 'Rex',
        animalType: 'DOG',
        sex: '',
        currentWeight: 10.5,
        breed: null,
        birthDate: null,
        color: null,
        identificationNumber: null,
        tattooNumber: null,
        allergy: null
      };

      expect(() => HealthRecordRules.validate(invalidDto))
        .toThrow(new Error('Le sexe est requis'));
    });

    it('should throw error when sex is only whitespace', () => {
      const invalidDto: CreateHealthRecordDto = {
        idOwner: 1,
        petName: 'Rex',
        animalType: 'DOG',
        sex: '   ',
        currentWeight: 10.5,
        breed: null,
        birthDate: null,
        color: null,
        identificationNumber: null,
        tattooNumber: null,
        allergy: null
      };

      expect(() => HealthRecordRules.validate(invalidDto))
        .toThrow(new Error('Le sexe est requis'));
    });


    it('should throw error when currentWeight is zero', () => {
      const invalidDto: CreateHealthRecordDto = {
        idOwner: 1,
        petName: 'Rex',
        animalType: 'DOG',
        sex: 'MALE',
        currentWeight: 0,
        breed: null,
        birthDate: null,
        color: null,
        identificationNumber: null,
        tattooNumber: null,
        allergy: null
      };

      expect(() => HealthRecordRules.validate(invalidDto))
        .toThrow(new Error('Le poids doit être un nombre positif'));
    });

    it('should throw error when currentWeight is negative', () => {
      const invalidDto: CreateHealthRecordDto = {
        idOwner: 1,
        petName: 'Rex',
        animalType: 'DOG',
        sex: 'MALE',
        currentWeight: -5,
        breed: null,
        birthDate: null,
        color: null,
        identificationNumber: null,
        tattooNumber: null,
        allergy: null
      };

      expect(() => HealthRecordRules.validate(invalidDto))
        .toThrow(new Error('Le poids doit être un nombre positif'));
    });

    it('should throw error when currentWeight is NaN', () => {
      const invalidDto: CreateHealthRecordDto = {
        idOwner: 1,
        petName: 'Rex',
        animalType: 'DOG',
        sex: 'MALE',
        currentWeight: NaN,
        breed: null,
        birthDate: null,
        color: null,
        identificationNumber: null,
        tattooNumber: null,
        allergy: null
      };

      expect(() => HealthRecordRules.validate(invalidDto))
        .toThrow(new Error('Le poids doit être un nombre positif'));
    });

    it('should throw error when currentWeight is Infinity', () => {
      const invalidDto: CreateHealthRecordDto = {
        idOwner: 1,
        petName: 'Rex',
        animalType: 'DOG',
        sex: 'MALE',
        currentWeight: Infinity,
        breed: null,
        birthDate: null,
        color: null,
        identificationNumber: null,
        tattooNumber: null,
        allergy: null
      };

      expect(() => HealthRecordRules.validate(invalidDto))
        .toThrow(new Error('Le poids doit être un nombre positif'));
    });

    it('should pass with valid positive weight', () => {
      const validDto: CreateHealthRecordDto = {
        idOwner: 1,
        petName: 'Rex',
        animalType: 'DOG',
        sex: 'MALE',
        currentWeight: 0.01,
        breed: null,
        birthDate: null,
        color: null,
        identificationNumber: null,
        tattooNumber: null,
        allergy: null
      };

      expect(() => HealthRecordRules.validate(validDto)).not.toThrow();
    });

    it('should pass with large weight', () => {
      const validDto: CreateHealthRecordDto = {
        idOwner: 1,
        petName: 'Rex',
        animalType: 'DOG',
        sex: 'MALE',
        currentWeight: 99.99,
        breed: null,
        birthDate: null,
        color: null,
        identificationNumber: null,
        tattooNumber: null,
        allergy: null
      };

      expect(() => HealthRecordRules.validate(validDto)).not.toThrow();
    });
  });
});
