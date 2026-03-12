import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { startOfDay, addHours } from 'date-fns';
import {
  CalendarView,
  CalendarEvent,
  CalendarEventAction,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  CalendarPreviousViewDirective,
  CalendarNextViewDirective,
  CalendarTodayDirective,
  CalendarDatePipe,
} from 'angular-calendar';
import { ZardButtonComponent } from '@/shared/components/button';
import { CalendarStore } from '@/features/calendar/services/calendar-store';
import { AuthService } from '@/core/services/auth.service';
import { CalendarFacade } from '@/features/calendar/services/calendar-facade';

@Component({
  selector: 'app-calendar',
  imports: [
    CommonModule,
    CalendarMonthViewComponent,
    CalendarWeekViewComponent,
    CalendarDayViewComponent,
    CalendarPreviousViewDirective,
    CalendarNextViewDirective,
    CalendarTodayDirective,
    CalendarDatePipe,
    ZardButtonComponent,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  private _calendarFacade = inject(CalendarFacade);

  view = signal<CalendarView>(CalendarView.Month);
  events = inject(CalendarStore).calendarEvent;
  user = inject(AuthService).user;

  viewDate: Date = new Date();
  CalendarView = CalendarView;

  actions: CalendarEventAction[] = [
    {
      label: '✏️',
      a11yLabel: 'Éditer',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        //this.editEvent(event);
        console.log(event);
      },
    },
    {
      label: '🗑️',
      a11yLabel: 'Supprimer',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        //this.deleteEvent(event);
        console.log(event);
      },
    },
  ];

  ngOnInit(): void {
    this._calendarFacade.getCalendar(this.user()!.id.toString(), this.viewDate.toISOString());
  }

  setView(newView: CalendarView): void {
    this.view.set(newView);
  }

  /*addEvent(): void {
    const newEvent: CalendarEvent = {
      title: 'Nouvel événement',
      start: startOfDay(this.viewDate), // Ajoute à la date actuellement regardée
      end: addHours(startOfDay(this.viewDate), 1),
      color: { primary: '#28a745', secondary: '#D4EDDA' },
      actions: this.actions,
      draggable: true,
    };
    this.events.update((currentEvents) => [...currentEvents, newEvent]);
  }

  editEvent(eventToEdit: CalendarEvent): void {
    const newTitle = prompt('Modifier le titre :', eventToEdit.title);
    if (newTitle) {
      this.events.update((currentEvents) => {
        return currentEvents.map((event) =>
          event === eventToEdit ? { ...event, title: newTitle } : event,
        );
      });
    }
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    if (confirm('Voulez-vous vraiment supprimer cet événement ?')) {
      this.events.update((currentEvents) =>
        currentEvents.filter((event) => event !== eventToDelete),
      );
    }
  }*/
}
