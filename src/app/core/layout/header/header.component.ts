import { Component, input, output } from '@angular/core';

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
}
