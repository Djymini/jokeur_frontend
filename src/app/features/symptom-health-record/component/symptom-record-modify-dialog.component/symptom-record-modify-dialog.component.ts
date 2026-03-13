import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Z_MODAL_DATA } from '@/shared/components/dialog';
import { SymptomHealthRecordDTO } from '@/features/symptom-health-record/domain/symptom-record-dto';
import { SymptomStore } from '@/features/symptom/services/symptom.store';
import { ZardSwitchComponent } from '@/shared/components/switch';
import { CreateUpdateSymptomRecordDto } from '@/features/symptom-health-record/domain/create-update-symptom-record-dto';

@Component({
  selector: 'app-symptom-modify-dialog',
  imports: [FormsModule, ReactiveFormsModule, ZardSwitchComponent],
  templateUrl: './symptom-record-modify-dialog.component.html',
  styleUrl: './symptom-record-modify-dialog.component.scss',
})
export class SymptomRecordModifyDialogComponent implements OnInit {
  private _fb = inject(FormBuilder);
  data: { symptomRecord: SymptomHealthRecordDTO } = inject(Z_MODAL_DATA);
  private _symptomStore: SymptomStore = inject(SymptomStore);

  symptomArray = this._symptomStore.symptomArray;

  symptoRecordForm!: FormGroup;

  ngOnInit(): void {
    const formattedObservationDate = this._formatDate(this.data.symptomRecord.observationDate);

    this.symptoRecordForm = this._fb.group({
      symptomId: [this.data.symptomRecord.symptom?.id, [Validators.required]],
      observation: [this.data.symptomRecord.observation],
      observationDate: [formattedObservationDate, [Validators.required]],
      active: [this.data.symptomRecord.active],
      endDate: [''],
    });
  }

  getUpdatedSymptomRecord(): CreateUpdateSymptomRecordDto {
    const formValue = this.symptoRecordForm.value;
    return { ...formValue };
  }

  isValid(): boolean {
    return this.symptoRecordForm.valid;
  }

  private _formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
}
