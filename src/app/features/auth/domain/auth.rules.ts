export type RegisterFormValue = {
  // username: string;
  name: string;
  firstname: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptCGU: boolean;
};

export type RegisterUserPayload = {
  // username: string;
  name: string;
  firstname: string;
  phone: string;
  email: string;
  password: string;
};

export class AuthRules {
  static toRegisterPayload(form: RegisterFormValue): RegisterUserPayload {
    return {
      // username: form.username,
      name: form.name,
      firstname: form.firstname,
      phone: form.phone,
      email: form.email,
      password: form.password,
    };
  }
}
