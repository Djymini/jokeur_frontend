import {
  Component,
  effect,
  ElementRef,
  input,
  OnDestroy,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { ChartManager } from '@/features/measures/utils/chartManager';
import { ChartMeasureModel } from '@/internal-shared/models/chartMeasure.model';
import { MeasureModel } from '@/features/measures/models/measureModel';
import { DisplayDateRules } from '@/internal-shared/domain/display-date.rules';

@Component({
  selector: 'app-measure-chart',
  imports: [],
  templateUrl: './measure-chart.component.html',
  styleUrl: './measure-chart.component.scss',
})
export class MeasureChartComponent implements OnDestroy {
  @ViewChild('chartCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  title = input.required<string>();
  type = input.required<string>();
  mesures = input.required<MeasureModel[]>();

  isLoading = output<boolean>();

  chart = signal<any>(null);
  private _timeoutId: any;

  constructor() {
    this._timeoutId = setTimeout(() => {
      this._createChart();

      requestAnimationFrame(() => {
        this.isLoading.emit(false);
      });
    }, 3000);

    effect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const data: MeasureModel[] = this.mesures();
      if (this.chart()) {
        this._updateChart(this.chart());
      }
    });
  }

  ngOnDestroy(): void {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
  }

  private _createChart(): void {
    const dataMeasure: ChartMeasureModel = {
      name: this.title(),
      labels: this.mesures().map((m) => DisplayDateRules.formatDateFromString(m.creationDate)),
      data: this.mesures().map((m) => m.value.toString()),
    };

    const newChart = ChartManager.createChart(this.type(), 'line', dataMeasure);
    this.chart.set(newChart);
  }

  private _updateChart(chartInstance: any): void {
    chartInstance.data.labels = this.mesures().map((m) =>
      DisplayDateRules.formatDateFromString(m.creationDate),
    );
    chartInstance.data.datasets[0].data = this.mesures().map((m) => m.value.toString());
    chartInstance.update();
  }
}
