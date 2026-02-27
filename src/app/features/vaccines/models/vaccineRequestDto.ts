export type VaccineRequestDto = {
  name: string;
  description: string;
  vaccinator: string;
  vaccineDate: Date;
  vaccineReminderDate: Date;
  healthRecordId: number;
};
