import { Component } from '@angular/core';
import { UserProfileComponent } from '@/features/auth/components/user-profile.component/user-profile.component';

@Component({
  selector: 'app-user',
  imports: [UserProfileComponent],
  template: '<app-user-profile></app-user-profile>',
  styles: '',
})
export default class LoginPage {}
