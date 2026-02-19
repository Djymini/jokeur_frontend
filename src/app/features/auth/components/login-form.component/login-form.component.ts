import { Component, inject } from '@angular/core';
import { AuthService } from '@/core/services/auth.service';
import { LoginFormModel } from '@/features/auth/models/login-form.models';
import { Router } from '@angular/router';

import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthApi } from '@/core/auth.api';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private _fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private _authApi = inject(AuthApi);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  loginForm: FormGroup<LoginFormModel> = this._fb.group({
    email: this._fb.control('', [Validators.required, Validators.email]),
    password: this._fb.control('', Validators.required),
  });

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) return;

    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    const res = await this._authApi.login({ email, password }); // AuthApi
    this._authService.setToken(res.token); // AuthService

    this._router.navigate(['/dashboard']);
  }
}
