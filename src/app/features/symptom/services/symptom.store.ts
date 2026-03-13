import { computed, Injectable, signal } from '@angular/core';
import { SymptomResponseDto } from '@/features/symptom/models/symptom-response-dto';

@Injectable({ providedIn: 'root' })
export class SymptomStore {
  private _symptomArraySignal = signal<SymptomResponseDto[]>([]);
  readonly symptomArray = computed(() => this._symptomArraySignal());

  setSymptoms(symptoms: SymptomResponseDto[]): void {
    this._symptomArraySignal.set(symptoms);
  }
}
