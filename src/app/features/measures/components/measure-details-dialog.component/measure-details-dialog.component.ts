import { Component, inject, InputSignal } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';
import { ZardTableImports } from '@/shared/components/table';
import { Z_MODAL_DATA, ZardDialogService } from '@/shared/components/dialog';
import { toast } from 'ngx-sonner';
import { MeasureModel } from '@/features/measures/models/measureModel';
import { MeasurePipe } from '@/internal-shared/pipes/measure-pipe';
import { MeasureModifyDialogComponent } from '@/features/measures/components/measure-modify-dialog.component/measure-modify-dialog.component';
import { MeasuresFacade } from '@/features/measures/services/measures-facade';
import { MeasureDeleteDialogComponent } from '@/features/measures/components/measure-delete-dialog.component/measure-delete-dialog.component';

@Component({
  selector: 'app-measure-details-dialog.component',
  imports: [ZardTableImports, ZardButtonComponent, ZardIconComponent, MeasurePipe],
  templateUrl: './measure-details-dialog.component.html',
  styleUrl: './measure-details-dialog.component.scss',
})
export class MeasureDetailsDialogComponent {
  private _dialogService = inject(ZardDialogService);
  private _measuresFacade = inject(MeasuresFacade);
  data: { measuresSignal: InputSignal<MeasureModel[]>; type: string } = inject(Z_MODAL_DATA);

  openDialogAdd(measure: MeasureModel): void {
    this._dialogService.create({
      zTitle: `Modifiez la donnée saisie`,
      zDescription: `Remplacez ${measure.value} saisie le ${measure.creationDate}`,
      zContent: MeasureModifyDialogComponent,
      zOkText: 'Enregistrer',
      zOnOk: async (instance) => {
        const formValue = instance.form.get('value')?.value;

        try {
          await this._measuresFacade.modify(measure, formValue!);
        } catch (error) {
          toast.error('Erreur lors de la modification de la donnée');
          throw error;
        }
      },
      zCancelText: 'Annuler',
      zWidth: '425px',
    });
  }

  openDialogDelete(measure: MeasureModel): void {
    this._dialogService.create({
      zTitle: `Supprimer ${measure.value} saisie le ${measure.creationDate}`,
      zContent: MeasureDeleteDialogComponent,
      zOkText: 'Supprimer',
      zOnOk: async () => {
        try {
          await this._measuresFacade.remove(measure);
          toast.success('Suppression réalisée', {
            duration: 2000,
          });
        } catch (error) {
          toast.error('Erreur lors de la suppression de la donnée');
          throw error;
        }
      },
      zCancelText: 'Annuler',
      zWidth: '425px',
    });
  }
}
