import { Injectable } from '@angular/core';
import { BaseApi } from '@/internal-shared/services/base.api';
import { CreateHealthRecordDto } from '../models/create-health-record.dto';
import { UpdateHealthRecordDto } from '../models/update-health-record.dto';
import { HealthRecord } from '../models/health-record.model';

@Injectable({ providedIn: 'root' })
export class HealthRecordApi extends BaseApi {
  private readonly _endpoint = '/health-records';

  async getAnimalInformation(userId: number): Promise<HealthRecord[]> {
    return this.get<HealthRecord[]>(this._endpoint + `?userId=${userId}`);
  }

  async createHealthRecord(dto: CreateHealthRecordDto): Promise<HealthRecord> {
    return this.post<HealthRecord>(this._endpoint, dto);
  }

  async getHealthRecordById(id: number): Promise<HealthRecord> {
    return this.get<HealthRecord>(`${this._endpoint}/${id}`);
  }

  async getAllHealthRecords(): Promise<HealthRecord[]> {
    return this.get<HealthRecord[]>(this._endpoint);
  }

  async updateHealthRecord(id: number, dto: UpdateHealthRecordDto): Promise<HealthRecord> {
    return this.patch<HealthRecord>(`${this._endpoint}/${id}`, dto);
  }

  async deleteHealthRecord(id: number): Promise<void> {
    return this.delete(`${this._endpoint}/${id}`);
  }

  async uploadPhoto(id: number, file: File): Promise<HealthRecord> {
    const formData = new FormData();
    formData.append('file', file);
    try {
      return await this.postFormData<HealthRecord>(`${this._endpoint}/${id}/photo`, formData);
    } catch (error: any) {
      if (error?.status === 0) {
        const err = new Error('FILE_TOO_LARGE') as any;
        err.status = 413;
        err.errorCode = 'FILE_TOO_LARGE';
        throw err;
      }
      throw error;
    }
  }
}
