export class ReminderRules {
  static displayReminderType(type: string): string {
    switch (type) {
      case 'VACCINE':
        return 'Vaccin';
      case 'TREATMENT':
        return 'Traitement';
      default:
        return 'type';
    }
  }
}
