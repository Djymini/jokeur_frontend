import { Component, inject, input } from '@angular/core';
import { ZardDialogService } from '@/shared/components/dialog';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { ZardButtonComponent } from '@/shared/components/button';
import { SymptomRecordAddDialogComponent } from '@/features/symptom-health-record/component/symtom-record-add-dialog.component/symptom-record-add-dialog.component';
import { SymptomRecordItemComponent } from '@/features/symptom-health-record/component/symtom-record-item.component/symptom-record-item.component';
import { SymptomHealthRecordStore } from '@/features/symptom-health-record/service/symptom-health-record.store';
import { SymptomHealthRecordFacade } from '@/features/symptom-health-record/service/symptom-health-record.facade';

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
      zHideFooter: true,
      zWidth: '425px',
    });
  }
}
