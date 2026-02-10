import { Component, input, OnInit } from '@angular/core';
import { ChartManager } from '@/features/measures/utils/chartManager';
import { ChartMeasureModel } from '@/internal-shared/models/chartMeasure.model';
import { MeasureModel } from '@/features/measures/models/measureModel';

@Component({
  selector: 'app-measure-chart',
  imports: [],
  templateUrl: './measure-chart.component.html',
  styleUrl: './measure-chart.component.scss',
})
export class MeasureChartComponent implements OnInit {
  title = input.required<string>();
  mesures = input.required<MeasureModel[]>();
  public chart: any;

  ngOnInit(): void {
    const label: string[] = [];
    const data: string[] = [];

    for (const measure of this.mesures()) {
      label.push(measure.creationDate);
      data.push(measure.value.toString());
    }
    const dataMeasure: ChartMeasureModel = {
      name: this.title(),
      labels: label,
      data: data,
    };
    this.chart = ChartManager.createChart('MyChart', 'line', dataMeasure);
  }
}
