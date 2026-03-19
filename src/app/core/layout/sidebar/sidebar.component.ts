import { Component, inject, input, output, signal, HostListener } from '@angular/core';
import { MenuItemModel } from '@/core/layout/sidebar/model/MenuItem.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  collapsed = input<boolean>(false);
  mobileOpen = input<boolean>(false);
  activeRoute = input<string>('/dashboard');
  toggleSidebar = output<void>();

  isVisible = inject(AuthService).isLoggedIn;

  menuItems = signal<MenuItemModel[]>([
    { id: 'dashboard', label: 'Tableau de bord', icon: 'dashboard', path: '/dashboard' },
    { id: 'calendar', label: 'Agenda', icon: 'calendar_today', path: '/calendar' },
    { id: 'settings', label: 'Paramètres', icon: 'settings', path: '/settings' },
  ]);

  onMenuItemClick(): void {
    if (window.innerWidth <= 768) {
      this.toggleSidebar.emit();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 768 && this.mobileOpen()) {
      this.toggleSidebar.emit();
    }
  }
}
