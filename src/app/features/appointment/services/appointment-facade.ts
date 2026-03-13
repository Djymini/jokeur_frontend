import { inject, Injectable } from '@angular/core';
import { AppointmentApi } from '@/features/appointment/services/appointment.api';
import { AppointmentPageStore } from '@/features/appointment/services/appointment-page-store';
import { toast } from 'ngx-sonner';
import { Appointment } from '@/features/appointment/models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentFacade {
  private _appointmentApi = inject(AppointmentApi);
  private _appointmentPageStore = inject(AppointmentPageStore);

  async modify(appointmentForUpdate: Appointment, userId: number): Promise<void> {
    const newAppointment = await this._appointmentApi.modifyAppointment(
      appointmentForUpdate,
      userId.toString(),
    );
    this._appointmentPageStore.updateAppointment(newAppointment);

    toast.success('Rendez-vous modifiée', {
      duration: 2000,
    });
  }

  async remove(appointment: Appointment, userId: number): Promise<void> {
    const msgConfirmation = await this._appointmentApi.deleteAppointment(
      appointment,
      userId.toString(),
    );
    this._appointmentPageStore.deleteAppointment(appointment.id);

    toast.success(msgConfirmation, {
      duration: 2000,
    });
  }
}
