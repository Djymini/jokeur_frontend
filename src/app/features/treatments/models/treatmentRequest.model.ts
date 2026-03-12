export type TreatmentRequest = {
  name: string;
  description: string;
  frequency: string;
  beginDate: Date;
  endDate: Date;
  treatmentReminderDate: Date;
  healthRecordId: number;
};
