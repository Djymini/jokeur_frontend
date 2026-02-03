import { Component } from '@angular/core';
import { UnderConstructionComponent } from '../components/under-construction.component/under-construction.component';
import {MeasureChartComponent} from '@/features/measures/components/measure-chart.component/measure-chart.component';

@Component({
  selector: 'app-under-construction.page',
  imports: [UnderConstructionComponent, MeasureChartComponent],
  template: `<app-measure-chart></app-measure-chart>`,
  styles: ``,
})
export default class UnderConstructionPage {}
