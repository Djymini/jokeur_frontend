import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { dateLimitReminderValidator } from '@/internal-shared/validators/dateLimit';

@Component({
  selector: 'app-vaccine-add-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './vaccine-add-dialog.component.html',
  styleUrl: './vaccine-add-dialog.component.scss',
})
export class VaccineAddDialogComponent {
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

  isValid(): boolean {
    return this.vaccineForm.valid;
  }
}
