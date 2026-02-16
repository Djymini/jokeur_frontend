import { Injectable } from '@angular/core';
import { BaseApi } from '@/internal-shared/services/base.api';
import { CreateHealthRecordDto } from '../models/create-health-record.dto';
import { HealthRecord } from '../models/health-record.model';

@Injectable({ providedIn: 'root' })
export class HealthRecordApi extends BaseApi {
  private readonly _endpoint = '/health-records';

  async createHealthRecord(dto: CreateHealthRecordDto): Promise<HealthRecord> {
    return this.post<HealthRecord>(this._endpoint, dto);
  }

  async getHealthRecordById(id: number): Promise<HealthRecord> {
    return this.get<HealthRecord>(`${this._endpoint}/${id}`);
  }

  async getAllHealthRecords(): Promise<HealthRecord[]> {
    return this.get<HealthRecord[]>(this._endpoint);
  }

  async getHealthRecordsByOwner(ownerId: number): Promise<HealthRecord[]> {
    return this.get<HealthRecord[]>(`${this._endpoint}/owner/${ownerId}`);
  }

  async deleteHealthRecord(healthRecordNumber: number): Promise<void> {
    return this.delete(`${this._endpoint}/${healthRecordNumber}`);
  }
}
