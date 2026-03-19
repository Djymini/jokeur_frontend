import { Component, inject, input } from '@angular/core';
import { ZardDialogService } from '@/shared/components/dialog';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { TreatmentStore } from '@/features/treatments/services/treatment-store';
import { TreatmentFacade } from '@/features/treatments/services/treatment-facade';
import { TreatmentAddDialogComponent } from '@/features/treatments/components/treatment-add-dialog.component/treatment-add-dialog.component';
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
      zHideFooter: true,
      zWidth: '425px',
    });
  }
}
