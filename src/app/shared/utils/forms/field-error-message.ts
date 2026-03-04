export function getFieldErrorMessage(control: any, fieldLabel: string): string {
  if (!control?.errors) return '';

  if (control.errors['serverError']) {
    return control.errors['serverError'];
  }

  if (control.errors['required']) {
    return `Le champ "${fieldLabel}" est requis`;
  }

  if (control.errors['maxlength']) {
    const max = control.errors['maxlength'].requiredLength;
    return `Le champ "${fieldLabel}" ne peut pas dépasser ${max} caractères`;
  }

  if (control.errors['pattern']) {
    return `Le champ "${fieldLabel}" doit contenir entre 2 et 10 caractères`;
  }

  if (control.errors['min']) {
    const min = control.errors['min'].min;
    return `Le champ "${fieldLabel}" doit être supérieur ou égal à ${min}`;
  }

  if (control.errors['max']) {
    const max = control.errors['max'].max;
    return `Le champ "${fieldLabel}" ne peut pas dépasser ${max}`;
  }

  if (control.errors['maxDate']) {
    return 'La date ne peut pas être dans le futur';
  }

  if (control.errors['minDate']) {
    return 'La date de naissance semble incorrecte';
  }

  return 'Ce champ est invalide';
}
