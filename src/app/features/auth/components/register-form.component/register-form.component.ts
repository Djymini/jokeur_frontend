import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterFormOwnerModel } from '@/features/auth/models/register-form-owner-model';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  private _fb = inject(NonNullableFormBuilder);

  registerForm: FormGroup<RegisterFormOwnerModel> = this._fb.group({
    username: this._fb.control('', Validators.required),
    name: this._fb.control('', Validators.required),
    firstname: this._fb.control('', Validators.required),
    phone: this._fb.control('', Validators.required),
    email: this._fb.control('', Validators.required),
    password: this._fb.control('', Validators.required),
    confirmPassword: this._fb.control('', Validators.required),
    acceptCGU: this._fb.control(false, Validators.required),
  });

  onSubmit(): void {
    console.log('click OK !');
  }
}
