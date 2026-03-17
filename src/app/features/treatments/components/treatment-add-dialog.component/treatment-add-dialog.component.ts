import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FrequencyType } from '@/features/treatments/models/frequencyType';

@Component({
  selector: 'app-treatment-add-dialog',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './treatment-add-dialog.component.html',
  styleUrl: './treatment-add-dialog.component.scss',
})
export class TreatmentAddDialogComponent {
  frequency = new FrequencyType();

  form = new FormGroup({
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
      validators: [Validators.required],
    }),
    treatmentReminderDate: new FormControl<string>('', { nonNullable: true }),
    healthRecordId: new FormControl<number>(0, { nonNullable: true }),
  });
}
