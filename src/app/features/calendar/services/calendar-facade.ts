import { inject, Injectable } from '@angular/core';
import { CalendarApi } from '@/features/calendar/services/calendar-api';
import { CalendarStore } from '@/features/calendar/services/calendar-store';
import { Agenda } from '@/features/calendar/models/agenda.model';
import { toast } from 'ngx-sonner';
import { AppointmentApi } from '@/features/appointment/services/appointment.api';
import { AppointmentRequest } from '@/features/appointment/models/appointmentRequest.model';
import { Appointment } from '@/features/appointment/models/appointment.model';
import { CalendarEventMapper } from '@/features/calendar/mappers/calendarEventMapper';

@Injectable({
  providedIn: 'root',
})
export class CalendarFacade {
  private _calendarApi: CalendarApi = inject(CalendarApi);
  private _appointmentApi: AppointmentApi = inject(AppointmentApi);
  private _calendarStore: CalendarStore = inject(CalendarStore);

  async getCalendar(userId: string, date: string): Promise<void> {
    const newAgenda: Agenda = await this._calendarApi.getAgenda(userId, date);
    this._calendarStore.setCalendar(newAgenda);
  }

  async addAppointment(data: AppointmentRequest): Promise<void> {
    const newAppointment: Appointment = await this._appointmentApi.addApointment(data);
    this._calendarStore.addEvent(CalendarEventMapper.appointmentToCalendarEvent(newAppointment));

    toast.success('Valeur ajoutée au carnet', {
      duration: 2000,
    });
  }
}
