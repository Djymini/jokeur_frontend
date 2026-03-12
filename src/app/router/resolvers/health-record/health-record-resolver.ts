import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { HealthRecordFacade } from '@/features/health-records/services/health-record.facade';
import { VaccinesFacade } from '@/features/vaccines/services/vaccines-facade';
import { TreatmentFacade } from '@/features/treatments/services/treatment-facade';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const healthRecordResolver: ResolveFn<HealthRecord | null> = (route, state) => {
  const idParams = route.paramMap.get('id');
  const healthRecordFacade = inject(HealthRecordFacade);
  if (!idParams) return null;
  const id: number = parseInt(idParams, 10);

  inject(VaccinesFacade).getVaccine(id);
  inject(TreatmentFacade).getTreatment(id);
  return healthRecordFacade.getHealthRecordById(id);
};
