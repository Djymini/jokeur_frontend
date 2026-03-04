import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ZardButtonComponent } from '@/shared/components/button';
import { DashboardStore } from '@/features/dashboard/store/dashboard-store';

@Component({
  selector: 'app-dashboard-reminder',
  imports: [DatePipe, RouterLink, ZardButtonComponent],
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
