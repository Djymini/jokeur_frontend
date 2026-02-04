import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import HeaderComponent from '@/core/layout/header/header.component';
import { FooterComponent } from '@/core/layout/footer/footer.component';
import SidebarComponent from '@/core/layout/sidebar/sidebar.component';
import { ZardToastComponent } from '@/shared/components/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent, ZardToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = signal('jokeur_frontend');
}
