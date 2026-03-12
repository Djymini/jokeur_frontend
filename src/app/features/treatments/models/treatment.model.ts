import { Reminder } from '@/features/reminders/models/reminder.model';

export type Treatment = {
  id: number;
  name: string;
  description: string;
  frequency: string;
  beginDate: Date;
  endDate: Date;
  healthRecordId: number;
  reminder: Reminder;
};
