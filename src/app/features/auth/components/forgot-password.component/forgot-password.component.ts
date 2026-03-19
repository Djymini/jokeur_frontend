import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotPasswordFormModel } from '@/features/auth/models/forgot-password.models';
import { Router, RouterLink } from '@angular/router';
import { AuthApi } from '@/core/auth.api';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  private _fb = inject(NonNullableFormBuilder);
  private _authApi = inject(AuthApi);
  private _router = inject(Router);

  forgotPasswordForm: FormGroup<ForgotPasswordFormModel> = this._fb.group({
    email: this._fb.control('', [Validators.required, Validators.email]),
  });

  async onSubmit(): Promise<void> {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    try {
      const email = this.forgotPasswordForm.getRawValue();
      await this._authApi.forgotPassword(email);

      await this._router.navigate(['/login']);
      toast.success('Un email de réinitialisation a été envoyé à votre adresse.');
    } catch (error) {
      console.error(error);
      toast.error("Impossible d'envoyer l'email.");
    }
  }
}
