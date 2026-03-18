import { BaseApi } from '@/internal-shared/services/base.api';
import { Injectable } from '@angular/core';
import { CreateUpdateSymptomRecordDto } from '@/features/symptom-health-record/model/create-update-symptom-record-dto';
import { SymptomHealthRecordDTO } from '@/features/symptom-health-record/model/symptom-record-dto';

@Injectable({ providedIn: 'root' })
export class SymptomHealthRecordApi extends BaseApi {
  private readonly _endpoint = '/symptom-health-records';

  async getAllSymptomsRecord(healthRecordId: number): Promise<SymptomHealthRecordDTO[]> {
    try {
      return this.get<SymptomHealthRecordDTO[]>(`${this._endpoint}/${healthRecordId}`);
    } catch (error) {
      console.error(`Erreur lors du chargement du symptôme ${healthRecordId}:`, error);
      throw new Error('Impossible de charger le symptôme');
    }
  }

  async createSymptomRecord(
    healthRecordId: number,
    symptom: CreateUpdateSymptomRecordDto,
  ): Promise<void> {
    return this.post<void>(`${this._endpoint}/${healthRecordId}`, symptom);
  }

  async updateSymptomRecord(
    healthRecordId: number,
    symptom: CreateUpdateSymptomRecordDto,
  ): Promise<SymptomHealthRecordDTO> {
    return this.put<SymptomHealthRecordDTO>(`${this._endpoint}/${healthRecordId}`, symptom);
  }

  async deleteSymptomRecord(id: number): Promise<string> {
    return this.delete<string>(`${this._endpoint}/${id}`);
  }
}
