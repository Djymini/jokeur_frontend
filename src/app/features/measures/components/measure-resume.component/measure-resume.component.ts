import { Component, inject, input } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';
import { MeasureResumeItemComponent } from '@/features/measures/components/measure-resume-item.component/measure-resume-item.component';
import { MeasureModel } from '@/features/measures/models/measureModel';
import { ZardDialogService } from '@/shared/components/dialog';
import { toast } from 'ngx-sonner';
import { MeasuresFacade } from '@/features/measures/services/measures-facade';
import { AddMeasureDtoRecord } from '@/features/measures/models/addMeasureDtoRecord';
import { HealthRecordStore } from '@/features/health-records/services/health-record.store';
import { MeasureAddDialogComponent } from '@/features/measures/components/measure-add-dialog.component/measure-add-dialog.component';

@Component({
  selector: 'app-measure-resume',
  imports: [ZardButtonComponent, ZardIconComponent, MeasureResumeItemComponent],
  templateUrl: './measure-resume.component.html',
  styleUrl: './measure-resume.component.scss',
})
export class MeasureResumeComponent {
  private _dialogService = inject(ZardDialogService);
  private _measuresFacade = inject(MeasuresFacade);
  private _healthRecordStore = inject(HealthRecordStore);

  title = input.required<string>();
  type = input.required<string>();
  measures = input.required<MeasureModel[]>();

  openDialogAdd(): void {
    this._dialogService.create({
      zTitle: `Ajouter une mesure`,
      zContent: MeasureAddDialogComponent,
      zOkText: 'Enregistrer',
      zOnOk: async (instance) => {
        const formValue = instance.form.get('value')?.value;

        const addMeasure: AddMeasureDtoRecord = {
          id: 0,
          value: formValue!,
          measureType: this.type(),
          healthRecordId: this._healthRecordStore.healthRecord()!.id,
          creationDate: new Date().toISOString(),
        };

        try {
          await this._measuresFacade.addMeasure(addMeasure);
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
