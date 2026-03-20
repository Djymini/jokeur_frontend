import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SymptomStore } from '@/features/symptom/services/symptom.store';
import { ZardDialogRef } from '@/shared/components/dialog';
import { toast } from 'ngx-sonner';
import { ZardButtonComponent } from '@/shared/components/button';
import { CreateUpdateSymptomRecordDto } from '@/features/symptom-health-record/model/create-update-symptom-record-dto';
import { SymptomHealthRecordFacade } from '@/features/symptom-health-record/service/symptom-health-record.facade';
import { HealthRecordStore } from '@/features/health-records/services/health-record.store';

@Component({
  selector: 'app-symtom-add-dialog',
  imports: [ReactiveFormsModule, ZardButtonComponent],
  templateUrl: './symptom-record-add-dialog.component.html',
  styleUrl: './symptom-record-add-dialog.component.scss',
})
export class SymptomRecordAddDialogComponent {
  private _symptomStore: SymptomStore = inject(SymptomStore);
  private _symptomFacade = inject(SymptomHealthRecordFacade);
  dialogRef = inject(ZardDialogRef);

  healthRecord = inject(HealthRecordStore).healthRecord;
  symptomArray = this._symptomStore.symptomArray;

  form = new FormGroup({
    symptomId: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    observation: new FormControl<string>('', { nonNullable: true }),
    observationDate: new FormControl<string>(new Date().toISOString().split('T')[0], {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  closeDialog(): void {
    this.dialogRef.close();
  }

  isValid(): boolean {
    return this.form.valid;
  }

  async validate(): Promise<void> {
    const formValue = this.form.getRawValue();

    const addSymtom: CreateUpdateSymptomRecordDto = {
      symptomId: Number(formValue.symptomId),
      observation: formValue.observation,
      observationDate: new Date(formValue.observationDate),
    };

    try {
      await this._symptomFacade.addSymptomRecord(this.healthRecord()!.id, addSymtom);
      await this._symptomFacade.getSymptomRecord(this.healthRecord()!.id);
    } catch (error) {
      toast.error('Erreur lors de la création');
      throw error;
    }

    this.closeDialog();
  }
}
