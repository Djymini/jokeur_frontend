import { Component, inject } from '@angular/core';
import { DashboardAnimalComponent } from '@/features/dashboard/components/dashboard-animal/dashboard-animal.component';
import { DashboardAppointmentComponent } from '@/features/dashboard/components/dashboard-appointment/dashboard-appointment.component';
import { DashboardNewsComponent } from '@/features/dashboard/components/dashboard-news/dashboard-news.component';
import { DashboardReminderComponent } from '@/features/dashboard/components/dashboard-reminder/dashboard-reminder.component';
import { HealthRecordFacade } from '@/features/health-records/services/health-record.facade';
import { DashboardFacade } from '@/features/dashboard/facade/dashboard-facade';
import { DashboardStore } from '@/features/dashboard/store/dashboard-store';

@Component({
  selector: 'app-home.page',
  imports: [
    DashboardAnimalComponent,
    DashboardAppointmentComponent,
    DashboardNewsComponent,
    DashboardReminderComponent,
  ],
  template: `
    <section class="mb-8 px-4 md:px-14">
      <h2 class="title">Informations</h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 parent items-stretch"
      >
        <app-dashboard-news></app-dashboard-news>
        <app-dashboard-reminder></app-dashboard-reminder>
        <app-dashboard-appointment></app-dashboard-appointment>
      </div>
    </section>
    <app-dashboard-animal class="dashboard-animal-section"></app-dashboard-animal>
  `,
  styles: `
    :host {
      display: block;
      padding: 3rem 3rem 4rem;

      @media (max-width: 1024px) {
        padding: 2.5rem 2rem 3rem;
      }

      @media (max-width: 768px) {
        padding: 2rem 1.5rem 2.5rem;
      }

      @media (max-width: 640px) {
        padding: 1.5rem 1rem 2rem;
      }

      @media (max-width: 480px) {
        padding: 1rem 0.75rem 1.5rem;
      }
    }

    .title {
      margin: 0 0 1.75rem 0;
      color: var(--secondary-dark);

      @media (max-width: 768px) {
        margin: 0 0 1.5rem 0;
        font-size: 1.5rem;
      }

      @media (max-width: 640px) {
        margin: 0 0 1.25rem 0;
        font-size: 1.35rem;
      }

      @media (max-width: 480px) {
        margin: 0 0 1rem 0;
        font-size: 1.25rem;
      }
    }

    .parent {
      margin: 0;
    }

    @media (max-width: 640px) {
      :host {
        padding: 3rem 0.5rem 4rem;
    .dashboard-info-section {
      width: 100%;

      @media (max-width: 768px) {
        margin-bottom: 1.5rem !important;
        padding-left: 1rem !important;
        padding-right: 1rem !important;
      }

      @media (max-width: 480px) {
        margin-bottom: 1rem !important;
        padding-left: 0.5rem !important;
        padding-right: 0.5rem !important;
      }
    }

    .section-title {
      @media (max-width: 768px) {
        margin-bottom: 1.25rem;
      }
    }

    .info-grid {
      @media (max-width: 640px) {
        gap: 1rem !important;
      }

      @media (max-width: 480px) {
        gap: 0.75rem !important;
      }
    }

    .info-card {
      display: block;
      width: 100%;
      height: 100%;
    }

    .dashboard-animal-section {
      display: block;
      width: 100%;

      @media (max-width: 768px) {
        margin-top: 0.5rem;
      }
    }
  `,
})
export default class DashboardPage {
  private readonly _facade = inject(HealthRecordFacade);
  private readonly _dashbordFacade = inject(DashboardFacade);
  private readonly _dashboardStore = inject(DashboardStore);

  constructor() {
    this._dashbordFacade.loadDashbooardData();
    this._facade.loadFormMetadata().then((m) => this._dashboardStore.metadata.set(m));
  }
}
