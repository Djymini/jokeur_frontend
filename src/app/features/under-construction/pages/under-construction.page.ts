import { Component } from '@angular/core';
import { UnderConstructionComponent } from '../components/under-construction.component/under-construction.component';
import { MeasureChartComponent } from '@/features/measures/components/measure-chart.component/measure-chart.component';
import { MeasureBoardComponent } from '@/features/measures/components/measure-board.component/measure-board.component';

@Component({
  selector: 'app-under-construction.page',
  imports: [MeasureBoardComponent],
  template: `<app-measure-board [title]="'Prise de poids'" [icon]="'popcorn'"></app-measure-board>`,
  styles: ``,
})
export default class UnderConstructionPage {}
