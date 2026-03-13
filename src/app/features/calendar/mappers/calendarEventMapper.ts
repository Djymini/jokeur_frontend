import { Appointment } from '@/features/appointment/models/appointment.model';
import { CalendarEvent } from 'angular-calendar';
import { addMinutes } from 'date-fns';
import { Reminder } from '@/features/reminders/models/reminder.model';

export class CalendarEventMapper {
  public static appointmentToCalendarEvent(appointment: Appointment): CalendarEvent {
    const calendarEvent: CalendarEvent = {
      id: appointment.id,
      start: appointment.dateTime,
      end: addMinutes(appointment.dateTime, appointment.duration),
      title: appointment.reason,
      color: { primary: '#004E8AFF', secondary: '#75C3FFFF' },
    };

    return calendarEvent;
  }

  public static reminderToCalendarEvent(reminder: Reminder): CalendarEvent {
    const defaultDuration: number = 30;

    const calendarEvent: CalendarEvent = {
      id: reminder.id,
      start: reminder.reminderDate,
      end: addMinutes(reminder.reminderDate, defaultDuration),
      title: reminder.description,
      color: { primary: '#FF6933FF', secondary: '#CC360252' },
    };

    return calendarEvent;
  }
}
