import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RegisterFormUserModel } from '@/features/auth/models/register-form-user-model';
import { AuthApi } from '@/core/auth.api';
import { RegisterUserPayload } from '@/core/models/register-user-payload';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  private _fb = inject(NonNullableFormBuilder);
  private _authApi = inject(AuthApi);
  private _router = inject(Router);

  registerForm: FormGroup<RegisterFormUserModel> = this._fb.group(
    {
      username: this._fb.control('', Validators.required),
      name: this._fb.control('', Validators.required),
      firstname: this._fb.control('', Validators.required),
      phone: this._fb.control('', Validators.required),
      email: this._fb.control('', [Validators.required, Validators.email]),
      password: this._fb.control('', Validators.required),
      confirmPassword: this._fb.control('', Validators.required),
      acceptCGU: this._fb.control(false, Validators.requiredTrue),
    },
    { validators: [passwordMatchValidator] },
  );

  async onSubmit(): Promise<void> {
    // if (this.registerForm.invalid) return;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // 1- Récupérer les valeurs du formulaire
    const {
      username,
      name,
      firstname,
      phone,
      email,
      password,
    } = this.registerForm.getRawValue();

    // 2- Construire le payload API
    const payload: RegisterUserPayload = {
      username,
      name,
      firstname,
      phone,
      email,
      password,
    };

    try {
      // 3- Appel backend
      await this._authApi.register(payload);

      // 4- Redirection login
      await this._router.navigateByUrl('/login');
    } catch (error) {
      console.error('Probleme inscription:', error);
    }
  }
}

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) return null;
  return password === confirmPassword ? null : { passwordMismatch: true };
};
