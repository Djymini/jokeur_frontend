import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingNavbarComponent } from '@/features/landing-page/components/landing-navbar/landing-navbar.component';
import { LandingFooterComponent } from '@/features/landing-page/components/landing-footer/landing-footer.component';

@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [RouterOutlet, LandingNavbarComponent, LandingFooterComponent],
  template: `
    <app-landing-navbar
      [activeSection]="activeSection()"
      [menuOpen]="menuOpen()"
      (menuToggled)="toggleMenu()"
    />
    <router-outlet />
    <app-landing-footer />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LandingLayoutComponent {
  readonly activeSection = signal('');
  readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
}
