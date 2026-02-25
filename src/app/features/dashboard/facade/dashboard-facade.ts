import { inject, Injectable } from '@angular/core';
import { AppointmentApiService } from '@/features/appointment/services/appointment.api.service';
import { ReminderApiService } from '@/features/dashboard/services/reminder.api.service';
import { NotificationApiService } from '@/features/dashboard/services/notification.api.service';
import { HealthRecordApi } from '@/features/health-records/services/health-record.api';
import { DashboardStore } from '@/features/dashboard/store/dashboard-store';
import { AuthService } from '@/core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class DashboardFacade {
  private _page = 0;
  private _pageSize = 1;
  user = inject(AuthService).user;
  appointmentApi = inject(AppointmentApiService);
  HealthRecordApi = inject(HealthRecordApi);
  reminderApi = inject(ReminderApiService);
  notificationApi = inject(NotificationApiService);
  dashboardStore = inject(DashboardStore);

  loadDashbooardData(): void {
    this.appointmentApi
      .getAppointments(this.user()!.id, this._page, this._pageSize)
      .then((result) => {
        this.dashboardStore.appointments.set(result);
      });

    this.HealthRecordApi.getAnimalInformation(this.user()!.id).then((result) => {
      this.dashboardStore.animals.set(result);
    });

    this.reminderApi.getAllReminder(this.user()!.id, this._page, this._pageSize).then((result) => {
      this.dashboardStore.reminders.set(result);
    });

    this.notificationApi.getAllNotifications(this._page, this._pageSize).then((result) => {
      this.dashboardStore.notifications.set(result);
    });
  }
}
