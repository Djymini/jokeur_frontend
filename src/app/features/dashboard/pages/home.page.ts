import { Component } from '@angular/core';
import { DashboardComponent } from '@/features/dashboard/components/dashboard/dashboard.component';

@Component({
  selector: 'app-home.page',
  imports: [DashboardComponent],
  template: ` <app-dashboard></app-dashboard> `,
  styles: ``,
})
export default class HomePage {}
