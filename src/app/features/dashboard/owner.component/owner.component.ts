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
import { HealthRecordApi } from '@/features/health-records/services/health-record.api';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { ZardIconComponent } from '@/shared/components/icon';
import { HealthRecordFormMetadata } from '@/features/health-records/services/health-record-metadata.api';
import {
  HealthRecordFormBootstrapService
} from '@/features/health-records/services/health-record-form-bootstrap.service';
import { HealthRecordFacade } from '@/features/health-records/services/health-record.facade';
import { DynamicFormModalComponent } from '@/shared/components/forms/dynamic-form-modal/dynamic-form-modal.component';

@Component({
  selector: 'app-owner',
  imports: [
    ZardButtonComponent,
    DatePipe,
    RouterLink,
    ZardIconComponent,
    DynamicFormModalComponent,
  ],
  templateUrl: './owner.component.html',
  styleUrl: './owner.component.scss',
})
export class OwnerComponent implements OnInit {
  router = inject(Router);
  appointmentApi = inject(AppointmentApiService);
  HealthRecordApi = inject(HealthRecordApi);
  reminderApi = inject(ReminderApiService);
  notificationApi = inject(NotificationApiService);
  private readonly _facade = inject(HealthRecordFacade);
  private readonly _bootstrap = inject(HealthRecordFormBootstrapService);

  appointments = signal<AppointmentModel[]>([]);
  animals = signal<HealthRecord[]>([]);
  reminders = signal<ReminderModel[]>([]);
  notifications = signal<NotificationModel[]>([]);
  isOpen = signal(false);
  metadata = signal<HealthRecordFormMetadata | null>(null);

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

  constructor() {
    this._bootstrap.init();
    this._facade.loadFormMetadata().then((m) => this.metadata.set(m));
  }

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

  async onSubmit(payload: Record<string, unknown>): Promise<void> {
    try {
      const newAnimal = await this._facade.createFromFormPayload(payload, 1);
      this.animals.update((list) => [...list, newAnimal]);
      this.isOpen.set(false);
    } catch (error) {
      console.error(error);
    }
  }
}
