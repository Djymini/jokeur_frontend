import { Component, inject } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';
import { ZardTableImports } from '@/shared/components/table';
import { Z_MODAL_DATA } from '@/shared/components/dialog';

@Component({
  selector: 'app-measure-details-dialog.component',
  imports: [ZardTableImports, ZardButtonComponent, ZardIconComponent],
  templateUrl: './measure-details-dialog.component.html',
  styleUrl: './measure-details-dialog.component.scss',
})
export class MeasureDetailsDialogComponent {
  measures: { id: number; date: string; value: string }[] = inject(Z_MODAL_DATA);

  deleteMeasure(measureId: number): void {
    console.log('make the delete method for measureId ' + measureId);
  }

  editMeasure(measureId: number): void {
    console.log('make the edit method for measureId ' + measureId);
  }
}
