import { Component, computed, inject, input } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { Reminder } from '@/features/reminders/models/reminder.model';
import { DatePipe } from '@angular/common';
import { DateCounterPipe } from '@/internal-shared/pipes/date-counter-pipe';
import { Appointment } from '@/features/appointment/models/appointment.model';
import { toast } from 'ngx-sonner';
import { ZardDialogService } from '@/shared/components/dialog';
import {
  AppointmentDeleteDialogComponent
} from '@/features/appointment/components/appointment-delete-dialog.component/appointment-delete-dialog.component';
import { AppointmentFacade } from '@/features/appointment/services/appointment-facade';
import { AuthService } from '@/core/services/auth.service';
import {
  AppointmentModifyDialogComponent
} from '@/features/appointment/components/appointment-modify-dialog.component/appointment-modify-dialog.component';

@Component({
  selector: 'app-date-card',
  imports: [ZardButtonComponent, ZardBadgeComponent, DatePipe, DateCounterPipe],
  templateUrl: './date-card.component.html',
  styleUrl: './date-card.component.scss',
})
export class DateCardComponent {
  private _dialogService = inject(ZardDialogService);
  private _appointmentFacade = inject(AppointmentFacade);

  date = input.required<Reminder | Appointment>();
  user = inject(AuthService).user;
  hasDescription = input.required<boolean>();

  displayData = computed(() => {
    const item = this.date();

    if ('description' in item) {
      return {
        title: item.description,
        timestamp: item.reminderDate,
      };
    }

    return {
      title: item.reason,
      timestamp: item.dateTime,
    };
  });

  openDialogModify(): void {
    const data = this.date();
    if (this.isAppointment(data)) {
      this._dialogService.create({
        zTitle: `Modifiez l'évènement'`,
        zContent: AppointmentModifyDialogComponent,
        zOkText: 'Enregistrer',
        zOnOk: async (instance) => {
          if (!instance.isValid()) {
            toast.error('Veuillez remplir correctement les champs obligatoires.');
            return;
          }

          const updatedVaccine = instance.getUpdatedAppointment();

          try {
            await this._appointmentFacade.modify(updatedVaccine, this.user()!.id);
          } catch (error) {
            toast.error('Erreur lors de la modification de la donnée');
            throw error;
          }
        },
        zData: {
          appointment: data,
        },
        zCancelText: 'Annuler',
        zWidth: '425px',
      });
    }
  }

  openDialogDelete(): void {
    const data = this.date();
    this._dialogService.create({
      zTitle: `Supprimer le rendez-vous`,
      zContent: AppointmentDeleteDialogComponent,
      zOkText: 'Supprimer',
      zOnOk: async () => {
        try {
          if (this.isAppointment(data)) {
            await this._appointmentFacade.remove(data, this.user()!.id);
            toast.success('Suppression réalisée', { duration: 2000 });
          }
        } catch (error) {
          toast.error('Erreur lors de la suppression de la donnée');
          throw error;
        }
      },
      zCancelText: 'Annuler',
      zWidth: '425px',
    });
  }

  isAppointment(item: Appointment | Reminder): item is Appointment {
    return (item as Appointment).reason !== undefined;
  }

  isReminder(item: Appointment | Reminder): item is Reminder {
    return (item as Reminder).description !== undefined;
  }
}
