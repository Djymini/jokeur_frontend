import { computed, Injectable, signal } from '@angular/core';
import { SymptomHealthRecordDTO } from '@/features/symptom-health-record/domain/symptom-record-dto';

@Injectable({ providedIn: 'root' })
export class SymptomHealthRecordStore {
  private _symptomRecordArraySignal = signal<SymptomHealthRecordDTO[]>([]);
  readonly symptomRecordArray = computed(() => this._symptomRecordArraySignal());

  setSymptomsRecord(symptomsRecord: SymptomHealthRecordDTO[]): void {
    this._symptomRecordArraySignal.set(symptomsRecord);
  }

  public removeSymptomRecord(id: number): void {
    this._symptomRecordArraySignal.update((symptoms) => symptoms!.filter((sr) => sr.id !== id));
  }
}
