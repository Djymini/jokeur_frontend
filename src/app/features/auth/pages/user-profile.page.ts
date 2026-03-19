import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserProfileComponent } from '@/features/auth/components/user-profile.component/user-profile.component';

@Component({
  selector: 'app-user',
  imports: [UserProfileComponent],
  template: `
    <h2 class="title">Profil</h2>
    <app-user-profile />
  `,
  styles: `
    :host {
      display: block;
      padding: 3rem 6.5rem 4rem;
    }

    .title {
      margin: 0 0 1.75rem 0;
      color: var(--secondary-dark);
    }
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class UserProfilePage {}
