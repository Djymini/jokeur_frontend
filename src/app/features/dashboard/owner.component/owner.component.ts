import { Component, inject, OnInit, signal } from '@angular/core';
import { NotificationModel } from '@/internal-shared/domaine/notification-model';
import { ReminderModel } from '@/internal-shared/domaine/reminder-model';
import { AppointmentModel } from '@/internal-shared/domaine/appointment-model';
import { AppointmentApiService } from '@/features/appointment/services/appointment.api.service';
import { ZardButtonComponent } from '@/shared/components/button';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReminderApiService } from '@/features/reminder/services/reminder.api.service';
import { NotificationApiService } from '@/features/notification/notification.api.service';
import { HealthRecordApi } from '@/features/health-record/services/health-record-api';
import { HealthRecordModel } from '@/features/health-record/models/healthRecordModel';

@Component({
  selector: 'app-owner',
  imports: [ZardButtonComponent, DatePipe, RouterLink],
  templateUrl: './owner.component.html',
  styleUrl: './owner.component.scss',
})
export class OwnerComponent implements OnInit {
  router = inject(Router);
  appointmentApi = inject(AppointmentApiService);
  HealthRecordApi = inject(HealthRecordApi);
  reminderApi = inject(ReminderApiService);
  notificationApi = inject(NotificationApiService);

  appointments = signal<AppointmentModel[]>([]);
  animals = signal<HealthRecordModel[]>([]);
  reminders = signal<ReminderModel[]>([]);
  notifications = signal<NotificationModel[]>([]);

  animalTypeMap: Record<string, string> = {
    CAT: 'Chat',
    DOG: 'Chien',
  };

  reminderTypeMap: Record<string, string> = {
    VACCINE: 'Vaccin',
    DEWORMING: 'Vermifuges',
    FLEA_TICK: 'Anti-puces',
    SEASONAL: 'Rappels saisonniers',
    OTHER: 'Autres types',
  };

  ngOnInit(): void {
    this.appointmentApi.getAppointments().then((restult) => {
      this.appointments.set(restult);
    });

    this.HealthRecordApi.getAnimalInformation().then((restult) => {
      this.animals.set(restult);
    });

    this.reminderApi.getAllReminder().then((restult) => {
      this.reminders.set(restult);
    });

    this.notificationApi.getAllNotifications().then((restult) => {
      this.notifications.set(restult);
    });
  }
}
