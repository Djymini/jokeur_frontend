import { inject, Injectable } from '@angular/core';
import { AppointmentApi } from '@/features/appointment/services/appointment.api';
import { ReminderApiService } from '@/features/dashboard/services/reminder.api.service';
import { NewsApi } from '@/features/dashboard/services/news-api.service';
import { HealthRecordApi } from '@/features/health-records/services/health-record.api';
import { DashboardStore } from '@/features/dashboard/store/dashboard-store';
import { AuthService } from '@/core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class DashboardFacade {
  private _page = 0;
  private _pageSize = 1;
  user = inject(AuthService).user;
  appointmentApi = inject(AppointmentApi);
  HealthRecordApi = inject(HealthRecordApi);
  reminderApi = inject(ReminderApiService);
  newsApi = inject(NewsApi);
  dashboardStore = inject(DashboardStore);

  loadDashbooardData(): void {
    const userId = this.user()?.id;
    if (!userId) return;

    this.appointmentApi
      .getAppointments(userId, this._page, this._pageSize)
      .then((result) => {
        this.dashboardStore.appointments.set(result);
      });

    this.HealthRecordApi.getAnimalInformation(userId).then((result) => {
      this.dashboardStore.animals.set(result);
    });

    this.reminderApi.getAllReminder(userId, this._page, this._pageSize).then((result) => {
      this.dashboardStore.reminders.set(result);
    });

    this.newsApi.getAllNews(this._page, this._pageSize).then((result) => {
      this.dashboardStore.news.set(result);
    });
  }
}
