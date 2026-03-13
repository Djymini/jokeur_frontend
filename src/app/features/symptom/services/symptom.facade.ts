import { inject, Injectable } from '@angular/core';
import { SymptomApi } from '@/features/symptom/services/symptom.api';
import { SymptomStore } from '@/features/symptom/services/symptom.store';
import { SymptomResponseDto } from '@/features/symptom/models/symptom-response-dto';

@Injectable({ providedIn: 'root' })
export class SymptomFacade {
  private readonly _symptomApi = inject(SymptomApi);
  private readonly _symptomStore = inject(SymptomStore);

  async getSymptoms(): Promise<SymptomResponseDto[]> {
    // on vérifie si la liste existe dans le cache
    if (this._symptomStore.symptomArray.length == 0) {
      // appelle backend
      const response = await this._symptomApi.getAllSymptoms();
      this._symptomStore.setSymptoms(response);
    }
    return this._symptomStore.symptomArray();
  }
}
