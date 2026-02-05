import { inject, Injectable } from '@angular/core';
import { HealthRecordApi } from '@/features/health-record/services/health-record-api';
import { HealthRecordStore } from '@/features/health-record/services/health-record-store';

@Injectable({
  providedIn: 'root',
})
export class HealthRecordFacade {
  //TODO: make the health record facade
  private _healthRecordApi = inject(HealthRecordApi);
  private _healthRecordStore = inject(HealthRecordStore);
}
