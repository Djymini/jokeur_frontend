import { SymptomResponseDto } from '@/features/symptom/models/symptom-response-dto';

export interface SymptomHealthRecordDTO {
  id?: number;
  symptom?: SymptomResponseDto | undefined;
  observationDate: string;
  observation?: string;
  endDate?: string;
  active?: boolean;
}
