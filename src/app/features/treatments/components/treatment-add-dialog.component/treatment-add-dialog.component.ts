import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FrequencyType } from '@/features/treatments/models/frequencyType';
import {
  dateLimitEndValidator,
  dateLimitReminderValidator,
} from '@/internal-shared/validators/dateLimit';
import { ZardDialogRef } from '@/shared/components/dialog';
import { ZardButtonComponent } from '@/shared/components/button';
import { toast } from 'ngx-sonner';
import { TreatmentRequest } from '@/features/treatments/models/treatmentRequest.model';
import { TreatmentFacade } from '@/features/treatments/services/treatment-facade';
import { HealthRecordStore } from '@/features/health-records/services/health-record.store';

@Component({
  selector: 'app-treatment-add-dialog',
  imports: [FormsModule, ReactiveFormsModule, ZardButtonComponent],
  templateUrl: './treatment-add-dialog.component.html',
  styleUrl: './treatment-add-dialog.component.scss',
})
export class TreatmentAddDialogComponent {
  private _treatmentFacade = inject(TreatmentFacade);

  healthRecord = inject(HealthRecordStore).healthRecord;
  frequency = new FrequencyType();
  dialogRef = inject(ZardDialogRef);

  treatmentForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    frequency: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    beginDate: new FormControl<string>(new Date().toISOString().split('T')[0], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    endDate: new FormControl<string>(new Date().toISOString().split('T')[0], {
      validators: [dateLimitEndValidator],
    }),
    reminderDate: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, dateLimitReminderValidator],
    }),
    healthRecordId: new FormControl<number>(0, { nonNullable: true }),
  });

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
        .get('reminderDate')
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

    const formValue = this.treatmentForm.getRawValue();

    const addTreatment: TreatmentRequest = {
      name: formValue.name,
      description: formValue.description,
      frequency: formValue.frequency,
      beginDate: new Date(formValue.beginDate),
      endDate: new Date(formValue.endDate!),
      treatmentReminderDate: new Date(formValue.reminderDate),
      healthRecordId: this.healthRecord()!.id,
    };

    try {
      await this._treatmentFacade.addTreatment(addTreatment);
    } catch (error) {
      toast.error('Erreur lors de la création');
      throw error;
    }

    this.closeDialog();
  }
}
