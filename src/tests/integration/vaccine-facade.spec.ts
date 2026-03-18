import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { VaccinesFacade } from '@/features/vaccines/services/vaccines-facade';
import { VaccinesStore } from '@/features/vaccines/services/vaccines-store';
import { VaccinesApi } from '@/features/vaccines/services/vaccines-api';
import { Vaccine } from '@/features/vaccines/models/vaccine.model';
import { VaccineRequestDto } from '@/features/vaccines/models/vaccineRequestDto';
import { Reminder } from '@/features/reminders/models/reminder.model';

describe('VaccinesFacade (integration)', () => {
  let facade: VaccinesFacade;
  let http: HttpTestingController;
  let store: VaccinesStore;

  const mockReminder1: Reminder = {
    id: 1,
    type: 'VACCINE',
    description: 'Rappel',
    reminderDate: new Date('2026-12-01'),
    status: 'PENDING'
  };

  const mockReminder2: Reminder = {
    id: 2,
    type: 'VACCINE',
    description: 'Rappel',
    reminderDate: new Date('2026-12-01'),
    status: 'PENDING'
  };

  const mockResponse: Vaccine[] = [
    {
      id: 1,
      name: 'Pfizer',
      description: 'Covid-19',
      vaccinator: 'Dr. Smith',
      vaccineDate: new Date('2026-02-17'),
      healthRecordId: 1,
      reminder: mockReminder1
    },
    {
      id: 2,
      name: 'Moderna',
      description: 'Covid-19',
      vaccinator: 'Dr. Doe',
      vaccineDate: new Date('2026-02-17'),
      healthRecordId: 1,
      reminder: mockReminder2
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        VaccinesApi,
        VaccinesFacade,
        VaccinesStore
      ],
    });

    facade = TestBed.inject(VaccinesFacade);
    http = TestBed.inject(HttpTestingController);
    store = TestBed.inject(VaccinesStore);
  });

  it('should call API, get vaccine', async () => {
    const healthRecordNumber = 1;

    const promise = facade.getVaccine(healthRecordNumber);

    const req = http.expectOne((request) =>
      request.url.endsWith(`vaccines/${healthRecordNumber}`)
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    const result = await promise;
    expect(result.length).toBe(2);
    expect(store.vaccineArray()[0].id).toEqual(mockResponse[0].id);
  });

  it('should call API, add measure', async () => {
    const newValue: VaccineRequestDto = {
      name: 'Pfizer',
      description: 'Covid-19',
      vaccinator: 'Dr. Smith',
      vaccineDate: new Date('2026-02-17'),
      vaccineReminderDate: new Date('2026-12-01'),
      healthRecordId: 1
    };

    const promise = facade.addVaccine(newValue);

    const req = http.expectOne((request) =>
      request.url.endsWith(`vaccines`)
    );
    expect(req.request.method).toBe('POST');

    const mockCreatedResponse: Vaccine = {
      id: 99,
      ...newValue,
      reminder: mockReminder1
    };
    req.flush(mockCreatedResponse);

    const result = await promise;
    expect(result.id).toBe(99);
    expect(result.name).toBe(newValue.name);
  });

  it('should update store when modifying a measure', async () => {
    store.setVaccine(mockResponse);

    const vaccineToModify: Vaccine = {
      ...mockResponse[0],
      name: 'Pfizer Updated'
    };

    const promise = facade.modify(vaccineToModify);

    const req = http.expectOne((request) =>
      request.url.endsWith(`vaccines/${vaccineToModify.healthRecordId}/${vaccineToModify.id}`)
    );
    expect(req.request.method).toBe('PUT');

    req.flush(vaccineToModify);

    await promise;

    const updatedName = store.vaccineArray().find(v => v.id === vaccineToModify.id)?.name;
    expect(updatedName).toBe('Pfizer Updated');
  });

  it('should remove measure from store after API call', async () => {
    store.setVaccine(mockResponse);

    const vaccineToDelete = mockResponse[0];

    const promise = facade.remove(vaccineToDelete);

    const req = http.expectOne((request) =>
      request.url.endsWith(`vaccines/${vaccineToDelete.healthRecordId}/${vaccineToDelete.id}`)
    );
    expect(req.request.method).toBe('DELETE');
    req.flush('Suppression réussie');

    await promise;

    expect(store.vaccineArray().length).toBe(1);
    expect(store.vaccineArray().find(v => v.id === vaccineToDelete.id)).toBeUndefined();
  });
});
