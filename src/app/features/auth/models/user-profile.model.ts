import { FormControl } from '@angular/forms';

export type UserProfileFormModel = {
  name: FormControl<string>;
  firstname: FormControl<string>;
  address: FormControl<string>;
  role: FormControl<string>;
};
