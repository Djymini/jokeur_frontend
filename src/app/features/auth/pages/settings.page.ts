import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SettingsComponent } from '@/features/auth/components/settings.component/settings.component';

@Component({
  selector: 'app-user',
  imports: [SettingsComponent],
  template: `
    <h2 class="title">Profil</h2>
    <app-user-profile />
  `,
  styles: `
    :host {
      display: block;
      padding: 3rem 6.5rem 4rem;
    }

    @media (max-width: 1024px) {
      :host {
        padding: 2rem 3rem 3rem;
      }
    }

    @media (max-width: 600px) {
      :host {
        padding: 1.5rem 0.75rem 2rem;
      }
    }

    .title {
      max-width: 500px;
      margin: 0 auto 3rem auto;
      color: var(--secondary-dark);
      text-align: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class SettingsPage {}
