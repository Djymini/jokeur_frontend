import { computed, Injectable, signal } from '@angular/core';
import { Treatment } from '@/features/treatments/models/treatment.model';

@Injectable({
  providedIn: 'root',
})
export class TreatmentStore {
  private _treatmentArraySignal = signal<Treatment[]>([]);

  public treatmentArray = computed(() => this._treatmentArraySignal());

  public setTreatment(treatments: Treatment[]): void {
    this._treatmentArraySignal.set(treatments);
  }

  public addTreatment(treatment: Treatment): void {
    this._treatmentArraySignal.update((treatments) => [...(treatments as Treatment[]), treatment]);
  }

  public removeTreatment(id: number): void {
    this._treatmentArraySignal.update((treatments) => treatments!.filter((treatment) => treatment.id !== id));
  }

  public modifyTreatment(treatmentNewValue: Treatment): void {
    this._treatmentArraySignal.update((treatments) => {
      return treatments.map((v) => (v.id === treatmentNewValue.id ? { ...v, ...treatmentNewValue } : v));
    });
  }
}
