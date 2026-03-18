import { AuthRules, RegisterFormValue } from '@/features/auth/domain/auth.rules';

describe('AuthRules (unit tests)', () => {
  let form: RegisterFormValue;

  // 1. Arrange
  beforeEach(() => {
    form = {
      name: 'toto',
      firstname: 'toto',
      phone: '0123456789',
      email: 'toto@toto.fr',
      password: 'secret',
      confirmPassword: 'secret',
      acceptCGU: true,
    };
  });

 it('should build a RegisterUserPayload without confirmPassword and acceptCGU', () => {
    const payload = AuthRules.toRegisterPayload(form);

    expect(payload).toEqual({
      name: 'toto',
      firstname: 'toto',
      phone: '0123456789',
      email: 'toto@toto.fr',
      password: 'secret',
    } as any);

    expect((payload as any).confirmPassword).toBeUndefined();
    expect((payload as any).acceptCGU).toBeUndefined();
  });
});
