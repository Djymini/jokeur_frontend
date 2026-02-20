export function getFieldErrorMessage(control: any, fieldLabel: string): string {
  if (!control?.errors) return '';

  if (control.errors['required']) {
    return `${fieldLabel} est requis`;
  }

  if (control.errors['maxLength']) {
    const max = control.errors['maxLength'].requiredLength;
    return `${fieldLabel} ne peut pas dépasser ${max} caractères`;
  }

  if (control.errors['min']) {
    const min = control.errors['min'].min;
    return `${fieldLabel} doit être au moins ${min}`;
  }

  if (control.errors['max']) {
    const max = control.errors['max'].max;
    return `${fieldLabel} ne peut pas dépasser ${max}`;
  }

  if (control.errors['maxDate']) {
    return 'La date ne peut pas être dans le futur';
  }

  return 'Champ invalide';
}
