import { Component } from '@angular/core';
import { LoginFormComponent } from '@/features/auth/components/login-form.component/login-form.component';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent],
  template: '' + '<h2>Connexion</h2>' + '<app-login-form></app-login-form>',
  styles: '',
})
export default class LoginPage {}
