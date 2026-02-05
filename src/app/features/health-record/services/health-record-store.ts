import { computed, Injectable, signal } from '@angular/core';
import { HealthRecordModel } from '@/features/health-record/models/healthRecordModel';

@Injectable({
  providedIn: 'root',
})
export class HealthRecordStore {
  //Todo: complete the health record store
  private _healthRecordSignal = signal<HealthRecordModel | undefined>(
    {
      healthRecordNumber: 1001,
      ownerId: 42,
      petName: "Nala",
      animalType: "Dog",
      breed: "Golden Retriever",
      sex: "Femele",
      birthDate: "2020-04-15",
      currentWeight: 28.5,
      color: "Golden",
      identificationNumber: "FR123456789",
      tattooNumber: "TAT987654",
      allergy: "None",

      respiratoryRate: [
        {
          id: 1,
          value: 22,
          type: "respiratoryRate",
          creationDate: "2025-02-01",
          healthRecordNumber: 1001,
        },
        {
          id: 2,
          value: 23,
          type: "respiratoryRate",
          creationDate: "2025-02-02",
          healthRecordNumber: 1001,
        },
        {
          id: 3,
          value: 21,
          type: "respiratoryRate",
          creationDate: "2025-02-03",
          healthRecordNumber: 1001,
        },
        {
          id: 4,
          value: 22,
          type: "respiratoryRate",
          creationDate: "2025-02-04",
          healthRecordNumber: 1001,
        },
        {
          id: 5,
          value: 24,
          type: "respiratoryRate",
          creationDate: "2025-02-05",
          healthRecordNumber: 1001,
        }
      ],

      weight: [
        {
          id: 6,
          value: 28.1,
          type: "weight",
          creationDate: "2025-02-01",
          healthRecordNumber: 1001,
        },
        {
          id: 7,
          value: 28.3,
          type: "weight",
          creationDate: "2025-02-02",
          healthRecordNumber: 1001,
        },
        {
          id: 8,
          value: 28.4,
          type: "weight",
          creationDate: "2025-02-03",
          healthRecordNumber: 1001,
        },
        {
          id: 9,
          value: 28.5,
          type: "weight",
          creationDate: "2025-02-04",
          healthRecordNumber: 1001,
        },
        {
          id: 10,
          value: 28.6,
          type: "weight",
          creationDate: "2025-02-05",
          healthRecordNumber: 1001,
        }
      ],

      bpm: [
        {
          id: 11,
          value: 90,
          type: "bpm",
          creationDate: "2025-02-01",
          healthRecordNumber: 1001,
        },
        {
          id: 12,
          value: 92,
          type: "bpm",
          creationDate: "2025-02-02",
          healthRecordNumber: 1001,
        },
        {
          id: 13,
          value: 91,
          type: "bpm",
          creationDate: "2025-02-03",
          healthRecordNumber: 1001,
        },
        {
          id: 14,
          value: 93,
          type: "bpm",
          creationDate: "2025-02-04",
          healthRecordNumber: 1001,
        },
        {
          id: 15,
          value: 94,
          type: "bpm",
          creationDate: "2025-02-05",
          healthRecordNumber: 1001,
        }
      ],

      temperature: [
        {
          id: 16,
          value: 38.2,
          type: "temperature",
          creationDate: "2025-02-01",
          healthRecordNumber: 1001,
        },
        {
          id: 17,
          value: 38.3,
          type: "temperature",
          creationDate: "2025-02-02",
          healthRecordNumber: 1001,
        },
        {
          id: 18,
          value: 38.4,
          type: "temperature",
          creationDate: "2025-02-03",
          healthRecordNumber: 1001,
        },
        {
          id: 19,
          value: 38.5,
          type: "temperature",
          creationDate: "2025-02-04",
          healthRecordNumber: 1001,
        },
        {
          id: 20,
          value: 38.6,
          type: "temperature",
          creationDate: "2025-02-05",
          healthRecordNumber: 1001,
        }
      ]
    }
  );

  healthRecord = computed(() => this._healthRecordSignal());
  weightArray = computed(() => this._healthRecordSignal()!.weight);
  bpmArray = computed(() => this._healthRecordSignal()!.bpm);
  temperatureArray = computed(() => this._healthRecordSignal()!.temperature);
  respiratoryRateArray = computed(() => this._healthRecordSignal()!.respiratoryRate);
}
