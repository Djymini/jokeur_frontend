import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResetPasswordFormModel } from '@/features/auth/models/reset-password.models';
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@/features/auth/domain/password.rules';
import { passwordMatchValidator } from '@/features/auth/validators/pass-match-validators';
import { toast } from 'ngx-sonner';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApi } from '@/core/auth.api';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  private _fb = inject(NonNullableFormBuilder);
  private _authApi = inject(AuthApi);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  showPassword = false;
  showConfirmPassword = false;

  token: string | null = null;

  resetPasswordForm: FormGroup<ResetPasswordFormModel> = this._fb.group(
    {
      password: this._fb.control('', [
        Validators.required,
        Validators.minLength(PASSWORD_MIN_LENGTH),
        Validators.pattern(PASSWORD_REGEX),
      ]),
      confirmPassword: this._fb.control('', Validators.required),
    },
    { validators: [passwordMatchValidator] },
  );

  constructor() {
    // 1) essaie sur la route courante
    this._route.queryParamMap.subscribe((params) => {
      this.token = params.get('token');

      // 2) fallback si route imbriquée : essaie le parent
      if (!this.token) {
        this.token = this._route.parent?.snapshot.queryParamMap.get('token') ?? null;
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async onSubmit(): Promise<void> {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    if (!this.token) {
      toast.error('Lien invalide ou expiré.');
      return;
    }

    const { password } = this.resetPasswordForm.getRawValue();

    try {
      await this._authApi.resetPassword({ token: this.token, newPassword: password });

      toast.success('Mot de passe mis à jour.');
      await this._router.navigateByUrl('/login');
    } catch (error) {
      // console.error('Probleme reset password:', error);
      toast.error('Impossible de réinitialiser le mot de passe.');
    }
  }
}
