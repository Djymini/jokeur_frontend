import { Component, inject, input } from '@angular/core';
import { VaccinesStore } from '@/features/vaccines/services/vaccines-store';
import { VaccineItemComponent } from '@/features/vaccines/components/vaccine-item.component/vaccine-item.component';
import { toast } from 'ngx-sonner';
import { ZardDialogService } from '@/shared/components/dialog';
import { VaccineAddDialogComponent } from '@/features/vaccines/components/vaccine-add-dialog.component/vaccine-add-dialog.component';
import { VaccineRequestDto } from '@/features/vaccines/models/vaccineRequestDto';
import { VaccinesFacade } from '@/features/vaccines/services/vaccines-facade';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { ZardButtonComponent } from '@/shared/components/button';

@Component({
  selector: 'app-vaccines-section',
  imports: [VaccineItemComponent, ZardButtonComponent],
  templateUrl: './vaccines-section.component.html',
  styleUrl: './vaccines-section.component.scss',
})
export class VaccinesSectionComponent {
  private _dialogService = inject(ZardDialogService);
  private _vaccineStore = inject(VaccinesStore);
  private _vaccineFacade = inject(VaccinesFacade);

  healthRecord = input.required<HealthRecord>();

  vaccineArray = this._vaccineStore.vaccineArray;

  openDialogAdd(): void {
    this._dialogService.create({
      zTitle: `Ajouter un vaccin`,
      zContent: VaccineAddDialogComponent,
      zOkText: 'Enregistrer',
      zOnOk: async (instance) => {
        if (!instance.isValid()) {
          const form = instance.vaccineForm;
          const hasReminderError = form.get('reminderDate')?.hasError('dateLimitReminderValidator');

          if (hasReminderError) {
            toast.error('La date de rappel doit être après la date de vaccin');
          } else {
            toast.error('Veuillez remplir correctement les champs obligatoires');
          }
          return;
        }

        const formValue = instance.vaccineForm.getRawValue();

        const addVaccine: VaccineRequestDto = {
          name: formValue.name,
          description: formValue.description,
          vaccinator: formValue.vaccinator,
          vaccineDate: new Date(formValue.beginDate),
          vaccineReminderDate: new Date(formValue.reminderDate),
          healthRecordId: this.healthRecord().id,
        };

        try {
          await this._vaccineFacade.addVaccine(addVaccine);
        } catch (error) {
          toast.error('Erreur lors de la création');
          throw error;
        }
      },
      zCancelText: 'Annuler',
      zWidth: '425px',
    });
  }
}
