import { Component, input, signal } from '@angular/core';

type MenuItem = {
  id: string;
  label: string;
  icon: string;
  route: string;
  badge?: number;
};

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export default class SidebarComponent {
  collapsed = input<boolean>(false);
  activeRoute = input<string>('/dashboard');

  // Signals internes
  menuItems = signal<MenuItem[]>([
    { id: 'dashboard', label: 'Tableau de bord', icon: 'dashboard', route: '/dashboard' },
    { id: 'animals', label: 'Mes animaux', icon: 'pets', route: '/animals' },
    { id: 'calendar', label: 'Agenda', icon: 'calendar_today', route: '/calendar' },
    { id: 'settings', label: 'Paramètres', icon: 'settings', route: '/settings' },
  ]);

  // Méthodes
  selectMenu(): void {
    // todo
  }
}
