import { Component, input, output } from '@angular/core';
import { PageModel } from '@/shared/models/page-model';
import { Appointment } from '@/features/appointment/models/appointment.model';
import { DateCardComponent } from '@/internal-shared/components/date-card.component/date-card.component';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';

@Component({
  selector: 'app-appointment-section',
  imports: [DateCardComponent, ZardButtonComponent, ZardIconComponent],
  templateUrl: './appointment-section.component.html',
  styleUrl: './appointment-section.component.scss',
})
export class AppointmentSectionComponent {
  currentPage = input.required<number>();
  appointmentPage = input.required<PageModel<Appointment>>();
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
