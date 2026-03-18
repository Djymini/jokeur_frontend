import { SymptomHealthRecordFacade } from '@/features/symptom-health-record/service/symptom-health-record.facade';
import { SymptomHealthRecordStore } from '@/features/symptom-health-record/service/symptom-health-record.store';
import { SymptomHealthRecordApi } from '@/features/symptom-health-record/service/symptom-health-record.api';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { expect } from 'expect';
import { provideHttpClient } from '@angular/common/http';

describe('SymptomHealthRecordRules (integration)', () => {
  let facade: SymptomHealthRecordFacade;
  let store: SymptomHealthRecordStore;
  let http: HttpTestingController;

  const mockResponse = [
    {
      id: 1,
      symptomId: {
        id: 2,
        name: 'Vomissement',
      },
      healthRecordId: 1,
      observationDate: new Date('2026-02-17').toISOString(),
      observation: '',
      endDate: undefined,
      isActive: true,
    },
    {
      id: 2,
      symptomId: {
        id: 3,
        name: 'string',
      },
      healthRecordId: 1,
      observationDate: new Date('2026-02-18').toISOString(),
      observation: '',
      endDate: undefined,
      isActive: true,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        SymptomHealthRecordApi,
        SymptomHealthRecordFacade,
        SymptomHealthRecordStore,
      ],
    });

    facade = TestBed.inject(SymptomHealthRecordFacade);
    http = TestBed.inject(HttpTestingController);
    store = TestBed.inject(SymptomHealthRecordStore);
  });

  afterEach(() => {
    http.verify();
  });
  it('should call API and get symptom records', async () => {
    const healthRecordId = 1;

    const promise = facade.getSymptomRecord(healthRecordId);

    const req = http.expectOne((request) =>
      request.url.endsWith(`symptoms-record/${healthRecordId}`),
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);

    // 2. Act
    const result = await promise;

    // 3. Assert
    expect(result.length).toBe(2);
    expect(store.symptomRecordArray()?.length).toBe(2);
  });

  it('should call API to add symptom record', async () => {
    // 1. Arrange
    const healthRecordId = 1;

    const newSymptom = {
      symptomId: 2,
      observationDate: new Date('2026-02-17'),
      endDate: undefined,
      isActive: true,
    };
    const promise = facade.addSymptomRecord(healthRecordId, newSymptom);

    const req = http.expectOne((request) =>
      request.url.endsWith(`symptoms-record/${healthRecordId}`),
    );

    expect(req.request.method).toBe('POST');

    req.flush(null);

    // 2. Act
    await promise;
  });
  it('should update store after modifying symptom record', async () => {
    store.setSymptomsRecord(mockResponse);

    const healthRecordId = 1;

    const updatedSymptom = {
      symptomId: 2,
      observationDate: new Date('2026-02-17'),
      endDate: new Date('2026-02-20'),
      isActive: false,
    };
    const promise = facade.modify(healthRecordId, updatedSymptom);

    const req = http.expectOne((request) =>
      request.url.includes(`symptoms-record/${healthRecordId}`),
    );

    expect(req.request.method).toBe('PUT');

    req.flush(null);

    const req2 = http.expectOne((request) =>
      request.url.includes(`symptoms-record/${healthRecordId}`),
    );

    req2.flush(mockResponse);

    await promise;

    expect(store.symptomRecordArray()?.length).toBe(2);
  });
  it('should remove symptom record from store after API call', async () => {
    store.setSymptomsRecord(mockResponse);

    const symptomRecordId = 1;

    const promise = facade.remove(symptomRecordId);

    const req = http.expectOne((request) =>
      request.url.endsWith(`symptoms-record/${symptomRecordId}`),
    );
    expect(req.request.method).toBe('DELETE');

    req.flush('Symptom removed');

    // 2. Act
    await promise;

    // 3. Assert
    expect(store.symptomRecordArray()?.length).toBe(1);
    expect(store.symptomRecordArray()?.find((s) => s.id === symptomRecordId)).toBeUndefined();
  });
});
