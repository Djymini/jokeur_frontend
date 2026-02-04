import { Component, inject } from '@angular/core';
import { AuthService } from '@/core/auth.service';
import { LoginFormModel } from '@/features/auth/models/login-form.models';
import { Router } from '@angular/router';

import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private _fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  loginForm: FormGroup<LoginFormModel> = this._fb.group({
    email: this._fb.control('', Validators.required),
    password: this._fb.control('', Validators.required),
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    this._authService.loginMock(email, password);
    this._router.navigate(['/dashboard']);
  }


}
