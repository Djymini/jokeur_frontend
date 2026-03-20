import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { dateLimitReminderValidator } from '@/internal-shared/validators/dateLimit';
import { ZardButtonComponent } from '@/shared/components/button';
import { toast } from 'ngx-sonner';
import { VaccineRequestDto } from '@/features/vaccines/models/vaccineRequestDto';
import { ZardDialogRef } from '@/shared/components/dialog';
import { VaccinesFacade } from '@/features/vaccines/services/vaccines-facade';
import { HealthRecordStore } from '@/features/health-records/services/health-record.store';

@Component({
  selector: 'app-vaccine-add-dialog',
  imports: [ReactiveFormsModule, ZardButtonComponent],
  templateUrl: './vaccine-add-dialog.component.html',
  styleUrl: './vaccine-add-dialog.component.scss',
})
export class VaccineAddDialogComponent {
  dialogRef = inject(ZardDialogRef);
  private _vaccineFacade = inject(VaccinesFacade);
  healthRecord = inject(HealthRecordStore).healthRecord;

  vaccineForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    vaccinator: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    beginDate: new FormControl<string>(new Date().toISOString().split('T')[0], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    reminderDate: new FormControl<string>('', {
      nonNullable: true,
      validators: [dateLimitReminderValidator],
    }),
    healthRecordId: new FormControl<number>(0, { nonNullable: true }),
  });

  closeDialog(): void {
    this.dialogRef.close();
  }

  isValid(): boolean {
    return this.vaccineForm.valid;
  }

  async validate(): Promise<void> {
    if (!this.isValid()) {
      const form = this.vaccineForm;
      const hasReminderError = form.get('reminderDate')?.hasError('dateLimitReminderValidator');

      if (hasReminderError) {
        toast.error('La date de rappel doit être après la date de vaccin');
      } else {
        toast.error('Veuillez remplir correctement les champs obligatoires');
      }
      return;
    }

    const formValue = this.vaccineForm.getRawValue();

    const addVaccine: VaccineRequestDto = {
      name: formValue.name,
      description: formValue.description,
      vaccinator: formValue.vaccinator,
      vaccineDate: new Date(formValue.beginDate),
      vaccineReminderDate: new Date(formValue.reminderDate),
      healthRecordId: this.healthRecord()!.id,
    };

    try {
      await this._vaccineFacade.addVaccine(addVaccine);
    } catch (error) {
      toast.error('Erreur lors de la création');
      throw error;
    }

    this.closeDialog();
  }
}
