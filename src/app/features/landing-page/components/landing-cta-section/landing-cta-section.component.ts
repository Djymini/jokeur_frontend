import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ZardButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-landing-cta-section',
  standalone: true,
  imports: [RouterLink, ZardButtonComponent],
  templateUrl: './landing-cta-section.component.html',
  styleUrl: './landing-cta-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingCtaSectionComponent {}
