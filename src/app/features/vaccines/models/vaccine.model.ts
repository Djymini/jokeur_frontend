import { Reminder } from '@/features/reminders/models/reminder.model';

export type Vaccine = {
  id: number;
  name: string;
  description: string;
  vaccinator: string;
  vaccineDate: Date;
  healthRecordId: number;
  reminder: Reminder;
};
