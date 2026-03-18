import { Component, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CalendarView,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  CalendarPreviousViewDirective,
  CalendarNextViewDirective,
  CalendarTodayDirective,
  CalendarDatePipe,
} from 'angular-calendar';
import { ZardButtonComponent } from '@/shared/components/button';
import { CalendarStore } from '@/features/calendar/services/calendar-store';
import { AuthService } from '@/core/services/auth.service';
import { CalendarFacade } from '@/features/calendar/services/calendar-facade';
import { toast } from 'ngx-sonner';
import { ZardDialogService } from '@/shared/components/dialog';
import { AppointmentAddDialogComponent } from '@/features/appointment/components/appointment-add-dialog.component/appointment-add-dialog.component';
import { AppointmentRequest } from '@/features/appointment/models/appointmentRequest.model';

@Component({
  selector: 'app-calendar',
  imports: [
    CommonModule,
    CalendarMonthViewComponent,
    CalendarWeekViewComponent,
    CalendarDayViewComponent,
    CalendarPreviousViewDirective,
    CalendarNextViewDirective,
    CalendarTodayDirective,
    CalendarDatePipe,
    ZardButtonComponent,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  private _dialogService = inject(ZardDialogService);
  private _calendarFacade = inject(CalendarFacade);

  view = signal<CalendarView>(CalendarView.Month);
  events = inject(CalendarStore).calendarEvent;
  user = inject(AuthService).user;

  viewDate: Date = new Date();
  CalendarView = CalendarView;

  readonly addEventRequested = output<void>();

  setView(newView: CalendarView): void {
    this.view.set(newView);
  }

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
        } catch (error) {
          toast.error('Erreur lors de la création');
          throw error;
        }
      },
      zCancelText: 'Annuler',
      zWidth: '425px',
    });
  }

  updateAgenda(): void {
    const userId = this.user()?.id;
    if (!userId) return;
    this._calendarFacade.getCalendar(userId.toString(), this.viewDate.toISOString());
  }
}
