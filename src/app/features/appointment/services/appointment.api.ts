import { Injectable } from '@angular/core';
import { BaseApi } from '@/internal-shared/services/base.api';
import { AppointmentModel } from '@/shared/models/appointment-model';
import { PageModel } from '@/shared/models/page-model';
import { AppointmentRequest } from '@/features/appointment/models/appointmentRequest.model';
import { Appointment } from '@/features/appointment/models/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentApi extends BaseApi {
  private readonly _endpoint = '/appointment';

  async getAppointments(
    userId: number,
    page: number,
    size: number,
  ): Promise<PageModel<AppointmentModel>> {
    return this.get<PageModel<AppointmentModel>>(
      this._endpoint + `?userId=${userId}&page=${page}&size=${size}`,
    );
  }

  async addApointment(appointmentRequest: AppointmentRequest): Promise<Appointment> {
    return this.post<Appointment>('/appointment', appointmentRequest);
  }

  async modifyAppointment(appointmentNewValue: Appointment, userId: string): Promise<Appointment> {
    return this.put<Appointment>(`/appointment/${userId}/${appointmentNewValue.id}`, {
      reason: appointmentNewValue.reason,
      dateTime: appointmentNewValue.dateTime,
      duration: appointmentNewValue.duration,
      userId: userId,
    });
  }

  async deleteAppointment(appointmentNewValue: Appointment, userId: string): Promise<string> {
    return this.delete<string>(`/appointment/${userId}/${appointmentNewValue.id}`);
  }
}
