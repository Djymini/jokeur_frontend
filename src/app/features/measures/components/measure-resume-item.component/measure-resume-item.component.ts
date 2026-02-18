import { Component, input } from '@angular/core';
import { MeasurePipe } from '@/internal-shared/pipes/measure-pipe';

@Component({
  selector: 'app-measure-resume-item',
  imports: [MeasurePipe],
  templateUrl: './measure-resume-item.component.html',
  styleUrl: './measure-resume-item.component.scss',
})
export class MeasureResumeItemComponent {
  value = input.required<string>();
  date = input.required<string>();
  type = input.required<string>();
  protected readonly parseInt = parseInt;
}
