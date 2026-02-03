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
    label: [
      '2022-05-10',
      '2022-05-11',
      '2022-05-12',
      '2022-05-13',
      '2022-05-14',
      '2022-05-15',
      '2022-05-16',
      '2022-05-17',
    ],
    data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
  };

  ngOnInit(): void {
    this.chart = ChartManager.createChart('MyChart', 'line', this.dataMeasure);
  }
}
