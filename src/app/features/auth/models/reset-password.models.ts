import { FormControl } from '@angular/forms';

export type ResetPasswordFormModel = {
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
};
