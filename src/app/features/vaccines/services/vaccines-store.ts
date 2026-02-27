import { computed, Injectable, signal } from '@angular/core';
import { Vaccine } from '@/features/vaccines/models/vaccine.model';

@Injectable({
  providedIn: 'root',
})
export class VaccinesStore {
  private _vaccineArraySignal = signal<Vaccine[]>([]);

  public vaccineArray = computed(() => this._vaccineArraySignal());

  public setVaccine(vaccines: Vaccine[]): void {
    this._vaccineArraySignal.set(vaccines);
  }

  public addVaccine(vaccine: Vaccine): void {
    this._vaccineArraySignal.update((vaccines) => [...(vaccines as Vaccine[]), vaccine]);
  }

  public removeVaccine(id: number): void {
    this._vaccineArraySignal.update((vaccines) => vaccines!.filter((vaccine) => vaccine.id !== id));
  }

  public modifyVaccine(vaccineNewValue: Vaccine): void {
    this._vaccineArraySignal.update((vaccines) => {
      return vaccines.map((v) => (v.id === vaccineNewValue.id ? { ...v, ...vaccineNewValue } : v));
    });
  }
}
