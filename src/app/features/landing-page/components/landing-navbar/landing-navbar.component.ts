import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { AuthService } from '@/core/services/auth.service';
import {
  ZardDropdownImports,
  ZardDropdownMenuContentComponent,
} from '@/shared/components/dropdown';
import { ZardMenuImports } from '@/shared/components/menu';

@Component({
  selector: 'app-landing-navbar',
  standalone: true,
  imports: [
    RouterLink,
    ZardButtonComponent,
    ZardDropdownMenuContentComponent,
    ZardDropdownImports,
    ZardMenuImports,
  ],
  templateUrl: './landing-navbar.component.html',
  styleUrl: './landing-navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingNavbarComponent {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  readonly activeSection = input.required<string>();
  readonly menuOpen = input.required<boolean>();
  readonly menuToggled = output<void>();

  readonly isLoggedIn = this._authService.isLoggedIn;
  readonly user = this._authService.user;

  toggle(): void {
    this.menuToggled.emit();
  }

  onDashboard(): void {
    this._router.navigate(['/dashboard']);
  }

  onSettings(): void {
    this._router.navigate(['/user-profile']);
  }

  onLogout(): void {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
