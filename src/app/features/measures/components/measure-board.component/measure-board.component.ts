import { Component, computed, inject, input, OnInit } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button';
import { MeasureChartComponent } from '@/features/measures/components/measure-chart.component/measure-chart.component';
import { ZardIcon, ZardIconComponent } from '@/shared/components/icon';
import { ZardDialogModule, ZardDialogService } from '@/shared/components/dialog';
import { MeasureDetailsDialogComponent } from '@/features/measures/components/measure-details-dialog.component/measure-details-dialog.component';
import { MeasuresFacade } from '@/features/measures/services/measures-facade';
import { MeasureModel } from '@/features/measures/models/measureModel';

@Component({
  selector: 'app-measure-board',
  imports: [ZardButtonComponent, MeasureChartComponent, ZardIconComponent, ZardDialogModule],
  templateUrl: './measure-board.component.html',
  styleUrl: './measure-board.component.scss',
})
export class MeasureBoardComponent implements OnInit {
  idHealthRecord = input.required<number>();
  icon = input.required<ZardIcon>();
  title = input.required<string>();
  type = input.required<string>();
  measures = input.required<MeasureModel[]>();

  dialogService = inject(ZardDialogService);
  measuresFacade = inject(MeasuresFacade);

  ngOnInit(): void {
    this.measuresFacade.initializeMeasureServiceAction(this.type());
  }

  async openDialog(): Promise<void> {
    this.dialogService.create({
      zTitle: 'Details ' + this.title(),
      zDescription: `Voir l'ensemble des saisis`,
      zContent: MeasureDetailsDialogComponent,
      zData: {
        measures: this.measures(),
        type: this.type(),
      },
      zHideFooter: true,
      zCustomClasses: '!p-8',
    });
  }
}
