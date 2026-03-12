import { Component, inject, OnInit } from '@angular/core';
import { Appointment } from '@/features/appointment/models/appointment.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Z_MODAL_DATA } from '@/shared/components/dialog';

@Component({
  selector: 'app-appointment-modify-dialog.component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './appointment-modify-dialog.component.html',
  styleUrl: './appointment-modify-dialog.component.scss',
})
export class AppointmentModifyDialogComponent implements OnInit {
  private _fb = inject(FormBuilder);

  data: { appointment: Appointment } = inject(Z_MODAL_DATA);

  appointmentForm!: FormGroup;

  ngOnInit(): void {
    const formattedDateTime = this._formatDateTime(this.data.appointment.dateTime);

    this.appointmentForm = this._fb.group({
      reason: [this.data.appointment.reason, [Validators.required]],
      dateTime: [formattedDateTime, [Validators.required]],
      duration: [this.data.appointment.duration, [Validators.required, Validators.min(1)]],
    });
  }

  getUpdatedAppointment(): Appointment {
    const formValue = this.appointmentForm.getRawValue();
    return {
      ...this.data.appointment,
      reason: formValue.reason,
      duration: formValue.duration,
      dateTime: new Date(formValue.dateTime),
    };
  }

  isValid(): boolean {
    return this.appointmentForm.valid;
  }

  private _formatDateTime(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  }
}
