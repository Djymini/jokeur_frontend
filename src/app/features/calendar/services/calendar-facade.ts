import { inject, Injectable } from '@angular/core';
import { CalendarApi } from '@/features/calendar/services/calendar-api';
import { CalendarStore } from '@/features/calendar/services/calendar-store';
import { Agenda } from '@/features/calendar/models/agenda.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarFacade {
  private _calendarApi: CalendarApi = inject(CalendarApi);
  private _calendarStore: CalendarStore = inject(CalendarStore);

  async getCalendar(userId: string, date: string): Promise<void> {
    console.log(date);
    const newAgenda: Agenda = await this._calendarApi.getAgenda(userId, date);
    this._calendarStore.setCalendar(newAgenda);
  }
}
