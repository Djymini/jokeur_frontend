import { Component } from '@angular/core';
import { ForgotPasswordComponent } from '@/features/auth/components/forgot-password.component/forgot-password.component';

@Component({
  selector: 'app-forgot',
  imports: [ForgotPasswordComponent],
  template: '<app-forgot-password></app-forgot-password>',
  styles: '',
})
export default class ForgotPasswordPage {}
