import { BaseApi } from '@/internal-shared/services/base.api';
import { Injectable } from '@angular/core';
import { SymptomResponseDto } from '@/features/symptom/models/symptom-response-dto';

@Injectable({ providedIn: 'root' })
export class SymptomApi extends BaseApi {
  private readonly _endpoint = '/symptoms';

  async getAllSymptoms(): Promise<SymptomResponseDto[]> {
    return this.get<SymptomResponseDto[]>(this._endpoint);
  }
}
