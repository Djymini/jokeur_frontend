import { Component, inject } from '@angular/core';
import { DashboardStore } from '@/features/dashboard/store/dashboard-store';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ZardButtonComponent } from '@/shared/components/button';

@Component({
  selector: 'app-dashboard-news',
  imports: [DatePipe, RouterLink, ZardButtonComponent],
  templateUrl: './dashboard-news.component.html',
  styleUrl: './dashboard-news.component.scss',
})
export class DashboardNewsComponent {
  protected readonly dashboardStore = inject(DashboardStore);
}
