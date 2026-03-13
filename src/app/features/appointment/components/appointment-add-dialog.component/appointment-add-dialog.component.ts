import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment-add-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './appointment-add-dialog.component.html',
  styleUrl: './appointment-add-dialog.component.scss',
})
export class AppointmentAddDialogComponent {
  form = new FormGroup({
    reason: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    dateTime: new FormControl<string>(this._getCurrentDateTime(), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    duration: new FormControl<number>(30, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  private _getCurrentDateTime(): string {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  }
}
