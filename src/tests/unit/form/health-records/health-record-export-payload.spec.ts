import { MeasureType } from '@/features/measures/utils/measureTypeEnum';

const MEASURE_TYPE_VALUES = new Set<string>(Object.keys(MeasureType).filter((key) => isNaN(Number(key))));

function buildExportRequest(payload: Record<string, unknown>) {
  const format = payload['format'] as string;
  const measureTypes = Object.keys(payload).filter(
    (key) => MEASURE_TYPE_VALUES.has(key) && payload[key] === true,
  ) as unknown as MeasureType[];

  return {
    from: payload['from'] as string,
    to: payload['to'] as string,
    measureTypes,
    includeVaccines: payload['includeVaccines'] === true,
    format,
  };
}

describe('onExportSubmit — payload reconstruction (unit tests)', () => {
  it('should extract format from payload', () => {
    const payload = { format: 'PDF', from: '2024-01-01', to: '2024-12-31' };
    const result = buildExportRequest(payload);
    expect(result.format).toBe('PDF');
  });

  it('should extract from and to dates', () => {
    const payload = { format: 'XLSX', from: '2024-03-01', to: '2024-06-30' };
    const result = buildExportRequest(payload);
    expect(result.from).toBe('2024-03-01');
    expect(result.to).toBe('2024-06-30');
  });

  it('should include measureTypes whose value is true', () => {
    const payload = {
      format: 'PDF',
      from: '2024-01-01',
      to: '2024-12-31',
      WEIGHT: true,
      BPM: true,
      TEMPERATURE: false,
      RESPIRATORY_RATE: false,
    };
    const result = buildExportRequest(payload);
    expect(result.measureTypes).toContain('WEIGHT');
    expect(result.measureTypes).toContain('BPM');
    expect(result.measureTypes).not.toContain('TEMPERATURE');
    expect(result.measureTypes).not.toContain('RESPIRATORY_RATE');
  });

  it('should return empty measureTypes when none are checked', () => {
    const payload = {
      format: 'PDF',
      from: '2024-01-01',
      to: '2024-12-31',
      WEIGHT: false,
      BPM: false,
    };
    const result = buildExportRequest(payload);
    expect(result.measureTypes.length).toBe(0);
  });

  it('should set includeVaccines to true when payload value is true', () => {
    const payload = { format: 'PDF', from: '2024-01-01', to: '2024-12-31', includeVaccines: true };
    const result = buildExportRequest(payload);
    expect(result.includeVaccines).toBe(true);
  });

  it('should set includeVaccines to false when payload value is false', () => {
    const payload = { format: 'PDF', from: '2024-01-01', to: '2024-12-31', includeVaccines: false };
    const result = buildExportRequest(payload);
    expect(result.includeVaccines).toBe(false);
  });

  it('should not include non-MeasureType keys in measureTypes', () => {
    const payload = {
      format: 'PDF',
      from: '2024-01-01',
      to: '2024-12-31',
      includeVaccines: true,
      WEIGHT: true,
    };
    const result = buildExportRequest(payload);
    expect(result.measureTypes).not.toContain('format');
    expect(result.measureTypes).not.toContain('from');
    expect(result.measureTypes).not.toContain('to');
    expect(result.measureTypes).not.toContain('includeVaccines');
  });
});
