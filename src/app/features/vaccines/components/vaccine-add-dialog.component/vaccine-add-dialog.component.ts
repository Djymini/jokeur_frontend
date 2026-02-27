import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-vaccine-add-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './vaccine-add-dialog.component.html',
  styleUrl: './vaccine-add-dialog.component.scss',
})
export class VaccineAddDialogComponent {
  form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    vaccinator: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    vaccinDate: new FormControl<string>(new Date().toISOString().split('T')[0], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    vaccinReminderDate: new FormControl<string>('', { nonNullable: true }),
    healthRecordId: new FormControl<number>(0, { nonNullable: true }),
  });
}
