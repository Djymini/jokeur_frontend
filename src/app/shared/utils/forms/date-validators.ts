import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxDateValidator(maxDate: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const inputDate = new Date(control.value);
    if (inputDate > maxDate) {
      return { maxDate: { max: maxDate, actual: inputDate } };
    }

    return null;
  };
}

export function birthDateValidator(): ValidatorFn {
  return maxDateValidator(new Date());
}
