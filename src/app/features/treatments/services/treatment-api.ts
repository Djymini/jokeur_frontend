import { Injectable } from '@angular/core';
import { Treatment } from '@/features/treatments/models/treatment.model';
import { BaseApi } from '@/internal-shared/services/base.api';
import { TreatmentRequest } from '@/features/treatments/models/treatmentRequest.model';

@Injectable({
  providedIn: 'root',
})
export class TreatmentApi extends BaseApi {
  async getTreatment(endpoint: string): Promise<Treatment[]> {
    return this.get<Treatment[]>('/treatments/' + endpoint);
  }

  async addTreatment(treatmentRequest: TreatmentRequest): Promise<Treatment> {
    return this.post<Treatment>('/treatments', treatmentRequest);
  }

  async modifyTreatment(treatmentNewValue: Treatment): Promise<Treatment> {
    return this.put<Treatment>(
      `/treatments/${treatmentNewValue.healthRecordId}/${treatmentNewValue.id}`,
      treatmentNewValue,
    );
  }

  async deleteTreatment(treatmentRequest: Treatment): Promise<string> {
    return this.delete<string>(
      `/treatments/${treatmentRequest.healthRecordId}/${treatmentRequest.id}`,
    );
  }
}
