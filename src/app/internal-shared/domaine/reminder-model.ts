export interface ReminderModel {
  message: string;
  id: number,
  type: string,
  description: string,
  reminderDate: Date,
  notificationSent: boolean,
  status: string,
}
