import { computed, Injectable, signal } from '@angular/core';
import { Agenda } from '@/features/calendar/models/agenda.model';
import { CalendarEvent } from 'angular-calendar';
import { CalendarEventMapper } from '@/features/calendar/mappers/calendarEventMapper';

@Injectable({
  providedIn: 'root',
})
export class CalendarStore {
  private _agendaSignal = signal<Agenda | undefined>(undefined);
  private _calendarEventsSignal = signal<CalendarEvent[]>([]);

  public agenda = computed(() => this._agendaSignal());
  public calendarEvent = computed(() => this._calendarEventsSignal());

  public setCalendar(agenda: Agenda): void {
    this._agendaSignal.set(agenda);
    this._calendarEventsSignal.set([]);

    this._agendaSignal()?.appointmentList.map((appointment) =>
      this._calendarEventsSignal.update((calendarEvents) => [
        ...(calendarEvents as CalendarEvent[]),
        CalendarEventMapper.appointmentToCalendarEvent(appointment),
      ]),
    );

    this._agendaSignal()?.reminderList.map((reminder) =>
      this._calendarEventsSignal.update((calendarEvents) => [
        ...(calendarEvents as CalendarEvent[]),
        CalendarEventMapper.reminderToCalendarEvent(reminder),
      ]),
    );
  }
}
