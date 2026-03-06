import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateCounter',
})
export class DateCounterPipe implements PipeTransform {
  transform(value: Date): string {
    const targetDate = new Date(value);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return 'Dépassé';
    }

    if (diffDays === 0) {
      return "Aujourd'hui";
    }

    if (diffDays < 30) {
      return diffDays === 1 ? 'Il reste 1 jour' : `Il reste ${diffDays} jours`;
    }

    if (diffDays < 365) {
      const diffMonths = Math.round(diffDays / 30.44);
      return `Dans ${diffMonths} mois`;
    }

    const diffYears = Math.floor(diffDays / 365);
    return diffYears === 1 ? 'Dans 1 an' : `Dans ${diffYears} ans`;
  }
}
