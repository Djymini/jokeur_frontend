import { inject, Injectable } from '@angular/core';
import { VaccinesApi } from '@/features/vaccines/services/vaccines-api';
import { VaccinesStore } from '@/features/vaccines/services/vaccines-store';
import { Vaccine } from '@/features/vaccines/models/vaccine.model';
import { VaccineRequestDto } from '@/features/vaccines/models/vaccineRequestDto';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class VaccinesFacade {
  private _vaccinesApi = inject(VaccinesApi);
  private _vaccinesStore = inject(VaccinesStore);

  async getVaccine(healthRecordNumber: number): Promise<Vaccine[]> {
    const currentData = this._vaccinesStore.vaccineArray();

    if (!currentData || currentData.length === 0) {
      const response = await this._vaccinesApi.getVaccine(healthRecordNumber.toString());
      this._vaccinesStore.setVaccine(response);
    }

    return this._vaccinesStore.vaccineArray();
  }

  async addVaccine(data: VaccineRequestDto): Promise<Vaccine> {
    const newMeasure: Vaccine = await this._vaccinesApi.addVaccine(data);
    this._vaccinesStore.addVaccine(newMeasure);

    toast.success('Valeur ajoutée au carnet', {
      duration: 2000,
    });
    return newMeasure;
  }

  async modify(vaccineForUpdate: Vaccine): Promise<void> {
    const newMeasure = await this._vaccinesApi.modifyVaccine(vaccineForUpdate);
    this._vaccinesStore.modifyVaccine(newMeasure);

    toast.success('Valeur modifiée dans le carnet', {
      duration: 2000,
    });
  }

  async remove(vaccine: Vaccine): Promise<void> {
    const msgConfirmation = await this._vaccinesApi.deleteVaccine(vaccine);
    this._vaccinesStore.removeVaccine(vaccine.id);

    toast.success(msgConfirmation, {
      duration: 2000,
    });
  }
}
