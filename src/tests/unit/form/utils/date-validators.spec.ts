import { FormControl } from '@angular/forms';
import { maxDateTodayValidator } from '@/shared/utils/forms/date-validators';

describe('maxDateTodayValidator (unit tests)', () => {
  const validator = maxDateTodayValidator();

  function toLocalDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  it('should return null when control is empty', () => {
    const control = new FormControl('');
    expect(validator(control)).toBeNull();
  });

  it('should return null when date is today', () => {
    const today = toLocalDateString(new Date());
    const control = new FormControl(today);
    expect(validator(control)).toBeNull();
  });

  it('should return null when date is in the past', () => {
    const control = new FormControl('2020-01-01');
    expect(validator(control)).toBeNull();
  });

  it('should return maxDate error when date is in the future', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const control = new FormControl(toLocalDateString(tomorrow));
    expect(validator(control)).toEqual({ maxDate: true });
  });
});
