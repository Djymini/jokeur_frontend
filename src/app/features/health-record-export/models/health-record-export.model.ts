import { MeasureType } from '@/features/measures/utils/measureTypeEnum';

export type HealthRecordExportRequest = {
  from: string;
  to: string;
  measureTypes: MeasureType[];
  includeVaccines: boolean;
};
