import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { BreadcrumbComponent } from '@/internal-shared/components/breadcrumb.component/breadcrumb.component';
import { ReminderSectionComponent } from '@/features/reminders/components/reminder-section.component/reminder-section.component';
import { ReminderPageStore } from '@/features/reminders/services/reminder-page-store';
import { DatePageBase } from '@/internal-shared/pages/DatePageBase';
import { ReminderPageBehavior } from '@/features/reminders/interfaces/strategy/ReminderPageBehavior';

@Component({
  selector: 'app-reminder.page',
  imports: [BreadcrumbComponent, ReminderSectionComponent],
  template: `
    <app-breadcrumb [breadcrumbRoad]="breadcrumbRoad"></app-breadcrumb>
    <app-reminder-section
      [reminderPage]="reminderPageStore.reminderPage()"
      [currentPage]="currentPage()"
      [totalPages]="totalPages()"
      [pageSize]="pageSize()"
      [totalElements]="totalElements()"
      (currentPageAreNext)="nextPage()"
      (currentPageArePrevious)="previousPage()"
    >
    </app-reminder-section>
  `,
  styles: `
    :host {
      display: block;
      padding: 1.5rem 1rem 2rem;
      min-height: 100dvh;
    }

    app-breadcrumb {
      display: block;
      margin-bottom: 1.5rem;
    }

    @media (min-width: 768px) {
      :host {
        padding: 2rem 2rem 3rem;
      }

      app-breadcrumb {
        margin-bottom: 2rem;
      }
    }

    @media (min-width: 1024px) {
      :host {
        padding: 3rem 6.4rem 4rem;
      }
    }
  `,
})
export default class ReminderPage extends DatePageBase implements OnInit {
  reminderPageStore = inject(ReminderPageStore);

  constructor() {
    super();
    this.datePageManager = new ReminderPageBehavior();
    this.totalPages = computed(() => this.reminderPageStore.reminderPage().totalPages || 0);
    this.totalElements = computed(() => this.reminderPageStore.reminderPage().totalElements || 0);
  }

  ngOnInit(): void {
    this.breadcrumbRoad = [{ link: ['reminder'], name: 'Rappel' }];
    this.datePageManager.loadReminders(
      this.currentPage(),
      this.pageSize(),
      this._authService.user()!,
    );
  }
}
