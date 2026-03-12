import { HealthRecordExportFormFactory } from '@/features/health-record-export/factories/health-record-export-form.factory';
import { FormControl } from '@angular/forms';

describe('HealthRecordExportFormFactory', () => {
  let factory: HealthRecordExportFormFactory;

  beforeEach(() => {
    factory = new HealthRecordExportFormFactory();
  });

  it('should return 1 form definition', () => {
    expect(factory.getDefinitions()).toHaveLength(1);
  });

  it('should have correct form metadata', () => {
    const form = factory.getDefinitions()[0];
    expect(form.id).toBe('health-record.export');
    expect(form.title).toBe('Exporter la fiche santé');
    expect(form.submitLabel).toBe('Télécharger');
    expect(form.cancelLabel).toBe('Annuler');
  });

  it('should contain all expected field keys', () => {
    const keys = factory.getDefinitions()[0].fields.map(f => f.key);
    expect(keys).toContain('format');
    expect(keys).toContain('from');
    expect(keys).toContain('to');
    expect(keys).toContain('TEMPERATURE');
    expect(keys).toContain('WEIGHT');
    expect(keys).toContain('RESPIRATORY_RATE');
    expect(keys).toContain('BPM');
    expect(keys).toContain('includeVaccines');
  });

  it('should have correct field types', () => {
    const fields = factory.getDefinitions()[0].fields;
    expect(fields.find(f => f.key === 'format')?.type).toBe('radio');
    expect(fields.find(f => f.key === 'from')?.type).toBe('date');
    expect(fields.find(f => f.key === 'to')?.type).toBe('date');
    expect(fields.find(f => f.key === 'WEIGHT')?.type).toBe('checkbox');
    expect(fields.find(f => f.key === 'includeVaccines')?.type).toBe('checkbox');
  });

  it('should have PDF and XLSX radio options on format field', () => {
    const formatField = factory.getDefinitions()[0].fields.find(f => f.key === 'format');
    expect(formatField?.radioOptions).toEqual([
      { value: 'PDF', label: 'PDF' },
      { value: 'XLSX', label: 'XSLX' },
    ]);
  });

  it('should require format field', () => {
    const formatField = factory.getDefinitions()[0].fields.find(f => f.key === 'format');
    const control = new FormControl('');
    const errors = formatField?.validators?.map(v => v(control));
    expect(errors?.some(e => e?.['required'])).toBe(true);
  });

  it('should require from field', () => {
    const fromField = factory.getDefinitions()[0].fields.find(f => f.key === 'from');
    const control = new FormControl('');
    const errors = fromField?.validators?.map(v => v(control));
    expect(errors?.some(e => e?.['required'])).toBe(true);
  });

  it('should reject future date on from field', () => {
    const fromField = factory.getDefinitions()[0].fields.find(f => f.key === 'from');
    const control = new FormControl('2099-01-01');
    const errors = fromField?.validators?.map(v => v(control));
    expect(errors?.some(e => e?.['maxDate'])).toBe(true);
  });

  it('should require to field', () => {
    const toField = factory.getDefinitions()[0].fields.find(f => f.key === 'to');
    const control = new FormControl('');
    const errors = toField?.validators?.map(v => v(control));
    expect(errors?.some(e => e?.['required'])).toBe(true);
  });

  it('should reject future date on to field', () => {
    const toField = factory.getDefinitions()[0].fields.find(f => f.key === 'to');
    const control = new FormControl('2099-01-01');
    const errors = toField?.validators?.map(v => v(control));
    expect(errors?.some(e => e?.['maxDate'])).toBe(true);
  });
});
