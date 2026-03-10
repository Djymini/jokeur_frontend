import { Component, input, output } from '@angular/core';
import { DateCardComponent } from '@/internal-shared/components/date-card.component/date-card.component';
import { ZardButtonComponent } from '@/shared/components/button';
import { PageModel } from '@/shared/models/page-model';
import { Reminder } from '@/features/reminders/models/reminder.model';
import { ZardIconComponent } from '@/shared/components/icon';

@Component({
  selector: 'app-reminder-section',
  imports: [DateCardComponent, ZardButtonComponent, ZardIconComponent],
  templateUrl: './reminder-section.component.html',
  styleUrl: './reminder-section.component.scss',
})
export class ReminderSectionComponent {
  currentPage = input.required<number>();
  reminderPage = input.required<PageModel<Reminder>>();
  totalPages = input.required<number>();
  pageSize = input.required<number>();
  totalElements = input.required<number>();

  protected readonly Math = window.Math;

  currentPageArePrevious = output<number>();
  currentPageAreNext = output<number>();

  onNextPage(): void {
    this.currentPageAreNext.emit(this.currentPage());
  }

  onPreviousPage(): void {
    this.currentPageArePrevious.emit(this.currentPage());
  }
}
