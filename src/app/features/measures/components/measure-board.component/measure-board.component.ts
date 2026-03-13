import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button';
import { MeasureChartComponent } from '@/features/measures/components/measure-chart.component/measure-chart.component';
import { ZardIcon, ZardIconComponent } from '@/shared/components/icon';
import { ZardDialogService } from '@/shared/components/dialog';
import { MeasureDetailsDialogComponent } from '@/features/measures/components/measure-details-dialog.component/measure-details-dialog.component';
import { MeasuresFacade } from '@/features/measures/services/measures-facade';
import { MeasureModel } from '@/features/measures/models/measureModel';
import { ZardSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'app-measure-board',
  imports: [ZardButtonComponent, MeasureChartComponent, ZardIconComponent, ZardSkeletonComponent],
  templateUrl: './measure-board.component.html',
  styleUrl: './measure-board.component.scss',
})
export class MeasureBoardComponent implements OnInit {
  idHealthRecord = input.required<number>();
  icon = input.required<ZardIcon>();
  title = input.required<string>();
  type = input.required<string>();
  measures = input.required<MeasureModel[]>();

  showingLoader = signal<boolean>(true);

  dialogService = inject(ZardDialogService);
  measuresFacade = inject(MeasuresFacade);

  ngOnInit(): void {
    this.measuresFacade.initializeMeasureServiceAction(this.type());
  }

  showLoader(isLoaderLoading: boolean): void {
    this.showingLoader.set(isLoaderLoading);
    console.log(this.showingLoader());
  }

  async openDialog(): Promise<void> {
    this.dialogService.create({
      zTitle: 'Details ' + this.title(),
      zDescription: `Voir l'ensemble des données saisies`,
      zContent: MeasureDetailsDialogComponent,
      zData: {
        measuresSignal: this.measures,
        type: this.type(),
      },
      zHideFooter: true,
      zCustomClasses: '!p-8',
    });
  }
}
