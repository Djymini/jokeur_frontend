import { Component, input } from '@angular/core';
import { MeasurePipe } from '@/internal-shared/pipes/measure-pipe';
import { DisplayDateRules } from '@/internal-shared/domain/display-date.rules';


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
  protected readonly parseFloat = parseFloat;
  protected readonly formatDate = DisplayDateRules.formatDateShort;
}
