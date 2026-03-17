import { Component, inject, input } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardDialogService } from '@/shared/components/dialog';
import { toast } from 'ngx-sonner';
import { SymptomRecordDeleteDialogComponent } from '@/features/symptom-health-record/component/symptom-record-delete-dialog.component/symptom-record-delete-dialog.component';
import { SymptomRecordModifyDialogComponent } from '@/features/symptom-health-record/component/symptom-record-modify-dialog.component/symptom-record-modify-dialog.component';
import { SymptomHealthRecordDTO } from '@/features/symptom-health-record/domain/symptom-record-dto';
import { SymptomHealthRecordFacade } from '@/features/symptom-health-record/service/symptom-health-record.facade';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-symtom-item',
  imports: [ZardButtonComponent, DatePipe],
  templateUrl: './symptom-record-item.component.html',
  styleUrl: './symptom-record-item.component.scss',
})
export class SymptomRecordItemComponent {
  sypmtomsRecord = input.required<SymptomHealthRecordDTO>();
  healthRecord = input.required<HealthRecord>();

  private _dialogService = inject(ZardDialogService);
  private _symptomRecordFacade = inject(SymptomHealthRecordFacade);

  openDialogModify(): void {
    this._dialogService.create({
      zTitle: `Modifiez le symptôme saisi`,
      zContent: SymptomRecordModifyDialogComponent,
      zOkText: 'Enregistrer',
      zOnOk: async (instance) => {
        if (!instance.isValid()) {
          const form = instance.symptoRecordForm;
          const hasEndDateError = form.get('endDate')?.hasError('dateLimitEndValidator');

          if (hasEndDateError) {
            toast.error('La date de fin doit être après le début');
          } else {
            toast.error('Veuillez remplir correctement les champs obligatoires');
          }
          return;
        }

        const updatedSymptom = instance.getUpdatedSymptomRecord();

        try {
          await this._symptomRecordFacade.modify(this.sypmtomsRecord().id!, updatedSymptom);
          await this._symptomRecordFacade.getSymptomRecord(this.healthRecord().id!);
        } catch (error) {
          toast.error('Erreur lors de la modification de la donnée');
          throw error;
        }
      },
      zData: {
        symptomRecord: this.sypmtomsRecord(),
      },
      zCancelText: 'Annuler',
      zWidth: '425px',
    });
  }

  openDialogDelete(): void {
    this._dialogService.create({
      zTitle: `Supprimer le symptôm ${this.sypmtomsRecord().symptom?.name}`,
      zContent: SymptomRecordDeleteDialogComponent,
      zOkText: 'Supprimer',
      zOnOk: async () => {
        try {
          await this._symptomRecordFacade.remove(this.sypmtomsRecord().id!);
          await this._symptomRecordFacade.getSymptomRecord(this.healthRecord().id!);
          toast.success('Suppression réalisée', {
            duration: 2000,
          });
        } catch (error) {
          toast.error('Erreur lors de la suppression de la donnée');
          throw error;
        }
      },
      zCancelText: 'Annuler',
      zWidth: '425px',
    });
  }
}
