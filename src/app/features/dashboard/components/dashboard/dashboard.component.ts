import { Component, inject } from '@angular/core';
import { HealthRecordFormBootstrapService } from '@/features/health-records/services/health-record-form-bootstrap.service';
import { HealthRecordFacade } from '@/features/health-records/services/health-record.facade';
import { DashboardNewsComponent } from '@/features/dashboard/components/dashboard-news/dashboard-news.component';
import { DashboardFacade } from '@/features/dashboard/facade/dashboard-facade';
import { DashboardReminderComponent } from '@/features/dashboard/components/dashboard-reminder/dashboard-reminder.component';
import { DashboardAppointmentComponent } from '@/features/dashboard/components/dashboard-appointment/dashboard-appointment.component';
import { DashboardAnimalComponent } from '@/features/dashboard/components/dashboard-animal/dashboard-animal.component';
import { DashboardStore } from '@/features/dashboard/store/dashboard-store';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardNewsComponent,
    DashboardReminderComponent,
    DashboardAppointmentComponent,
    DashboardAnimalComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly _facade = inject(HealthRecordFacade);
  private readonly _bootstrap = inject(HealthRecordFormBootstrapService);
  private readonly _dashbordFacade = inject(DashboardFacade);
  private readonly _dashboardStore = inject(DashboardStore);

  constructor() {
    this._dashbordFacade.loadDashbooardData();
    this._bootstrap.init();
    this._facade.loadFormMetadata().then((m) => this._dashboardStore.metadata.set(m));
  }
}
