import { Component } from '@angular/core';
import { RegisterFormComponent } from '@/features/auth/components/register-form.component/register-form.component';
import { ZardToastComponent } from '@/shared/components/toast';

@Component({
  selector: 'app-register',
  imports: [RegisterFormComponent, ZardToastComponent],
  template: `
    <z-toaster />
    <app-register-form></app-register-form>
  `,
  styles: '',
})
export default class RegisterPage {}
