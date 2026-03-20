import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Z_MODAL_DATA, ZardDialogRef } from '@/shared/components/dialog';
import { Treatment } from '@/features/treatments/models/treatment.model';
import { FrequencyType } from '@/features/treatments/models/frequencyType';
import {
  dateLimitEndValidator,
  dateLimitReminderValidator,
} from '@/internal-shared/validators/dateLimit';
import { ReminderRules } from '@/features/reminders/domain/reminder.rules';
import { toast } from 'ngx-sonner';
import { TreatmentFacade } from '@/features/treatments/services/treatment-facade';
import { ZardButtonComponent } from '@/shared/components/button';

@Component({
  selector: 'app-treatment-modify-dialog',
  imports: [FormsModule, ReactiveFormsModule, ZardButtonComponent],
  templateUrl: './treatment-modify-dialog.component.html',
  styleUrl: './treatment-modify-dialog.component.scss',
})
export class TreatmentModifyDialogComponent implements OnInit {
  private _fb = inject(FormBuilder);
  dialogRef = inject(ZardDialogRef);
  private _treatmentFacade = inject(TreatmentFacade);

  frequency = new FrequencyType();
  data: { treatment: Treatment } = inject(Z_MODAL_DATA);

  treatmentForm!: FormGroup;
  reminderType: string = ReminderRules.displayReminderType(this.data.treatment.reminder.type);

  ngOnInit(): void {
    const formattedTreatmentBeginDate = this._formatDate(this.data.treatment.beginDate);
    const formattedTreatmentEndDate = this._formatDate(this.data.treatment.endDate);
    const formattedReminderDate = this._formatDate(this.data.treatment.reminder.reminderDate);

    console.log(this.data.treatment.frequency);

    console.log(this.frequency.types);
    console.log(
      this.frequency.types.filter((type) => type.label === this.data.treatment.frequency)[0].name,
    );

    this.treatmentForm = this._fb.group({
      name: [this.data.treatment.name, [Validators.required]],
      description: [this.data.treatment.description],
      frequency: [
        this.frequency.types.filter((type) => type.label === this.data.treatment.frequency)[0].name,
        [Validators.required],
      ],
      beginDate: [formattedTreatmentBeginDate, [Validators.required]],
      endDate: [formattedTreatmentEndDate, { validators: [dateLimitEndValidator] }],
      reminder: this._fb.group({
        type: [this.data.treatment.reminder?.type || ''],
        description: [this.data.treatment.reminder?.description || ''],
        reminderDate: [formattedReminderDate, { validators: [dateLimitReminderValidator] }],
        status: [this.data.treatment.reminder?.status || 'PENDING'],
      }),
    });
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

  closeDialog(): void {
    this.dialogRef.close();
  }

  isValid(): boolean {
    return this.treatmentForm.valid;
  }

  async validate(): Promise<void> {
    if (!this.isValid()) {
      const hasEndDateError = this.treatmentForm.get('endDate')?.hasError('dateLimitEndValidator');
      const hasReminderError = this.treatmentForm
        .get('reminder.reminderDate')
        ?.hasError('dateLimitReminderValidator');

      if (hasEndDateError && hasReminderError) {
        toast.error('Date de fin et de rappel invalides ils doivent etre après le début');
      } else if (hasEndDateError) {
        toast.error('La date de fin doit être après le début');
      } else if (hasReminderError) {
        toast.error('La date de rappel doit être après le début');
      } else {
        toast.error('Veuillez remplir correctement les champs obligatoires');
      }
      return;
    }

    const updatedTreatment = this.getUpdatedTreatment();

    try {
      await this._treatmentFacade.modify(updatedTreatment);
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
