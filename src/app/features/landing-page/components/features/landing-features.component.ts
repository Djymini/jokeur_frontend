import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Feature } from '@/features/landing-page/page/landing-page';

@Component({
  selector: 'app-landing-features',
  standalone: true,
  imports: [],
  templateUrl: './landing-features.component.html',
  styleUrl: './landing-features.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingFeaturesComponent {
  readonly features = input.required<Feature[]>();
}
