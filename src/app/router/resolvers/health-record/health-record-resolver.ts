import { ResolveFn } from '@angular/router';
import { HealthRecordModel } from '@/features/health-record/models/healthRecordModel';
import { inject } from '@angular/core';
import { HealthRecordFacade } from '@/features/health-record/services/health-record-facade';

export const healthRecordResolver: ResolveFn<HealthRecordModel> = (route, state) => {
  let idParams = route.paramMap.get('id');
  const url = state.url;
  const healthRecordFacade = inject(HealthRecordFacade);
  if (!idParams) {
    idParams = '0';
    url.toString();
  }

  return healthRecordFacade.getHealthRecordById(idParams);
};
