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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 48px;
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
