import { inject, Injectable } from '@angular/core';
import { toast } from 'ngx-sonner';
import { TreatmentApi } from '@/features/treatments/services/treatment-api';
import { TreatmentStore } from '@/features/treatments/services/treatment-store';
import { Treatment } from '@/features/treatments/models/treatment.model';
import { TreatmentRequest } from '@/features/treatments/models/treatmentRequest.model';

@Injectable({
  providedIn: 'root',
})
export class TreatmentFacade {
  private _treatmentApi = inject(TreatmentApi);
  private _treatmentStore = inject(TreatmentStore);

  async getTreatment(healthRecordNumber: number): Promise<Treatment[]> {
    const currentData = this._treatmentStore.treatmentArray();

    if (!currentData || currentData.length === 0) {
      const response = await this._treatmentApi.getTreatment(healthRecordNumber.toString());
      this._treatmentStore.setTreatment(response);
    }

    return this._treatmentStore.treatmentArray();
  }

  async addTreatment(data: TreatmentRequest): Promise<Treatment> {
    const newTreatment: Treatment = await this._treatmentApi.addTreatment(data);
    this._treatmentStore.addTreatment(newTreatment);

    toast.success('Valeur ajoutée au carnet', {
      duration: 2000,
    });
    return newTreatment;
  }

  async modify(treatmentForUpdate: Treatment): Promise<void> {
    const newTreatment = await this._treatmentApi.modifyTreatment(treatmentForUpdate);
    this._treatmentStore.modifyTreatment(newTreatment);

    toast.success('Valeur modifiée dans le carnet', {
      duration: 2000,
    });
  }

  async remove(treatment: Treatment): Promise<void> {
    const msgConfirmation = await this._treatmentApi.deleteTreatment(treatment);
    this._treatmentStore.removeTreatment(treatment.id);

    toast.success(msgConfirmation, {
      duration: 2000,
    });
  }
}
