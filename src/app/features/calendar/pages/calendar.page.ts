import { Component } from '@angular/core';
import { CalendarComponent } from '@/features/calendar/components/calendar.component/calendar.component';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';
import { CalendarLegendComponent } from '@/features/calendar/components/calendar-legend/calendar-legend.component';

@Component({
  selector: 'app-calendar.page',
  imports: [CalendarComponent, ZardButtonComponent, ZardIconComponent, CalendarLegendComponent],
  template: `
    <section class="mb-8">
      <div class="page-header">
      <h2 class="page-title">Agenda</h2>
      <button
        z-button
        type="button"
        zType="ghost"
        class="add-btn"
        (click)="calendar.openDialogAdd()"
      >
        <z-icon zType="plus" />
        Ajouter un événement
      </button>
    </div>
    <app-calendar #calendar></app-calendar>
    <app-calendar-legend />
    </section>
  `,
  styles: `
    :host {
      display: block;
      padding: 3rem 6rem 4rem;
    }

    app-calendar-legend {
      display: block;
      margin-top: 25px;
    }

    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.75rem;
    }

    .page-title {
      margin: 0;
      color: var(--secondary);
    }

    .page-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .add-btn {
      background-color: var(--accent) !important;
      color: white !important;
      padding: 0 24px !important;
      font-size: 0.95rem;
      font-weight: 600;

      &:hover {
        background-color: var(--teal-dark) !important;
      }
    }
  `,
})
export default class CalendarPage {}
