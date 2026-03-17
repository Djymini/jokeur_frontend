import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ZardButtonComponent } from '@/shared/components/button/button.component';

@Component({
  selector: 'app-landing-navbar',
  standalone: true,
  imports: [RouterLink, ZardButtonComponent],
  templateUrl: './landing-navbar.component.html',
  styleUrl: './landing-navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingNavbarComponent {
  readonly activeSection = input.required<string>();
  readonly menuOpen = input.required<boolean>();
  readonly menuToggled = output<void>();

  toggle(): void {
    this.menuToggled.emit();
  }
}
