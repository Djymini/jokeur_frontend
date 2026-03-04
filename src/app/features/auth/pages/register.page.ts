import { Component } from '@angular/core';
import { RegisterFormComponent } from '@/features/auth/components/register-form.component/register-form.component';

@Component({
  selector: 'app-register',
  imports: [RegisterFormComponent],
  template: '<app-register-form></app-register-form>',
  styles: '',
})
export default class RegisterPage {}
