import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ZardButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-landing-cta-footer',
  standalone: true,
  imports: [RouterLink, ZardButtonComponent],
  templateUrl: './landing-cta-footer.component.html',
  styleUrl: './landing-cta-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingCtaFooterComponent {}
