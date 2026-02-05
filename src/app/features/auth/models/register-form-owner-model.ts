import { FormControl } from '@angular/forms';

export type RegisterFormOwnerModel = {
  username: FormControl<string>;
  name: FormControl<string>;
  firstname: FormControl<string>;
  phone: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  acceptCGU: FormControl<boolean>;
};
