import { Component } from '@angular/core';
import { CalendarComponent } from '@/features/calendar/components/calendar.component/calendar.component';

@Component({
  selector: 'app-calendar.page',
  imports: [CalendarComponent],
  template: ` <app-calendar></app-calendar> `,
  styles: `
    :host {
      padding: 48px;
    }
  `,
})
export default class CalendarPage {}
