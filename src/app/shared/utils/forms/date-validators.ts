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

export function maxDateTodayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const [year, month, day] = (control.value as string).split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate > today ? { maxDate: true } : null;
  };
}
