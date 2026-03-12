import { Component } from '@angular/core';
import { ResetPasswordComponent } from '@/features/auth/components/reset-password.component/reset-password.component';

@Component({
  selector: 'app-reset',
  imports: [ResetPasswordComponent],
  template: '<app-reset-password></app-reset-password>',
  styles: '',
})
export default class ResetPasswordPage {}
