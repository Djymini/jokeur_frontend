import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dateLimitEndValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const beginDate = control.parent?.get('beginDate')?.value;
  const endDate = control.value;

  if (!beginDate || !endDate) return null;
  return beginDate <= endDate ? null : { dateLimitEndValidator: true };
};

export const dateLimitReminderValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const beginDate = control.root.get('beginDate')?.value;
  const reminderDate = control.value;

  if (!beginDate || !reminderDate) return null;
  return beginDate <= reminderDate ? null : { dateLimitReminderValidator: true };
};

export const dateLimitValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const beginDate = control.get('beginDate')?.value;
  const treatmentReminderDate = control.get('treatmentReminderDate')?.value;

  return beginDate > treatmentReminderDate ? null : { PasswordNoMatch: true };
};
