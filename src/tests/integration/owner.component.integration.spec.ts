import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { HealthRecordFacade } from '@/features/health-records/services/health-record.facade';
import { HealthRecordStore } from '@/features/health-records/services/health-record.store';
import { HealthRecordApi } from '@/features/health-records/services/health-record.api';
import { HealthRecordMetadataApi } from '@/features/health-records/services/health-record-metadata.api';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { CreateHealthRecordDto } from '@/features/health-records/models/create-health-record.dto';

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
  userId: 1,
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

describe('HealthRecordFacade (integration)', () => {
  let facade: HealthRecordFacade;
  let store: HealthRecordStore;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        HealthRecordApi,
        HealthRecordMetadataApi,
        HealthRecordFacade,
        HealthRecordStore
      ]
    });

    facade = TestBed.inject(HealthRecordFacade);
    store = TestBed.inject(HealthRecordStore);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should call POST /health-records and add the record to the store', async () => {
    const created = mockRecord({ id: 99, petName: 'Rex' });

    const promise = facade.createFromFormPayload(validPayload, 1);

    const req = http.expectOne((request) =>
      request.url.endsWith('health-records') && request.method === 'POST'
    );
    expect(req.request.method).toBe('POST');

    const dto: CreateHealthRecordDto = req.request.body;
    expect(dto.petName).toBe('Rex');
    expect(dto.animalType).toBe('DOG');
    expect(dto.userId).toBe(1);
    expect(dto.currentWeight).toBe(10);

    req.flush(created);

    const result = await promise;
    expect(result.id).toBe(99);
    expect(store.healthRecords()).toContainEqual(created);
  });

  it('should map tattooNumber payload field to tattoo in the DTO', async () => {
    const payload = { ...validPayload, tattooNumber: 'AB123' };
    const promise = facade.createFromFormPayload(payload, 1);

    const req = http.expectOne((request) => request.url.endsWith('health-records'));
    expect(req.request.body.tattoo).toBe('AB123');
    req.flush(mockRecord());

    await promise;
  });

  it('should map optional empty fields to null in the DTO', async () => {
    const payload = { ...validPayload, color: '', breed: '', allergy: '' };
    const promise = facade.createFromFormPayload(payload, 1);

    const req = http.expectOne((request) => request.url.endsWith('health-records'));
    expect(req.request.body.color).toBeNull();
    expect(req.request.body.breed).toBeNull();
    expect(req.request.body.allergy).toBeNull();
    req.flush(mockRecord());

    await promise;
  });

  it('should NOT call the API and throw when petName is empty', async () => {
    const payload = { ...validPayload, petName: '' };

    await expect(facade.createFromFormPayload(payload, 1)).rejects.toThrow('"petName"');
    http.expectNone((request) => request.url.endsWith('health-records'));
  });

  it('should NOT call the API and throw when currentWeight is zero', async () => {
    const payload = { ...validPayload, currentWeight: 0 };

    await expect(facade.createFromFormPayload(payload, 1)).rejects.toThrow('"currentWeight"');
    http.expectNone((request) => request.url.endsWith('health-records'));
  });

  it('should throw and not update the store when the API returns a 500', async () => {
    const promise = facade.createFromFormPayload(validPayload, 1);

    const req = http.expectOne((request) => request.url.endsWith('health-records'));
    req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });

    await expect(promise).rejects.toThrow();
    expect(store.healthRecords()).toHaveLength(0);
  });

  it('should call GET /health-records and store the results', async () => {
    const records = [mockRecord({ id: 1 }), mockRecord({ id: 2, petName: 'Luna' })];

    const promise = facade.loadHealthRecords();

    const req = http.expectOne((request) =>
      request.url.endsWith('health-records') && request.method === 'GET'
    );
    req.flush(records);

    const result = await promise;
    expect(result).toHaveLength(2);
    expect(store.healthRecords()).toHaveLength(2);
  });

  it('should call GET /health-records/:id when not cached and store the result', async () => {
    const fetched = mockRecord({ id: 42 });

    const promise = facade.getHealthRecordById(42);

    const req = http.expectOne((request) =>
      request.url.endsWith('health-records/42') && request.method === 'GET'
    );
    req.flush(fetched);

    const result = await promise;
    expect(result.id).toBe(42);
    expect(store.healthRecord()?.id).toBe(42);
  });

  it('should NOT call the API when the record is already cached with the same id', async () => {
    store.setHealthRecord(mockRecord({ id: 1 }));

    const result = await facade.getHealthRecordById(1);

    http.expectNone((request) => request.url.includes('health-records/1'));
    expect(result.id).toBe(1);
  });

  it('should call the API when cached id does not match requested id', async () => {
    store.setHealthRecord(mockRecord({ id: 1 }));
    const fetched = mockRecord({ id: 99 });

    const promise = facade.getHealthRecordById(99);

    const req = http.expectOne((request) => request.url.endsWith('health-records/99'));
    req.flush(fetched);

    const result = await promise;
    expect(result.id).toBe(99);
  });

  it('should call DELETE /health-records/:id and remove the record from the store', async () => {
    store.addHealthRecord(mockRecord({ id: 1 }));

    const promise = facade.deleteHealthRecord(1);

    const req = http.expectOne((request) =>
      request.url.endsWith('health-records/1') && request.method === 'DELETE'
    );
    req.flush(null);

    await promise;
    expect(store.healthRecords()).toHaveLength(0);
  });

  it('should NOT remove the record from the store when DELETE fails', async () => {
    store.addHealthRecord(mockRecord({ id: 1 }));

    const promise = facade.deleteHealthRecord(1);

    const req = http.expectOne((request) => request.url.endsWith('health-records/1'));
    req.flush('error', { status: 500, statusText: 'Internal Server Error' });

    await expect(promise).rejects.toThrow();
    expect(store.healthRecords()).toHaveLength(1);
  });

  it('should call PATCH /health-records/:id and update the store', async () => {
    store.addHealthRecord(mockRecord({ id: 1, petName: 'Rex' }));
    const updated = mockRecord({ id: 1, petName: 'MaxUpdated' });

    const promise = facade.updateFromFormPayload(validPayload, 1);

    const req = http.expectOne((request) =>
      request.url.endsWith('health-records/1') && request.method === 'PATCH'
    );
    req.flush(updated);

    await promise;
    expect(store.healthRecords()[0].petName).toBe('MaxUpdated');
  });

  it('should call GET /form-options and return metadata', async () => {
    const metadata = { animalTypes: [], sexes: [], colors: [], breedsByAnimalType: {} };

    const promise = facade.loadFormMetadata();

    const req = http.expectOne((request) =>
      request.url.endsWith('form-options') && request.method === 'GET'
    );
    req.flush(metadata);

    const result = await promise;
    expect(result).toEqual(metadata);
  });
});
