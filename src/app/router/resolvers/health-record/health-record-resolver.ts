import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { HealthRecordFacade } from '@/features/health-records/services/health-record.facade';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const healthRecordResolver: ResolveFn<HealthRecord | null> = (route, state) => {
  const idParams = route.paramMap.get('id');
  const healthRecordFacade = inject(HealthRecordFacade);
  if (!idParams) return null;

  return healthRecordFacade.getHealthRecordById(parseInt(idParams, 10));
};
