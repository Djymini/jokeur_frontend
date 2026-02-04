import { Component, input } from '@angular/core';
import { MeasureChartComponent } from '@/features/measures/components/measure-chart.component/measure-chart.component';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';
import {
  MeasureResumeItemComponent
} from '@/features/measures/components/measure-resume-item.component/measure-resume-item.component';

@Component({
  selector: 'app-measure-resume',
  imports: [
    MeasureChartComponent,
    ZardButtonComponent,
    ZardIconComponent,
    MeasureResumeItemComponent,
  ],
  templateUrl: './measure-resume.component.html',
  styleUrl: './measure-resume.component.scss',
})
export class MeasureResumeComponent {
  title = input.required<string>();
  measures = [
    { id: 1, date: '2022-05-10', value: '5.5' },
    { id: 2, date: '2022-05-11', value: '5.5' },
    { id: 3, date: '2022-05-12', value: '5.4' },
    { id: 4, date: '2022-05-13', value: '5.7' },
    { id: 5, date: '2022-05-14', value: '5.6' },
    { id: 6, date: '2022-05-15', value: '5.5' },
    { id: 7, date: '2022-05-16', value: '5.5' },
    { id: 8, date: '2022-05-17', value: '5.6' },
  ];
}
