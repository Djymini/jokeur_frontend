import { Reminder } from '@/features/reminders/models/reminder.model';
import { Appointment } from '@/features/appointment/models/appointment.model';

export type Agenda = {
  reminderList: Reminder[];
  appointmentList: Appointment[];
};
