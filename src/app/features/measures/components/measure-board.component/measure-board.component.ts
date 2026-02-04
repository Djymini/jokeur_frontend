import { Component, inject, input } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button';
import { MeasureChartComponent } from '@/features/measures/components/measure-chart.component/measure-chart.component';
import { ZardIcon, ZardIconComponent } from '@/shared/components/icon';
import { ZardDialogModule, ZardDialogService } from '@/shared/components/dialog';
import { MeasureDetailsDialogComponent } from '@/features/measures/components/measure-details-dialog.component/measure-details-dialog.component';

@Component({
  selector: 'app-measure-board',
  imports: [ZardButtonComponent, MeasureChartComponent, ZardIconComponent, ZardDialogModule],
  templateUrl: './measure-board.component.html',
  styleUrl: './measure-board.component.scss',
})
export class MeasureBoardComponent {
  icon = input.required<ZardIcon>();
  title = input.required<string>();

  dialogService = inject(ZardDialogService);

  openDialog(): void {
    this.dialogService.create({
      zTitle: 'Details ' + this.title(),
      zDescription: `Voir l'ensemble des saisis`,
      zContent: MeasureDetailsDialogComponent,
      zData: [
        { id: 1, date: '2022-05-10', value: '5.5' },
        { id: 2, date: '2022-05-11', value: '5.5' },
        { id: 3, date: '2022-05-12', value: '5.4' },
        { id: 4, date: '2022-05-13', value: '5.7' },
        { id: 5, date: '2022-05-14', value: '5.6' },
        { id: 6, date: '2022-05-15', value: '5.5' },
        { id: 7, date: '2022-05-16', value: '5.5' },
        { id: 8, date: '2022-05-17', value: '5.6' },
      ] as { id: number; date: string; value: string }[],
      zWidth: '500px',
      zHideFooter: true,
      zCustomClasses: '!p-8'
    });
  }
}
