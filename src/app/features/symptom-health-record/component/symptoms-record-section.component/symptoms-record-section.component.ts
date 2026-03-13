import { Component, inject, input } from '@angular/core';
import { toast } from 'ngx-sonner';
import { ZardDialogService } from '@/shared/components/dialog';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { ZardButtonComponent } from '@/shared/components/button';
import { SymptomRecordAddDialogComponent } from '@/features/symptom-health-record/component/symtom-record-add-dialog.component/symptom-record-add-dialog.component';
import { SymptomRecordItemComponent } from '@/features/symptom-health-record/component/symtom-record-item.component/symptom-record-item.component';
import { SymptomHealthRecordStore } from '@/features/symptom-health-record/service/symptom-health-record.store';
import { SymptomHealthRecordFacade } from '@/features/symptom-health-record/service/symptom-health-record.facade';
import { CreateUpdateSymptomRecordDto } from '@/features/symptom-health-record/domain/create-update-symptom-record-dto';

@Component({
  selector: 'app-symptoms-section',
  imports: [ZardButtonComponent, SymptomRecordItemComponent],
  templateUrl: './symptoms-record-section.component.html',
  styleUrl: './symptoms-record-section.component.scss',
})
export class SymptomsRecordSectionComponent {
  private _dialogService = inject(ZardDialogService);
  private _symptomRecordStore = inject(SymptomHealthRecordStore);
  private _symptomFacade = inject(SymptomHealthRecordFacade);

  symptomRecordArray = this._symptomRecordStore.symptomRecordArray;
  healthRecord = input.required<HealthRecord>();

  openDialogAdd(): void {
    this._dialogService.create({
      zTitle: `Ajouter une symptôme`,
      zContent: SymptomRecordAddDialogComponent,
      zOkText: 'Enregistrer',
      zOnOk: async (instance) => {
        const formValue = instance.form.getRawValue();

        const addSymtom: CreateUpdateSymptomRecordDto = {
          symptomId: Number(formValue.symptomId),
          observation: formValue.observation,
          observationDate: new Date(formValue.observationDate),
        };

        try {
          await this._symptomFacade.addSymptomRecord(this.healthRecord().id, addSymtom);
          await this._symptomFacade.getSymptomRecord(this.healthRecord().id);
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
