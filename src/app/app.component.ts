import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import HeaderComponent from '@/core/layout/header/header.component';
import { FooterComponent } from '@/core/layout/footer/footer.component';
import SidebarComponent from '@/core/layout/sidebar/sidebar.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = signal('jokeur_frontend');
  // SIGNALS pour l'état du layout
  sidebarCollapsed = signal(false);



  // Méthodes
  toggleSidebar(): void {
    this.sidebarCollapsed.update(state => !state);
  }
}
