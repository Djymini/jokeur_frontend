import { Component, OnInit } from '@angular/core';
import { ChartManager } from '@/features/measures/utils/chartManager';
import { ChartMeasureModel } from '@/internal-shared/models/chartMeasure.model';

@Component({
  selector: 'app-measure-chart',
  imports: [],
  templateUrl: './measure-chart.component.html',
  styleUrl: './measure-chart.component.scss',
})
export class MeasureChartComponent implements OnInit {
  public chart: any;

  dataMeasure: ChartMeasureModel = {
    name: 'Poids',
    labels: [
      '2022-05-10',
      '2022-05-11',
      '2022-05-12',
      '2022-05-13',
      '2022-05-14',
      '2022-05-15',
      '2022-05-16',
      '2022-05-17',
    ],
    data: ['5.5', '5.5', '5.4', '5.7', '5.6', '5.5', '5.5', '5.6'],
  };

  ngOnInit(): void {
    this.chart = ChartManager.createChart('MyChart', 'line', this.dataMeasure);
  }
}
