import { Component, inject, input, signal } from '@angular/core';
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
  activeRoute = input<string>('/dashboard');

  isVisible = inject(AuthService).isLoggedIn;

  menuItems = signal<MenuItemModel[]>([
    { id: 'dashboard', label: 'Tableau de bord', icon: 'dashboard', path: '/dashboard' },
    { id: 'settings', label: 'Paramètres', icon: 'settings', path: '/user-profile' },
    { id: 'calendar', label: 'Agenda', icon: 'calendar_today', path: '/calendar' },
  ]);

  // Méthodes
  selectMenu(): void {
    // todo
  }
}
