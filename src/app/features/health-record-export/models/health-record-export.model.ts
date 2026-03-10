import { MeasureType } from '@/features/measures/utils/measureTypeEnum';

export type ExportFormat = 'PDF' | 'XLSX';

export type HealthRecordExportRequest = {
  from: string;
  to: string;
  measureTypes: MeasureType[];
  includeVaccines: boolean;
  format: ExportFormat;
};
