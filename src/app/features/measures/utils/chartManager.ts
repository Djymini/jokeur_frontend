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
        labels: measureData.labels,
        datasets: [
          {
            label: measureData.name,
            data: measureData.data,
            backgroundColor: '#4A786BFF',
            borderColor: '#4A786BFF',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
        scales: {
          x: {
            ticks: {
              padding: 12,
            },
          },
          y: {
            offset: true,
          },
        },
      },
    });
  }
}
