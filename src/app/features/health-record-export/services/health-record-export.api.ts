import { Injectable } from '@angular/core';
import { BaseApi } from '@/internal-shared/services/base.api';
import { HealthRecordExportRequest } from '@/features/health-record-export/models/health-record-export.model';

@Injectable({ providedIn: 'root' })
export class HealthRecordExportApi extends BaseApi {
  private readonly _endpoint = '/health-records';

  async exportPdf(healthRecordId: number, request: HealthRecordExportRequest): Promise<Blob> {
    return this.postBlob(`${this._endpoint}/${healthRecordId}/export/pdf`, request);
  }
}
