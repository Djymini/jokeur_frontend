import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Z_MODAL_DATA } from '@/shared/components/dialog';
import { Treatment } from '@/features/treatments/models/treatment.model';
import { FrequencyType } from '@/features/treatments/models/frequencyType';
import { dateLimitTreatmentValidator } from '@/internal-shared/validators/dateLimit';

@Component({
  selector: 'app-treatment-modify-dialog',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './treatment-modify-dialog.component.html',
  styleUrl: './treatment-modify-dialog.component.scss',
})
export class TreatmentModifyDialogComponent implements OnInit {
  private _fb = inject(FormBuilder);

  frequency = new FrequencyType();
  data: { treatment: Treatment } = inject(Z_MODAL_DATA);

  treatmentForm!: FormGroup;

  ngOnInit(): void {
    console.log(this._formatDate(this.data.treatment.reminder.reminderDate));
    const formattedTreatmentBeginDate = this._formatDate(this.data.treatment.beginDate);
    const formattedTreatmentEndDate = this._formatDate(this.data.treatment.endDate);
    const formattedReminderDate = this._formatDate(this.data.treatment.reminder.reminderDate);

    this.treatmentForm = this._fb.group(
      {
        name: [this.data.treatment.name, [Validators.required]],
        description: [this.data.treatment.description],
        frequency: [
          this.frequency.types.find((type) => type.label === this.data.treatment.frequency)?.name,
          [Validators.required],
        ],
        beginDate: [formattedTreatmentBeginDate, [Validators.required]],
        endDate: [formattedTreatmentEndDate, [Validators.required]],
        reminder: this._fb.group({
          type: [this.data.treatment.reminder?.type || ''],
          description: [this.data.treatment.reminder?.description || ''],
          reminderDate: [formattedReminderDate],
          status: [this.data.treatment.reminder?.status || 'PENDING'],
        }),
      },
      { validators: dateLimitTreatmentValidator },
    );
  }

  getUpdatedTreatment(): Treatment {
    const formValue = this.treatmentForm.value;
    return {
      ...this.data.treatment,
      ...formValue,
      beginDate: new Date(formValue.beginDate),
      endDate: new Date(formValue.endDate),
      reminder: {
        ...this.data.treatment.reminder,
        ...formValue.reminder,
        reminderDate: formValue.reminder.reminderDate
          ? new Date(formValue.reminder.reminderDate)
          : null,
      },
    };
  }

  isValid(): boolean {
    console.log(this.treatmentForm.valid);
    return this.treatmentForm.valid;
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
