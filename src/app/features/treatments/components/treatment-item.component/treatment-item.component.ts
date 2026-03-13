import { Component, inject, input } from '@angular/core';
import { ZardDialogService } from '@/shared/components/dialog';
import { toast } from 'ngx-sonner';
import { TreatmentFacade } from '@/features/treatments/services/treatment-facade';
import { Treatment } from '@/features/treatments/models/treatment.model';
import { TreatmentModifyDialogComponent } from '@/features/treatments/components/treatment-modify-dialog.component/treatment-modify-dialog.component';
import { ZardButtonComponent } from '@/shared/components/button';
import { TreatmentDeleteDialogComponent } from '@/features/treatments/components/treatment-delete-dialog.component/treatment-delete-dialog.component';

@Component({
  selector: 'app-treatment-item',
  imports: [ZardButtonComponent],
  templateUrl: './treatment-item.component.html',
  styleUrl: './treatment-item.component.scss',
})
export class TreatmentItemComponent {
  private _dialogService = inject(ZardDialogService);
  private _treatmentFacade = inject(TreatmentFacade);
  treatment = input.required<Treatment>();

  openDialogModify(): void {
    this._dialogService.create({
      zTitle: `Modifiez le vaccin saisi`,
      zContent: TreatmentModifyDialogComponent,
      zOkText: 'Enregistrer',
      zOnOk: async (instance) => {
        if (!instance.isValid()) {
          toast.error('Veuillez remplir correctement les champs obligatoires.');
          return;
        }

        const updatedVaccine = instance.getUpdatedTreatment();

        try {
          await this._treatmentFacade.modify(updatedVaccine);
        } catch (error) {
          toast.error('Erreur lors de la modification de la donnée');
          throw error;
        }
      },
      zData: {
        treatment: this.treatment(),
      },
      zCancelText: 'Annuler',
      zWidth: '425px',
    });
  }

  openDialogDelete(): void {
    this._dialogService.create({
      zTitle: `Supprimer le vaccin ${this.treatment.name}`,
      zContent: TreatmentDeleteDialogComponent,
      zOkText: 'Supprimer',
      zOnOk: async () => {
        try {
          await this._treatmentFacade.remove(this.treatment());
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
