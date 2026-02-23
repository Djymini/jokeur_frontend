import { ResolveFn } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { HealthRecordFacade } from '@/features/health-records/services/health-record.facade';

export const healthRecordResolver: ResolveFn<HealthRecord | null> = (route, state) => {
  if (!isPlatformBrowser(inject(PLATFORM_ID))) return null;

  let idParams = route.paramMap.get('id');
  const url = state.url;
  const healthRecordFacade = inject(HealthRecordFacade);
  if (!idParams) {
    idParams = '0';
    url.toString();
  }

  return healthRecordFacade.getHealthRecordById(parseInt(idParams, 10));
};
