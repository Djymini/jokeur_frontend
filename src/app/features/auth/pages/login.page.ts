import { Component } from '@angular/core';
import { LoginFormComponent } from '@/features/auth/components/login-form.component/login-form.component';
import { ZardToastComponent } from '@/shared/components/toast';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent, ZardToastComponent],
  template: `
    <z-toaster />
    <app-login-form></app-login-form>
  `,
  styles: '',
})
export default class LoginPage {}
