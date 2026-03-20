import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Z_MODAL_DATA, ZardDialogRef } from '@/shared/components/dialog';
import { SymptomHealthRecordDTO } from '@/features/symptom-health-record/model/symptom-record-dto';
import { SymptomStore } from '@/features/symptom/services/symptom.store';
import { ZardSwitchComponent } from '@/shared/components/switch';
import { CreateUpdateSymptomRecordDto } from '@/features/symptom-health-record/model/create-update-symptom-record-dto';
import { dateLimitEndValidator } from '@/internal-shared/validators/dateLimit';
import { toast } from 'ngx-sonner';
import { SymptomHealthRecordFacade } from '@/features/symptom-health-record/service/symptom-health-record.facade';
import { SymptomHealthRecordStore } from '@/features/symptom-health-record/service/symptom-health-record.store';
import { HealthRecordStore } from '@/features/health-records/services/health-record.store';
import { ZardButtonComponent } from '@/shared/components/button';

@Component({
  selector: 'app-symptom-modify-dialog',
  imports: [FormsModule, ReactiveFormsModule, ZardSwitchComponent, ZardButtonComponent],
  templateUrl: './symptom-record-modify-dialog.component.html',
  styleUrl: './symptom-record-modify-dialog.component.scss',
})
export class SymptomRecordModifyDialogComponent implements OnInit {
  private _fb = inject(FormBuilder);
  data: { symptomRecord: SymptomHealthRecordDTO } = inject(Z_MODAL_DATA);
  private _symptomStore: SymptomStore = inject(SymptomStore);
  dialogRef = inject(ZardDialogRef);
  private _symptomRecordFacade = inject(SymptomHealthRecordFacade);

  sypmtomsRecord = inject(SymptomHealthRecordStore).symptomRecordArray;
  healthRecord = inject(HealthRecordStore).healthRecord;
  symptomArray = this._symptomStore.symptomArray;

  symptoRecordForm!: FormGroup;

  ngOnInit(): void {
    const formattedObservationDate = this._formatDate(this.data.symptomRecord.observationDate);

    console.log(formattedObservationDate);
    this.symptoRecordForm = this._fb.group({
      symptomId: [this.data.symptomRecord.symptom?.id, [Validators.required]],
      observation: [this.data.symptomRecord.observation],
      beginDate: [formattedObservationDate, [Validators.required]],
      active: [this.data.symptomRecord.active],
      endDate: ['', { validators: [dateLimitEndValidator] }],
    });
  }

  getUpdatedSymptomRecord(): CreateUpdateSymptomRecordDto {
    const formValue = this.symptoRecordForm.getRawValue();

    return {
      symptomId: formValue.symptomId,
      observationDate: formValue.beginDate ? new Date(formValue.beginDate) : undefined,
      observation: formValue.observation,
      endDate: formValue.endDate ? new Date(formValue.endDate) : undefined,
      active: formValue.active,
    };
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  isValid(): boolean {
    return this.symptoRecordForm.valid;
  }

  async validate(): Promise<void> {
    if (!this.isValid()) {
      const form = this.symptoRecordForm;
      const hasEndDateError = form.get('endDate')?.hasError('dateLimitEndValidator');

      if (hasEndDateError) {
        toast.error('La date de fin doit être après le début');
      } else {
        toast.error('Veuillez remplir correctement les champs obligatoires');
      }
      return;
    }

    const updatedSymptom = this.getUpdatedSymptomRecord();

    try {
      console.log(updatedSymptom);
      await this._symptomRecordFacade.modify(this.data.symptomRecord.id!, updatedSymptom);
      await this._symptomRecordFacade.getSymptomRecord(this.healthRecord()!.id!);
    } catch (error) {
      toast.error('Erreur lors de la modification de la donnée');
      throw error;
    }

    this.closeDialog();
  }

  private _formatDate(date: Date | string | undefined | null): string {
    if (!date) return '';
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
