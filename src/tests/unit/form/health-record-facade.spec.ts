import { TestBed } from '@angular/core/testing';
import { HealthRecordFacade } from '@/features/health-records/services/health-record.facade';
import { HealthRecordApi } from '@/features/health-records/services/health-record.api';
import { HealthRecordStore } from '@/features/health-records/services/health-record.store';
import { HealthRecordMetadataApi } from '@/features/health-records/services/health-record-metadata.api';
import { HealthRecord } from '@/features/health-records/models/health-record.model';


const mockRecord = (overrides: Partial<HealthRecord> = {}): HealthRecord => ({
  id: 1,
  petName: 'Rex',
  animalType: 'DOG',
  sex: 'MALE',
  breed: 'Labrador',
  color: 'Brown',
  birthDate: new Date('2020-01-01'),
  currentWeight: 10,
  identificationNumber: '',
  tattoo: 0,
  allergy: 0,
  image: '',
  imageType: '',
  ownerId: 1,
  measures: { weight: [], bpm: [], temperature: [], respiratoryRate: [] },
  ...overrides
});

const validPayload: Record<string, unknown> = {
  petName: 'Rex',
  animalType: 'DOG',
  sex: 'MALE',
  breed: 'Labrador',
  birthDate: '2020-01-01',
  currentWeight: 10,
  color: 'Brown',
  identificationNumber: '',
  tattooNumber: '',
  allergy: ''
};

