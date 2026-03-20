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
          <span class="mobile">Ajouter un événement</span>
        </button>
      </div>
      <app-calendar #calendar></app-calendar>
      <app-calendar-legend />
    </section>
  `,
  styles: `
    :host {
      display: block;
      padding: 3rem 6.5rem 4rem;

      @media (max-width: 1024px) {
        padding: 2rem 3rem 3rem;
      }

      @media (max-width: 768px) {
        padding: 1.5rem 1rem 2rem;
      }

      @media (max-width: 480px) {
        padding: 1rem 0.75rem 1.5rem;
      }
    }

    app-calendar-legend {
      display: block;
      margin-top: 25px;

      @media (max-width: 768px) {
        margin-top: 20px;
      }

      @media (max-width: 480px) {
        margin-top: 16px;
      }
    }

    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.75rem;

      @media (max-width: 768px) {
        margin-bottom: 1.25rem;
        flex-wrap: wrap;
        gap: 12px;
      }

      @media (max-width: 480px) {
        margin-bottom: 1rem;
      }
    }

    .page-title {
      margin: 0;
      color: var(--secondary);

      @media (max-width: 768px) {
        font-size: 1.5rem;
      }

      @media (max-width: 480px) {
        font-size: 1.25rem;
      }
    }

    .page-actions {
      display: flex;
      align-items: center;
      gap: 12px;

      @media (max-width: 768px) {
        width: 100%;
        justify-content: flex-end;
      }
    }

    .add-btn {
      background-color: var(--teal-light) !important;
      color: white !important;
      padding: 0 24px !important;
      font-size: 0.95rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 8px;

      @media (max-width: 768px) {
        padding: 0 16px !important;
        min-width: auto;
      }

      @media (max-width: 480px) {
        padding: 0 12px !important;
        width: 40px !important;
        height: 40px !important;
        border-radius: 50% !important;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0;
      }

      &:hover {
        background-color: var(--teal-dark) !important;
      }

      .mobile {
        @media (max-width: 480px) {
          display: none !important;
        }
      }

      z-icon {
        font-size: 1.1rem;
        line-height: 1;

        @media (max-width: 480px) {
          margin: 0;
          font-size: 1.25rem;
          display: inline-block;
        }
      }
    }
  `,
})
export default class CalendarPage {}
