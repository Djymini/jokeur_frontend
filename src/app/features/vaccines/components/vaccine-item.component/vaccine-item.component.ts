import { Component, inject, input } from '@angular/core';
import { Vaccine } from '@/features/vaccines/models/vaccine.model';
import { ZardButtonComponent } from '@/shared/components/button';
import { toast } from 'ngx-sonner';
import { ZardDialogService } from '@/shared/components/dialog';
import { VaccinesFacade } from '@/features/vaccines/services/vaccines-facade';
import { VaccineDeleteDialogComponent } from '@/features/vaccines/components/vaccine-delete-dialog.component/vaccine-delete-dialog.component';
import { VaccineModifyDialogComponent } from '@/features/vaccines/components/vaccine-modify-dialog.component/vaccine-modify-dialog.component';

@Component({
  selector: 'app-vaccine-item',
  imports: [ZardButtonComponent],
  templateUrl: './vaccine-item.component.html',
  styleUrl: './vaccine-item.component.scss',
})
export class VaccineItemComponent {
  private _dialogService = inject(ZardDialogService);
  private _vaccineFacade = inject(VaccinesFacade);
  vaccine = input.required<Vaccine>();

  openDialogModify(): void {
    this._dialogService.create({
      zTitle: `Modifiez le vaccin saisi`,
      zContent: VaccineModifyDialogComponent,
      zOkText: 'Enregistrer',
      zOnOk: async (instance) => {
        if (!instance.isValid()) {
          toast.error('Veuillez remplir correctement les champs obligatoires.');
          return;
        }

        const updatedVaccine = instance.getUpdatedVaccine();

        try {
          await this._vaccineFacade.modify(updatedVaccine);
        } catch (error) {
          toast.error('Erreur lors de la modification de la donnée');
          throw error;
        }
      },
      zData: {
        vaccine: this.vaccine(),
      },
      zCancelText: 'Annuler',
      zWidth: '425px',
    });
  }

  openDialogDelete(): void {
    this._dialogService.create({
      zTitle: `Supprimer le vaccin ${this.vaccine.name}`,
      zContent: VaccineDeleteDialogComponent,
      zOkText: 'Supprimer',
      zOnOk: async () => {
        try {
          await this._vaccineFacade.remove(this.vaccine());
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
