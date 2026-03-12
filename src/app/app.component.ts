import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HealthRecordFormBootstrapService } from '@/features/health-records/services/health-record-form-bootstrap.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _bootstrap = inject(HealthRecordFormBootstrapService);
  protected readonly title = signal('jokeur_frontend');

  constructor() {
    this._bootstrap.init();
  }
}
