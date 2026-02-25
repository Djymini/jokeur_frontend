import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from '../../app/features/auth/domain/password.rules';

describe('password.rules (unit tests)', () => {
  it('should accept a valid password', () => {
    const valid = 'Abcd$123@lMg'; // 12 chars, 1 upper, 1 lower, 1 digit, 2 specials
    expect(PASSWORD_REGEX.test(valid)).toBe(true);
  });

  it('should reject when missing uppercase', () => {
    const invalid = 'abcd$123';
    expect(PASSWORD_REGEX.test(invalid)).toBe(false);
  });

  it('should reject when too short', () => {
    const invalid = 'Ab$12345678'; // 11 chars
    expect(invalid.length).toBe(PASSWORD_MIN_LENGTH - 1);
    expect(PASSWORD_REGEX.test(invalid)).toBe(false);
  });

  it('should reject when too long', () => {
    const invalid = `Abcd$1234${'a'.repeat(PASSWORD_MAX_LENGTH)}`; // > max
    expect(invalid.length).toBeGreaterThan(PASSWORD_MAX_LENGTH);
    expect(PASSWORD_REGEX.test(invalid)).toBe(false);
  });

  it('should reject when missing special char', () => {
    const invalid = 'Abcd1234';
    expect(PASSWORD_REGEX.test(invalid)).toBe(false);
  });
});
