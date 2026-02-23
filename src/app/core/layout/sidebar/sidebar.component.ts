import { Component, inject, input, signal } from '@angular/core';
import { MenuItemModel } from '@/internal-shared/domaine/MenuItem.model';
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

  // Signals internes
  menuItems = signal<MenuItemModel[]>([
    { id: 'dashboard', label: 'Tableau de bord', icon: 'dashboard', path: '/dashboard' },
    { id: 'animals', label: 'Mes animaux', icon: 'pets', path: '/construction' },
    { id: 'calendar', label: 'Agenda', icon: 'calendar_today', path: '/construction' },
    { id: 'settings', label: 'Paramètres', icon: 'settings', path: '/construction' },
  ]);

  // Méthodes
  selectMenu(): void {
    // todo
  }
}
