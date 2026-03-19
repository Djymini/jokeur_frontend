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
      display: block;
      padding: 3rem 6.4rem 4rem;
      min-height: 100dvh;
      @media (max-width: 1024px) {
        padding: 2.5rem 3rem 3rem;
      }
      @media (max-width: 480px) {
        padding: 1rem 0.75rem 1.5rem;
      }
    }

    app-breadcrumb {
      display: block;
      margin-bottom: 32px;
      @media (max-width: 768px) {
        margin-bottom: 24px;
      }
      @media (max-width: 480px) {
        margin-bottom: 20px;
      }
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
