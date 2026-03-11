import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { HealthRecordExportApi } from '@/features/health-record-export/services/health-record-export.api';
import { HealthRecordExportRequest } from '@/features/health-record-export/models/health-record-export.model';
import { MeasureType } from '@/features/measures/utils/measureTypeEnum';

describe('HealthRecordExportApi (integration)', () => {
  let api: HealthRecordExportApi;
  let http: HttpTestingController;

  const exportRequest: HealthRecordExportRequest = {
    from: '2024-01-01',
    to: '2024-12-31',
    measureTypes: [MeasureType.WEIGHT],
    includeVaccines: false,
    format: 'PDF',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        HealthRecordExportApi,
      ],
    });

    api = TestBed.inject(HealthRecordExportApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should POST to /health-records/:id/export/pdf and return a Blob', async () => {
    const healthRecordId = 42;
    const mockPdfBytes = new Uint8Array([37, 80, 68, 70]);
    const mockBlob = new Blob([mockPdfBytes], { type: 'application/pdf' });

    const promise = api.exportPdf(healthRecordId, exportRequest);

    const req = http.expectOne((request) =>
      request.url.endsWith(`health-records/${healthRecordId}/export/pdf`)
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(exportRequest);
    req.flush(mockBlob, { headers: { 'Content-Type': 'application/pdf' } });

    const result = await promise;
    expect(result).toBeInstanceOf(Blob);
  });

  it('should POST to /health-records/:id/export/xlsx and return a Blob', async () => {
    const healthRecordId = 42;
    const xlsxRequest: HealthRecordExportRequest = { ...exportRequest, format: 'XLSX' };
    const mockBlob = new Blob([new Uint8Array([80, 75])], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const promise = api.exportXlsx(healthRecordId, xlsxRequest);

    const req = http.expectOne((request) =>
      request.url.endsWith(`health-records/${healthRecordId}/export/xlsx`)
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(xlsxRequest);
    req.flush(mockBlob, {
      headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    });

    const result = await promise;
    expect(result).toBeInstanceOf(Blob);
  });

  it('should send the correct healthRecordId in the URL', async () => {
    const healthRecordId = 99;

    const promise = api.exportPdf(healthRecordId, exportRequest);

    const req = http.expectOne((request) =>
      request.url.includes(`health-records/${healthRecordId}/export/pdf`)
    );
    req.flush(new Blob());
    await promise;

    expect(req.request.url).toContain(`health-records/99/export/pdf`);
  });
});
