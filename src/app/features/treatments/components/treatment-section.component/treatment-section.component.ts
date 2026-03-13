import { Component, inject, input } from '@angular/core';
import { ZardDialogService } from '@/shared/components/dialog';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { toast } from 'ngx-sonner';
import { TreatmentStore } from '@/features/treatments/services/treatment-store';
import { TreatmentFacade } from '@/features/treatments/services/treatment-facade';
import { TreatmentAddDialogComponent } from '@/features/treatments/components/treatment-add-dialog.component/treatment-add-dialog.component';
import { TreatmentRequest } from '@/features/treatments/models/treatmentRequest.model';
import { ZardButtonComponent } from '@/shared/components/button';
import { TreatmentItemComponent } from '@/features/treatments/components/treatment-item.component/treatment-item.component';

@Component({
  selector: 'app-treatment-section',
  imports: [ZardButtonComponent, TreatmentItemComponent],
  templateUrl: './treatment-section.component.html',
  styleUrl: './treatment-section.component.scss',
})
export class TreatmentSectionComponent {
  private _dialogService = inject(ZardDialogService);
  private _treatmentStore = inject(TreatmentStore);
  private _treatmentFacade = inject(TreatmentFacade);

  healthRecord = input.required<HealthRecord>();

  treatmentArray = this._treatmentStore.treatmentArray;

  openDialogAdd(): void {
    this._dialogService.create({
      zTitle: `Ajouter un traitement`,
      zContent: TreatmentAddDialogComponent,
      zOkText: 'Enregistrer',
      zOnOk: async (instance) => {
        const formValue = instance.form.getRawValue();

        const addTreatment: TreatmentRequest = {
          name: formValue.name,
          description: formValue.description,
          frequency: formValue.frequency,
          beginDate: new Date(formValue.beginDate),
          endDate: new Date(formValue.endDate!),
          treatmentReminderDate: new Date(formValue.treatmentReminderDate),
          healthRecordId: this.healthRecord().id,
        };

        try {
          await this._treatmentFacade.addTreatment(addTreatment);
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
