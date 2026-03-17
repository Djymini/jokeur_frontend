import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dateLimitTreatmentValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const beginDate = control.get('beginDate')?.value;
  const endDate = control.get('endDate')?.value;
  const treatmentReminderDate = control.get('reminderDate')?.value;

  return beginDate <= endDate || beginDate <= treatmentReminderDate
    ? null
    : { dateLimitNoMatch: true };
};

export const dateLimitValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const beginDate = control.get('beginDate')?.value;
  const treatmentReminderDate = control.get('treatmentReminderDate')?.value;

  return beginDate > treatmentReminderDate ? null : { PasswordNoMatch: true };
};
