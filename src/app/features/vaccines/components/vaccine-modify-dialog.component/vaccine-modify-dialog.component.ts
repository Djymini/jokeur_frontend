import { Component, inject, OnInit } from '@angular/core';
import { Vaccine } from '@/features/vaccines/models/vaccine.model';
import { Z_MODAL_DATA } from '@/shared/components/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-vaccine-modify-dialog.component',
  imports: [ReactiveFormsModule],
  templateUrl: './vaccine-modify-dialog.component.html',
  styleUrl: './vaccine-modify-dialog.component.scss',
})
export class VaccineModifyDialogComponent implements OnInit {
  private _fb = inject(FormBuilder);
  data: { vaccine: Vaccine } = inject(Z_MODAL_DATA);

  vaccineForm!: FormGroup;

  ngOnInit(): void {
    const formattedVaccineDate = this._formatDate(this.data.vaccine.vaccineDate);
    const formattedReminderDate = this.data.vaccine.reminder?.reminderDate
      ? this._formatDate(this.data.vaccine.reminder.reminderDate)
      : null;

    this.vaccineForm = this._fb.group({
      name: [this.data.vaccine.name, [Validators.required]],
      description: [this.data.vaccine.description],
      vaccinator: [this.data.vaccine.vaccinator, [Validators.required]],
      vaccineDate: [formattedVaccineDate, [Validators.required]],

      // Sous-formulaire pour le rappel
      reminder: this._fb.group({
        type: [this.data.vaccine.reminder?.type || ''],
        description: [this.data.vaccine.reminder?.description || ''],
        reminderDate: [formattedReminderDate],
        status: [this.data.vaccine.reminder?.status || 'PENDING'],
      }),
    });
  }

  getUpdatedVaccine(): Vaccine {
    const formValue = this.vaccineForm.value;
    return {
      ...this.data.vaccine,
      ...formValue,
      vaccineDate: new Date(formValue.vaccineDate),
      reminder: {
        ...this.data.vaccine.reminder,
        ...formValue.reminder,
        reminderDate: formValue.reminder.reminderDate
          ? new Date(formValue.reminder.reminderDate)
          : null,
      },
    };
  }

  isValid(): boolean {
    return this.vaccineForm.valid;
  }

  private _formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
}
