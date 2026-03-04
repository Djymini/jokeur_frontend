import { Component, inject } from '@angular/core';
import { DashboardStore } from '@/features/dashboard/store/dashboard-store';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ZardButtonComponent } from '@/shared/components/button';

@Component({
  selector: 'app-dashboard-appointment',
  imports: [DatePipe, RouterLink, ZardButtonComponent],
  templateUrl: './dashboard-appointment.component.html',
  styleUrl: './dashboard-appointment.component.scss',
})
export class DashboardAppointmentComponent {
  protected readonly dashboardStore = inject(DashboardStore);
}
