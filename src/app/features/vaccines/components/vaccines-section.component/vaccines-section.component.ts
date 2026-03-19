import { Component, inject, input } from '@angular/core';
import { VaccinesStore } from '@/features/vaccines/services/vaccines-store';
import { VaccineItemComponent } from '@/features/vaccines/components/vaccine-item.component/vaccine-item.component';
import { ZardDialogService } from '@/shared/components/dialog';
import { VaccineAddDialogComponent } from '@/features/vaccines/components/vaccine-add-dialog.component/vaccine-add-dialog.component';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { ZardButtonComponent } from '@/shared/components/button';

@Component({
  selector: 'app-vaccines-section',
  imports: [VaccineItemComponent, ZardButtonComponent],
  templateUrl: './vaccines-section.component.html',
  styleUrl: './vaccines-section.component.scss',
})
export class VaccinesSectionComponent {
  private _dialogService = inject(ZardDialogService);
  private _vaccineStore = inject(VaccinesStore);

  healthRecord = input.required<HealthRecord>();

  vaccineArray = this._vaccineStore.vaccineArray;

  openDialogAdd(): void {
    this._dialogService.create({
      zTitle: `Ajouter un vaccin`,
      zContent: VaccineAddDialogComponent,
      zHideFooter: true,
      zWidth: '425px',
    });
  }
}
