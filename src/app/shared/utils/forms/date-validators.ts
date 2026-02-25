import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function birthDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const inputDate = new Date(control.value);
    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 80);

    if (inputDate > today) {
      return { maxDate: { max: today, actual: inputDate } };
    }

    if (inputDate < minDate) {
      return { minDate: { min: minDate, actual: inputDate } };
    }

    return null;
  };
}
