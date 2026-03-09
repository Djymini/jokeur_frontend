import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@/core/layout/footer/footer.component';
import { HeaderComponent } from '@/core/layout/header/header.component';
import { ZardToastComponent } from '@/shared/components/toast';
import { SidebarComponent } from '@/core/layout/sidebar/sidebar.component';
import {
  HealthRecordFormBootstrapService
} from '@/features/health-records/services/health-record-form-bootstrap.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent, ZardToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _bootstrap = inject(HealthRecordFormBootstrapService);

  protected readonly title = signal('jokeur_frontend');
  sidebarCollapsed = signal(false);

  constructor() {
    this._bootstrap.init();
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update((state) => !state);
    console.log('toggleSidebar');
  }
}
