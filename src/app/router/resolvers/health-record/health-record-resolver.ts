import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { HealthRecordFacade } from '@/features/health-records/services/health-record.facade';

export const healthRecordResolver: ResolveFn<HealthRecord> = (route, state) => {
  let idParams = route.paramMap.get('id');
  const url = state.url;
  const healthRecordFacade = inject(HealthRecordFacade);
  if (!idParams) {
    idParams = '0';
    url.toString();
  }

  return healthRecordFacade.getHealthRecordById(parseInt(idParams));
};
