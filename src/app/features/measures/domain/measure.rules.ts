export class MeasureRules {
  static validateType(type: string): boolean {
    const validateTypeArray = ['weight', 'temperature', 'bpm', 'respiratory rate'];

    if (!validateTypeArray.includes(type)) {
      return false;
    }

    return true;
  }
}
