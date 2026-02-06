import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import {MeasuresFacade} from '../../app/features/measures/services/measures-facade'
import {MeasuresStore} from '../../app/features/measures/services/measures-store'
import {MeasuresApi} from '../../app/features/measures/services/measures-api'
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

describe('ProductFacade.createProduct (integration)', () => {
  let facade: MeasuresFacade;
  let http: HttpTestingController;
  let store: MeasuresStore;

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
    const data = 1001;
    const type = 'weight';
    const mockResponse = [
      {
        id: 6,
        value: 28.1,
        type: 'weight',
        creationDate: '2025-02-01',
        healthRecordNumber: 1001,
      },
      {
        id: 7,
        value: 28.3,
        type: 'weight',
        creationDate: '2025-02-02',
        healthRecordNumber: 1001,
      },
      {
        id: 8,
        value: 28.4,
        type: 'weight',
        creationDate: '2025-02-03',
        healthRecordNumber: 1001,
      },
      {
        id: 9,
        value: 28.5,
        type: 'weight',
        creationDate: '2025-02-04',
        healthRecordNumber: 1001,
      },
      {
        id: 10,
        value: 28.6,
        type: 'weight',
        creationDate: '2025-02-05',
        healthRecordNumber: 1001,
      },
    ];

    const promise = facade.getMeasure(data, type);

    //const req = http.expectOne(`${environment.apiUrl}/measure/weight/${data}`);
    //expect(req.request.method).toBe('GET');

    //req.flush(mockResponse);

    const result = await promise;
    expect(result.length).toBe(5);
    expect(store.weightArray()![0].value).toEqual(result[0].value);
  });

  it('should call API, add measure', async () => {
    // 1. Arrange
    const data = {
        value: 30,
        type: 'weight',
        healthRecordNumber: 1001,
      }

    const mockResponse = [
      {
        id: 6,
        value: 28.1,
        type: 'weight',
        creationDate: '2025-02-01',
        healthRecordNumber: 1001,
      },
      {
        id: 7,
        value: 28.3,
        type: 'weight',
        creationDate: '2025-02-02',
        healthRecordNumber: 1001,
      },
      {
        id: 8,
        value: 28.4,
        type: 'weight',
        creationDate: '2025-02-03',
        healthRecordNumber: 1001,
      },
      {
        id: 9,
        value: 28.5,
        type: 'weight',
        creationDate: '2025-02-04',
        healthRecordNumber: 1001,
      },
      {
        id: 10,
        value: 28.6,
        type: 'weight',
        creationDate: '2025-02-05',
        healthRecordNumber: 1001,
      },
      {
        id: 50,
        value: 30,
        type: 'weight',
        creationDate: '2025-02-01',
        healthRecordNumber: 1001,
      },
    ];

    const promise = facade.addMeasure(data);

    //const req = http.expectOne(`${environment.apiUrl}/measure/weight/${data}`);
    //expect(req.request.method).toBe('GET');

    //req.flush(mockResponse);

    const result = await promise;
    expect(result.creationDate).toBe('2025-02-05');
  });

  it('should call API, modify measure', async () => {
    // 1. Arrange
    const data = {
        id: 6,
        value: 30,
        type: 'weight',
        creationDate: '2025-02-01',
        healthRecordNumber: 1001,
      }

    const mockResponse = [
      {
        id: 6,
        value: 28.1,
        type: 'weight',
        creationDate: '2025-02-01',
        healthRecordNumber: 1001,
      },
      {
        id: 7,
        value: 28.3,
        type: 'weight',
        creationDate: '2025-02-02',
        healthRecordNumber: 1001,
      },
      {
        id: 8,
        value: 28.4,
        type: 'weight',
        creationDate: '2025-02-03',
        healthRecordNumber: 1001,
      },
      {
        id: 9,
        value: 28.5,
        type: 'weight',
        creationDate: '2025-02-04',
        healthRecordNumber: 1001,
      },
      {
        id: 10,
        value: 28.6,
        type: 'weight',
        creationDate: '2025-02-05',
        healthRecordNumber: 1001,
      },
      {
        id: 50,
        value: 30,
        type: 'weight',
        creationDate: '2025-02-01',
        healthRecordNumber: 1001,
      },
    ];

    const promise = facade.modify(data);

    //const req = http.expectOne(`${environment.apiUrl}/measure/weight/${data}`);
    //expect(req.request.method).toBe('GET');

    //req.flush(mockResponse);

    const result = await promise;
    expect(result.value).toBe(store.weightArray()![0].value);
  });

  it('should call API, remove measure', async () => {
    // 1. Arrange
    const data = {
      id: 6,
      value: 30,
      type: 'weight',
      creationDate: '2025-02-01',
      healthRecordNumber: 1001,
    }

    const mockResponse = [
      {
        id: 6,
        value: 28.1,
        type: 'weight',
        creationDate: '2025-02-01',
        healthRecordNumber: 1001,
      },
      {
        id: 7,
        value: 28.3,
        type: 'weight',
        creationDate: '2025-02-02',
        healthRecordNumber: 1001,
      },
      {
        id: 8,
        value: 28.4,
        type: 'weight',
        creationDate: '2025-02-03',
        healthRecordNumber: 1001,
      },
      {
        id: 9,
        value: 28.5,
        type: 'weight',
        creationDate: '2025-02-04',
        healthRecordNumber: 1001,
      },
      {
        id: 10,
        value: 28.6,
        type: 'weight',
        creationDate: '2025-02-05',
        healthRecordNumber: 1001,
      },
      {
        id: 50,
        value: 30,
        type: 'weight',
        creationDate: '2025-02-01',
        healthRecordNumber: 1001,
      },
    ];

    facade.remove(data);

    //const req = http.expectOne(`${environment.apiUrl}/measure/weight/${data}`);
    //expect(req.request.method).toBe('GET');

    //req.flush(mockResponse);

    expect(store.weightArray()!.length).toEqual(4);
    expect(store.weightArray()![0].value).toEqual(28.3);
  });
});
