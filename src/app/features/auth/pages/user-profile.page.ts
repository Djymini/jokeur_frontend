import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserProfileComponent } from '@/features/auth/components/user-profile.component/user-profile.component';

@Component({
  selector: 'app-user',
  imports: [UserProfileComponent],
  template: ` <app-user-profile /> `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px;
      width: 100%;
    }

    .page {
      width: 100%;
      max-width: 1200px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class UserProfilePage {}
