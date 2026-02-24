export class MeasureRules {
  static validateType(type: string): boolean {
    const validateTypeArray = ['weight', 'temperature', 'bpm', 'respiratory_rate'];

    if (!validateTypeArray.includes(type)) {
      return false;
    }

    return true;
  }
}
