import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fileSizeValidator(maxMb: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;
    if (!file || !(file instanceof File)) return null;
    return file.size > maxMb * 1024 * 1024 ? { fileSize: maxMb } : null;
  };
}
