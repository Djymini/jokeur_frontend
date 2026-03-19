export class DashboardRules {
  static getAge(value: Date): string {
    const targetDate = new Date(value);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - targetDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return '1 jour';
    }

    if (diffDays < 30) {
      return diffDays === 1 ? '1 jour' : `${diffDays} jours`;
    }

    if (diffDays < 365) {
      const diffMonths = Math.round(diffDays / 30.44);
      return `${diffMonths} mois`;
    }

    const diffYears = Math.floor(diffDays / 365);
    return diffYears === 1 ? '1 an' : `${diffYears} ans`;
  }
}
