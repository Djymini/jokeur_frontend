import {  Component, effect, input, signal } from '@angular/core';
import { ChartManager } from '@/features/measures/utils/chartManager';
import { ChartMeasureModel } from '@/internal-shared/models/chartMeasure.model';
import { MeasureModel } from '@/features/measures/models/measureModel';

@Component({
  selector: 'app-measure-chart',
  imports: [],
  templateUrl: './measure-chart.component.html',
  styleUrl: './measure-chart.component.scss',
})
export class MeasureChartComponent {
  title = input.required<string>();
  type = input.required<string>();
  mesures = input.required<MeasureModel[]>();

  public chart = signal<any>(null);

  constructor() {
    setTimeout(() => {
      this._createChart();
    }, 1000);

    effect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const data:MeasureModel[] = this.mesures();
      const currentChart = this.chart();

      if (currentChart) {
        this._updateChart(currentChart);
      }
    });
  }

  private _createChart(): void {
    const dataMeasure: ChartMeasureModel = {
      name: this.title(),
      labels: this.mesures().map(m => m.creationDate),
      data: this.mesures().map(m => m.value.toString())
    };

    const newChart = ChartManager.createChart(this.type(), 'line', dataMeasure);
    this.chart.set(newChart);
  }

  private _updateChart(chartInstance: any): void {
    chartInstance.data.labels = this.mesures().map(m => m.creationDate);
    chartInstance.data.datasets[0].data = this.mesures().map(m => m.value.toString());
    chartInstance.update();
  }
}
