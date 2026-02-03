import { FormControl, FormGroup } from '@angular/forms';

export type RegisterFormModels = FormGroup & {
  email: FormControl<string>;
  password: FormControl<string>;
}
