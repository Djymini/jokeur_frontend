import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterFormUserModel } from '@/features/auth/models/register-form-user-model';
import { AuthApi } from '@/core/auth.api';
import { RegisterUserPayload } from '@/core/models/register-user-payload';
import { passwordMatchValidator } from '@/features/auth/validators/pass-match-validators';
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@/features/auth/domain/password.rules';
import { toast } from 'ngx-sonner';
import { NAME_REGEX } from '@/features/auth/domain/name.rules';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  private _fb = inject(NonNullableFormBuilder);
  private _authApi = inject(AuthApi);
  private _router = inject(Router);

  showPassword = false;
  showConfirmPassword = false;

  registerForm: FormGroup<RegisterFormUserModel> = this._fb.group(
    {
      name: this._fb.control('', [Validators.required, Validators.pattern(NAME_REGEX)]),
      firstname: this._fb.control('', [Validators.required, Validators.pattern(NAME_REGEX)]),
      phone: this._fb.control('', [Validators.required, Validators.pattern(/^0[0-9]{9}$/)]),
      email: this._fb.control('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      password: this._fb.control('', [
        Validators.required,
        Validators.minLength(PASSWORD_MIN_LENGTH),
        Validators.pattern(PASSWORD_REGEX),
      ]),
      confirmPassword: this._fb.control('', Validators.required),
      acceptCGU: this._fb.control(false, Validators.requiredTrue),
    },
    { validators: [passwordMatchValidator] },
  );

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { name, firstname, phone, email, password } = this.registerForm.getRawValue();

    const payload: RegisterUserPayload = {
      name,
      firstname,
      phone,
      email,
      password,
    };

    try {
      await this._authApi.register(payload).then((result) => {
        console.log('message result', result);
      });

      await this._router.navigateByUrl('/login');
      toast.success('Inscription réussie.');
    } catch (error: any) {
      const msg = error?.error?.message ?? error?.message ?? 'Une erreur est survenue.';
      toast.error(msg);
      console.error("Probleme d'inscription:", error);
    }
  }
}