describe('HealthRecordFacade', () => {
  let facade: HealthRecordFacade;
  let apiMock: jest.Mocked<Pick<HealthRecordApi, 'createHealthRecord' | 'updateHealthRecord' | 'deleteHealthRecord' | 'getHealthRecordById' | 'getAllHealthRecords'>>;
  let storeMock: {
    healthRecord: jest.Mock;
    healthRecords: jest.Mock;
    addHealthRecord: jest.Mock;
    updateHealthRecord: jest.Mock;
    removeHealthRecord: jest.Mock;
    setHealthRecord: jest.Mock;
    setHealthRecords: jest.Mock;
  };
  let metadataApiMock: jest.Mocked<Pick<HealthRecordMetadataApi, 'getMetadata'>>;

  beforeEach(() => {
    apiMock = {
      createHealthRecord: jest.fn(),
      updateHealthRecord: jest.fn(),
      deleteHealthRecord: jest.fn(),
      getHealthRecordById: jest.fn(),
      getAllHealthRecords: jest.fn()
    };

    storeMock = {
      healthRecord: jest.fn().mockReturnValue(undefined),
      healthRecords: jest.fn().mockReturnValue([]),
      addHealthRecord: jest.fn(),
      updateHealthRecord: jest.fn(),
      removeHealthRecord: jest.fn(),
      setHealthRecord: jest.fn(),
      setHealthRecords: jest.fn()
    };

    metadataApiMock = {
      getMetadata: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        HealthRecordFacade,
        { provide: HealthRecordApi, useValue: apiMock },
        { provide: HealthRecordStore, useValue: storeMock },
        { provide: HealthRecordMetadataApi, useValue: metadataApiMock }
      ]
    });

    facade = TestBed.inject(HealthRecordFacade);
  });


  describe('createFromFormPayload', () => {
    it('should call api.createHealthRecord with a properly mapped DTO', async () => {
      apiMock.createHealthRecord.mockResolvedValue(mockRecord());

      await facade.createFromFormPayload(validPayload, 1);

      expect(apiMock.createHealthRecord).toHaveBeenCalledTimes(1);
      const dto = apiMock.createHealthRecord.mock.calls[0][0];
      expect(dto.petName).toBe('Rex');
      expect(dto.animalType).toBe('DOG');
      expect(dto.sex).toBe('MALE');
      expect(dto.ownerId).toBe(1);
      expect(dto.currentWeight).toBe(10);
    });

    it('should map tattooNumber from payload to tattoo in DTO', async () => {
      apiMock.createHealthRecord.mockResolvedValue(mockRecord());
      const payload = { ...validPayload, tattooNumber: 'AB123' };

      await facade.createFromFormPayload(payload, 1);

      const dto = apiMock.createHealthRecord.mock.calls[0][0];
      expect(dto.tattoo).toBe('AB123');
    });

    it('should call store.addHealthRecord after a successful API call', async () => {
      const created = mockRecord();
      apiMock.createHealthRecord.mockResolvedValue(created);

      await facade.createFromFormPayload(validPayload, 1);

      expect(storeMock.addHealthRecord).toHaveBeenCalledWith(created);
    });

    it('should return the created HealthRecord', async () => {
      const created = mockRecord();
      apiMock.createHealthRecord.mockResolvedValue(created);

      const result = await facade.createFromFormPayload(validPayload, 1);

      expect(result).toEqual(created);
    });

    it('should NOT call store.addHealthRecord if the API throws', async () => {
      apiMock.createHealthRecord.mockRejectedValue(new Error('Network error'));

      await expect(facade.createFromFormPayload(validPayload, 1)).rejects.toThrow();
      expect(storeMock.addHealthRecord).not.toHaveBeenCalled();
    });

    it('should throw when petName is empty', async () => {
      const payload = { ...validPayload, petName: '' };
      await expect(facade.createFromFormPayload(payload, 1)).rejects.toThrow('"petName"');
      expect(apiMock.createHealthRecord).not.toHaveBeenCalled();
    });

    it('should throw when animalType is empty', async () => {
      const payload = { ...validPayload, animalType: '' };
      await expect(facade.createFromFormPayload(payload, 1)).rejects.toThrow('"animalType"');
      expect(apiMock.createHealthRecord).not.toHaveBeenCalled();
    });

    it('should throw when sex is empty', async () => {
      const payload = { ...validPayload, sex: '' };
      await expect(facade.createFromFormPayload(payload, 1)).rejects.toThrow('"sex"');
      expect(apiMock.createHealthRecord).not.toHaveBeenCalled();
    });

    it('should throw when currentWeight is zero', async () => {
      const payload = { ...validPayload, currentWeight: 0 };
      await expect(facade.createFromFormPayload(payload, 1)).rejects.toThrow('"currentWeight"');
      expect(apiMock.createHealthRecord).not.toHaveBeenCalled();
    });

    it('should throw when currentWeight is negative', async () => {
      const payload = { ...validPayload, currentWeight: -5 };
      await expect(facade.createFromFormPayload(payload, 1)).rejects.toThrow('"currentWeight"');
      expect(apiMock.createHealthRecord).not.toHaveBeenCalled();
    });

    it('should map optional fields to null when empty', async () => {
      apiMock.createHealthRecord.mockResolvedValue(mockRecord());
      const payload = { ...validPayload, color: '', breed: '', allergy: '' };

      await facade.createFromFormPayload(payload, 1);

      const dto = apiMock.createHealthRecord.mock.calls[0][0];
      expect(dto.color).toBeNull();
      expect(dto.breed).toBeNull();
      expect(dto.allergy).toBeNull();
    });
  });


  describe('updateFromFormPayload', () => {
    it('should call api.updateHealthRecord with the correct id and DTO', async () => {
      const updated = mockRecord({ petName: 'MaxUpdated' });
      apiMock.updateHealthRecord.mockResolvedValue(updated);

      await facade.updateFromFormPayload(validPayload, 1);

      expect(apiMock.updateHealthRecord).toHaveBeenCalledTimes(1);
      expect(apiMock.updateHealthRecord.mock.calls[0][0]).toBe(1);
    });

    it('should call store.updateHealthRecord after a successful API call', async () => {
      const updated = mockRecord();
      apiMock.updateHealthRecord.mockResolvedValue(updated);

      await facade.updateFromFormPayload(validPayload, 1);

      expect(storeMock.updateHealthRecord).toHaveBeenCalledWith(updated);
    });

    it('should return the updated HealthRecord', async () => {
      const updated = mockRecord({ petName: 'MaxUpdated' });
      apiMock.updateHealthRecord.mockResolvedValue(updated);

      const result = await facade.updateFromFormPayload(validPayload, 1);

      expect(result).toEqual(updated);
    });

    it('should NOT call store.updateHealthRecord if the API throws', async () => {
      apiMock.updateHealthRecord.mockRejectedValue(new Error('Network error'));

      await expect(facade.updateFromFormPayload(validPayload, 1)).rejects.toThrow();
      expect(storeMock.updateHealthRecord).not.toHaveBeenCalled();
    });

    it('should throw when currentWeight is invalid', async () => {
      const payload = { ...validPayload, currentWeight: 0 };
      await expect(facade.updateFromFormPayload(payload, 1)).rejects.toThrow('"currentWeight"');
      expect(apiMock.updateHealthRecord).not.toHaveBeenCalled();
    });
  });


  describe('deleteHealthRecord', () => {
    it('should call api.deleteHealthRecord with the correct id', async () => {
      apiMock.deleteHealthRecord.mockResolvedValue(undefined);

      await facade.deleteHealthRecord(1);

      expect(apiMock.deleteHealthRecord).toHaveBeenCalledWith(1);
    });

    it('should call store.removeHealthRecord after a successful API call', async () => {
      apiMock.deleteHealthRecord.mockResolvedValue(undefined);

      await facade.deleteHealthRecord(1);

      expect(storeMock.removeHealthRecord).toHaveBeenCalledWith(1);
    });

    it('should NOT call store.removeHealthRecord if the API throws', async () => {
      apiMock.deleteHealthRecord.mockRejectedValue(new Error('Network error'));

      await expect(facade.deleteHealthRecord(1)).rejects.toThrow();
      expect(storeMock.removeHealthRecord).not.toHaveBeenCalled();
    });
  });


  describe('getHealthRecordById', () => {
    it('should return the cached record without calling the API when id matches', async () => {
      const cached = mockRecord({ id: 1 });
      storeMock.healthRecord.mockReturnValue(cached);

      const result = await facade.getHealthRecordById(1);

      expect(result).toEqual(cached);
      expect(apiMock.getHealthRecordById).not.toHaveBeenCalled();
    });

    it('should call the API when no record is cached', async () => {
      storeMock.healthRecord.mockReturnValue(undefined);
      const fetched = mockRecord({ id: 42 });
      apiMock.getHealthRecordById.mockResolvedValue(fetched);

      await facade.getHealthRecordById(42);

      expect(apiMock.getHealthRecordById).toHaveBeenCalledWith(42);
    });

    it('should call store.setHealthRecord after fetching from API', async () => {
      storeMock.healthRecord.mockReturnValue(undefined);
      const fetched = mockRecord({ id: 42 });
      apiMock.getHealthRecordById.mockResolvedValue(fetched);

      await facade.getHealthRecordById(42);

      expect(storeMock.setHealthRecord).toHaveBeenCalledWith(fetched);
    });

    it('should call the API when cached id does not match requested id', async () => {
      storeMock.healthRecord.mockReturnValue(mockRecord({ id: 1 }));
      const fetched = mockRecord({ id: 99 });
      apiMock.getHealthRecordById.mockResolvedValue(fetched);

      await facade.getHealthRecordById(99);

      expect(apiMock.getHealthRecordById).toHaveBeenCalledWith(99);
    });
  });


  describe('loadFormMetadata', () => {
    it('should return metadata from the metadata API', async () => {
      const metadata = { animalTypes: [], sexes: [], colors: [], breedsByAnimalType: {} };
      metadataApiMock.getMetadata.mockResolvedValue(metadata);

      const result = await facade.loadFormMetadata();

      expect(result).toEqual(metadata);
    });

    it('should throw a wrapped error when the metadata API fails', async () => {
      metadataApiMock.getMetadata.mockRejectedValue(new Error('Network error'));

      await expect(facade.loadFormMetadata()).rejects.toThrow(
        'Impossible de charger les données du formulaire'
      );
    });
  });


  describe('loadHealthRecords', () => {
    it('should call api.getAllHealthRecords and store the result', async () => {
      const records = [mockRecord({ id: 1 }), mockRecord({ id: 2 })];
      apiMock.getAllHealthRecords.mockResolvedValue(records);

      const result = await facade.loadHealthRecords();

      expect(storeMock.setHealthRecords).toHaveBeenCalledWith(records);
      expect(result).toEqual(records);
    });

    it('should throw a wrapped error when the API fails', async () => {
      apiMock.getAllHealthRecords.mockRejectedValue(new Error('Network error'));

      await expect(facade.loadHealthRecords()).rejects.toThrow(
        'Impossible de charger les carnets de santé'
      );
    });
  });
});
