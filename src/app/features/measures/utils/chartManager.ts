import { ChartTypeRegistry } from 'chart.js';
import { Chart } from 'chart.js/auto';

import { ChartMeasureModel } from '@/internal-shared/models/chartMeasure.model';

export class ChartManager {
  public static createChart(
    nameChart: string,
    chartType: keyof ChartTypeRegistry,
    measureData: ChartMeasureModel,
  ): any {
    return new Chart(nameChart, {
      type: chartType,

      data: {
        labels: measureData.data,
        datasets: [
          {
            label: measureData.name,
            data: measureData.data,
            backgroundColor: '#68A692FF',
            borderColor: '#68A692FF',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
