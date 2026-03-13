import { AuthService } from '@/core/services/auth.service';
import { inject, Signal, signal } from '@angular/core';
import { BreadcrumbNode } from '@/internal-shared/models/breadcrumb-node.model';
import { DatePageInterface } from '@/internal-shared/interfaces/DatePageInterface';
import { ReminderPageBehavior } from '@/features/reminders/interfaces/strategy/ReminderPageBehavior';

export class DatePageBase {
  protected _authService = inject(AuthService);
  protected datePageManager: DatePageInterface = new ReminderPageBehavior();

  currentPage = signal<number>(0);
  pageSize = signal<number>(5);
  totalPages: Signal<number> = signal<number>(1);
  totalElements: Signal<number> = signal<number>(1);

  breadcrumbRoad: BreadcrumbNode[] = [];

  nextPage(): void {
    this.datePageManager.onPageChange(
      this.currentPage,
      this.datePageManager.nextPage(this.currentPage()),
      this.totalPages(),
    );

    this.datePageManager.loadReminders(
      this.currentPage(),
      this.pageSize(),
      this._authService.user()!,
    );
  }

  previousPage(): void {
    this.datePageManager.onPageChange(
      this.currentPage,
      this.datePageManager.previousPage(this.currentPage()),
      this.totalPages(),
    );

    this.datePageManager.loadReminders(
      this.currentPage(),
      this.pageSize(),
      this._authService.user()!,
    );
  }
}
