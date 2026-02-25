import { Injectable, signal } from '@angular/core';
import { PageModel } from '@/shared/models/page-model';
import { AppointmentModel } from '@/shared/models/appointment-model';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { ReminderModel } from '@/shared/models/reminder-model';
import { NewsModel } from '@/shared/models/news-model';
import { HealthRecordFormMetadata } from '@/features/health-records/services/health-record-metadata.api';

@Injectable({ providedIn: 'root' })
export class DashboardStore {
  appointments = signal<PageModel<AppointmentModel>>({ content: [], totalElements: 0 });
  animals = signal<HealthRecord[]>([]);
  reminders = signal<PageModel<ReminderModel>>({ content: [], totalElements: 0 });
  news = signal<PageModel<NewsModel>>({ content: [], totalElements: 0 });
  metadata = signal<HealthRecordFormMetadata | null>(null);
}
