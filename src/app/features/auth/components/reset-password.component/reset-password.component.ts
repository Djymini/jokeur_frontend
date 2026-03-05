import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResetPasswordFormModel } from '@/features/auth/models/reset-password.models';
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@/features/auth/domain/password.rules';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  private _fb = inject(NonNullableFormBuilder);
  showPassword = false;
  showConfirmPassword = false;

  resetPasswordForm: FormGroup<ResetPasswordFormModel> = this._fb.group({
    password: this._fb.control('', [
      Validators.required,
      Validators.minLength(PASSWORD_MIN_LENGTH),
      Validators.pattern(PASSWORD_REGEX),
    ]),
    confirmPassword: this._fb.control('', Validators.required),
  });

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
  }
}
