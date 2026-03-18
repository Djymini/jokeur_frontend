import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ZardButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-landing-hero',
  standalone: true,
  imports: [RouterLink, ZardButtonComponent],
  templateUrl: './landing-hero.component.html',
  styleUrl: './landing-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingHeroComponent {}
