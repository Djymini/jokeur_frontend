export interface CreateUpdateSymptomRecordDto {
  symptomId: number;
  observationDate?: Date;
  observation?: string;
  endDate?: Date;
  active?: boolean;
}
