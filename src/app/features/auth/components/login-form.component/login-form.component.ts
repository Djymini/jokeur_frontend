import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginFormModel } from '@/features/auth/models/login-form.models';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private _fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  loginForm: FormGroup<LoginFormModel> = this._fb.group({
    email: this._fb.control('', Validators.required),
    password: this._fb.control('', Validators.required),
  });

  onSubmit(): void {
    console.log('submit en cours');
  }
}
