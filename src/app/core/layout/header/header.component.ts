import { Component, input, output } from '@angular/core';


@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export default class HeaderComponent {
  sidebarCollapsed = input<boolean>(false);
  toggleSidebar = output<void>();
}
