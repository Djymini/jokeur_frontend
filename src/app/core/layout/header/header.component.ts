import { Component, inject, input, output } from '@angular/core';
import { AuthApi } from '@/core/auth.api';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  sidebarCollapsed = input<boolean>(false);
  category = input<string>();
  toggleSidebar = output<void>();

  isVisible = inject(AuthApi).isLogged();
}
