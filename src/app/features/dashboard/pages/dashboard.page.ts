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
    <section class="mb-8">
      <h2 class="text text-card-foreground title">Informations</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 parent">
        <app-dashboard-news></app-dashboard-news>
        <app-dashboard-reminder></app-dashboard-reminder>
        <app-dashboard-appointment></app-dashboard-appointment>
      </div>
    </section>
    <app-dashboard-animal></app-dashboard-animal>
  `,
  styles: `
    .title {
      margin: 10px 16px;
      color: var(--secondary);
    }
    .parent {
      margin: 16px;
    }
    @media (min-width: 768px) {
      .title {
        margin: 10px 50px;
      }

      .parent {
        margin: 50px;
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
