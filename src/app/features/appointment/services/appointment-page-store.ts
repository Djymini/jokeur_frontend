import { Injectable, signal } from '@angular/core';
import { Appointment } from '@/features/appointment/models/appointment.model';
import { PageModel } from '@/shared/models/page-model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentPageStore {
  appointmentPage = signal<PageModel<Appointment>>({ content: [], totalElements: 0 });
}
