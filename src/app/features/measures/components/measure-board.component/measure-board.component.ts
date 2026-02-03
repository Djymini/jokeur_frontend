import { Component, input } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button';
import { MeasureChartComponent } from '@/features/measures/components/measure-chart.component/measure-chart.component';
import { ZardIcon, ZardIconComponent } from '@/shared/components/icon';


@Component({
  selector: 'app-measure-board',
  imports: [ZardButtonComponent, MeasureChartComponent, ZardIconComponent],
  templateUrl: './measure-board.component.html',
  styleUrl: './measure-board.component.scss',
})
export class MeasureBoardComponent {
  icon = input.required<ZardIcon>()
  title = input.required<string>();
}
