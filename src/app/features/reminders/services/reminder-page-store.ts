import { Injectable, signal } from '@angular/core';
import { PageModel } from '@/shared/models/page-model';
import { Reminder } from '@/features/reminders/models/reminder.model';

@Injectable({
  providedIn: 'root',
})
export class ReminderPageStore {
  reminderPage = signal<PageModel<Reminder>>({ content: [], totalElements: 0 });
}
