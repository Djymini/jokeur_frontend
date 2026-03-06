import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ZardButtonComponent } from '@/shared/components/button';
import { DashboardStore } from '@/features/dashboard/store/dashboard-store';
import { DashboardNotificationPipe } from '@/internal-shared/pipes/dashboard-notification-pipe';

@Component({
  selector: 'app-dashboard-reminder',
  imports: [RouterLink, ZardButtonComponent, DashboardNotificationPipe],
  templateUrl: './dashboard-reminder.component.html',
  styleUrl: './dashboard-reminder.component.scss',
})
export class DashboardReminderComponent {
  reminderTypeMap: Record<string, string> = {
    VACCINE: 'Vaccin',
    DEWORMING: 'Vermifuges',
    FLEA_TICK: 'Anti-puces',
    SEASONAL: 'Rappels saisonniers',
    OTHER: 'Autres types',
  };
  protected readonly dashboardStore = inject(DashboardStore);
}
