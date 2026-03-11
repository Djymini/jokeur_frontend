import { Component, inject, input, output } from '@angular/core';
import { AuthService } from '@/core/services/auth.service';
import { Router } from '@angular/router';
import {
  ZardDropdownImports,
  ZardDropdownMenuContentComponent,
} from '@/shared/components/dropdown';
import { ZardMenuImports } from '@/shared/components/menu';

@Component({
  selector: 'app-header',
  imports: [ZardDropdownMenuContentComponent, ZardDropdownImports, ZardMenuImports],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private _router = inject(Router);
  private _authService = inject(AuthService);

  sidebarCollapsed = input<boolean>(false);
  category = input<string>();
  toggleSidebar = output<void>();

  isVisible = this._authService.isLoggedIn;
  user = this._authService.user;

  onDashboard(): void {
    this._router.navigate(['/dashboard']);
  }

  onSettings(): void {
    this._router.navigate(['/user-profile']);
  }

  onLogout(): void {
    this._authService.logout();
    this._router.navigate(['/']);
  }
}
