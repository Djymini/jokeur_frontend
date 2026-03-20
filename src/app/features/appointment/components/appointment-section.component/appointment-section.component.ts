import { Component, inject, input, output } from '@angular/core';
import { PageModel } from '@/shared/models/page-model';
import { Appointment } from '@/features/appointment/models/appointment.model';
import { DateCardComponent } from '@/internal-shared/components/date-card.component/date-card.component';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';
import { AppointmentAddDialogComponent } from '@/features/appointment/components/appointment-add-dialog.component/appointment-add-dialog.component';
import { AppointmentRequest } from '@/features/appointment/models/appointmentRequest.model';
import { toast } from 'ngx-sonner';
import { ZardDialogService } from '@/shared/components/dialog';
import { AuthService } from '@/core/services/auth.service';
import { CalendarFacade } from '@/features/calendar/services/calendar-facade';

@Component({
  selector: 'app-appointment-section',
  imports: [DateCardComponent, ZardButtonComponent, ZardIconComponent],
  templateUrl: './appointment-section.component.html',
  styleUrl: './appointment-section.component.scss',
})
export class AppointmentSectionComponent {
  private _dialogService = inject(ZardDialogService);
  private _calendarFacade = inject(CalendarFacade);

  currentPage = input.required<number>();
  appointmentPage = input.required<PageModel<Appointment>>();
  totalPages = input.required<number>();
  pageSize = input.required<number>();
  totalElements = input.required<number>();
  user = inject(AuthService).user;

  updatePage = output<void>();

  protected readonly Math = window.Math;

  currentPageArePrevious = output<number>();
  currentPageAreNext = output<number>();

  openDialogAdd(): void {
    this._dialogService.create({
      zTitle: `Ajouter un événement`,
      zContent: AppointmentAddDialogComponent,
      zOkText: 'Enregistrer',
      zOnOk: async (instance) => {
        const formValue = instance.form.getRawValue();

        const addAppointment: AppointmentRequest = {
          reason: formValue.reason,
          dateTime: formValue.dateTime,
          duration: formValue.duration,
          userId: this.user()!.id,
        };

        try {
          await this._calendarFacade.addAppointment(addAppointment);
          this.updatePage.emit();
        } catch (error) {
          toast.error('Erreur lors de la création');
          throw error;
        }
      },
      zCancelText: 'Annuler',
      zWidth: '425px',
    });
  }

  onNextPage(): void {
    this.currentPageAreNext.emit(this.currentPage());
  }

  onPreviousPage(): void {
    this.currentPageArePrevious.emit(this.currentPage());
  }
}
