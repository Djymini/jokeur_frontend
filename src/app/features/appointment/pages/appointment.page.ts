import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { BreadcrumbComponent } from '@/internal-shared/components/breadcrumb.component/breadcrumb.component';
import { DatePageBase } from '@/internal-shared/pages/DatePageBase';
import { AppointmentPageStore } from '@/features/appointment/services/appointment-page-store';
import { AppointmentPageBehavior } from '@/features/appointment/interfaces/strategy/AppointmentPageBehavior';
import { AppointmentSectionComponent } from '@/features/appointment/components/appointment-section.component/appointment-section.component';

@Component({
  selector: 'app-reminder.page',
  imports: [BreadcrumbComponent, AppointmentSectionComponent],
  template: `
    <app-breadcrumb [breadcrumbRoad]="breadcrumbRoad"></app-breadcrumb>
    <app-appointment-section
      [appointmentPage]="appointmentPageStore.appointmentPage()"
      [currentPage]="currentPage()"
      [totalPages]="totalPages()"
      [pageSize]="pageSize()"
      [totalElements]="totalElements()"
      (currentPageAreNext)="nextPage()"
      (currentPageArePrevious)="previousPage()"
    >
    </app-appointment-section>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 48px;
    }
  `,
})
export default class AppointmentPage extends DatePageBase implements OnInit {
  appointmentPageStore = inject(AppointmentPageStore);

  constructor() {
    super();
    this.datePageManager = new AppointmentPageBehavior();
    this.totalPages = computed(() => this.appointmentPageStore.appointmentPage().totalPages || 0);
    this.totalElements = computed(
      () => this.appointmentPageStore.appointmentPage().totalElements || 0,
    );
  }

  ngOnInit(): void {
    this.breadcrumbRoad = [{ link: ['appointment'], name: 'Rendez-vous' }];
    this.datePageManager.loadReminders(
      this.currentPage(),
      this.pageSize(),
      this._authService.user()!,
    );
  }
}
