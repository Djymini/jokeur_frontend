import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import {MeasuresFacade} from '@/features/measures/services/measures-facade'
import {MeasuresStore} from '@/features/measures/services/measures-store'
import {MeasuresApi} from '@/features/measures/services/measures-api'
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { MeasureModel } from '@/features/measures/models/measureModel';
import { AddMeasureDtoRecord } from '@/features/measures/models/addMeasureDtoRecord';

describe('ProductFacade.createProduct (integration)', () => {
  let facade: MeasuresFacade;
  let http: HttpTestingController;
  let store: MeasuresStore;

  const mockResponse: MeasureModel[] = [
    {
      id: 2,
      value: 5.7,
      measureType: "WEIGHT",
      healthRecordId: 1,
      creationDate: "2026-02-17"
    },
    {
      id: 3,
      value: 5.6,
      measureType: "WEIGHT",
      healthRecordId: 1,
      creationDate: "2026-02-17"
    },
    {
      id: 4,
      value: 5.2,
      measureType: "WEIGHT",
      healthRecordId: 1,
      creationDate: "2026-02-17"
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MeasuresApi,
        MeasuresFacade,
        MeasuresStore],
    });

    facade = TestBed.inject(MeasuresFacade);
    http = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MeasuresStore);
  });

  it('should call API, get measure', async () => {
    // 1. Arrange
    facade.initializeMeasureServiceAction("weight");
    const healthRecordId = 1;
    const type = 'weight';

    const promise = facade.getMeasure(healthRecordId, type);

    const req = http.expectOne((request) =>
      request.url.endsWith(`measures/${healthRecordId}/${type}`)
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    const result = await promise;
    expect(result.length).toBe(3);
    expect(store.weightArray()![0].value).toEqual(mockResponse[0].value);
  });

  it('should call API, add measure', async () => {
    // 1. Arrange
    facade.initializeMeasureServiceAction("weight");
    const newValue: AddMeasureDtoRecord = {
      id: 1,
        value: 5.7,
        measureType: "WEIGHT",
        healthRecordId: 1,
      creationDate: "2025-12-01"
      };

    const promise = facade.addMeasure(newValue);

    const req = http.expectOne((request) =>
      request.url.endsWith(`measures`)
    );
    expect(req.request.method).toBe('POST');

    const mockCreatedResponse = { ...newValue, id: 99, creationDate: "2026-02-17" };
    req.flush(mockCreatedResponse);

    const result = await promise;
    expect(result.id).toBe(99);
    expect(result.value).toBe(newValue.value);
  });

  it('should update store when modifying a measure', async () => {
    facade.initializeMeasureServiceAction("weight");
    store.setWeight(mockResponse);

    const measureToModify = {
      id: 2,
      value: 5.7,
      measureType: "WEIGHT",
      healthRecordId: 1,
      creationDate: "2026-02-17"
    };
    const newValue = 6;

    const promise = facade.modify(measureToModify, newValue);

    const req = http.expectOne((request) =>
      request.url.endsWith(`measures/${measureToModify.healthRecordId}/${measureToModify.id}`)
    );
    expect(req.request.method).toBe('PUT');

    req.flush({ ...measureToModify, value: newValue });

    await promise;

    const updatedValue = store.weightArray()?.find(m => m.id === measureToModify.id)?.value;
    expect(updatedValue).toBe(newValue);
  });

  it('should remove measure from store after API call', async () => {
    facade.initializeMeasureServiceAction("weight");
    store.setWeight(mockResponse);

    const measureToDelete = {
      id: 2,
      value: 5.7,
      measureType: "WEIGHT",
      healthRecordId: 1,
      creationDate: "2026-02-17"
    };

    const promise = facade.remove(measureToDelete);

    const req = http.expectOne((request) =>
      request.url.endsWith(`measures/${measureToDelete.healthRecordId}/${measureToDelete.id}`)
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(null);

    await promise;

    expect(store.weightArray()?.length).toBe(2);
    expect(store.weightArray()?.find(m => m.id === measureToDelete.id)).toBeUndefined();
  });
});
