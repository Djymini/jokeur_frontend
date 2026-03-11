import { TestBed } from '@angular/core/testing';
import { FormRegistryService } from '@/shared/services/forms/form-registry.service';
import { AnimalFormFactory } from '@/features/health-records/factories/animal-form.factory';
import { HealthRecordExportFormFactory } from '@/features/health-record-export/factories/health-record-export-form.factory';
import {
  HealthRecordFormBootstrapService
} from '@/features/health-records/services/health-record-form-bootstrap.service';

describe('HealthRecordFormBootstrapService', () => {
  let service: HealthRecordFormBootstrapService;
  let registry: FormRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HealthRecordFormBootstrapService,
        FormRegistryService,
        AnimalFormFactory,
        HealthRecordExportFormFactory,
      ],
    });
    service = TestBed.inject(HealthRecordFormBootstrapService);
    registry = TestBed.inject(FormRegistryService);
  });

  it('should register all form definitions on init', () => {
    service.init();
    expect(registry.has('animal.create')).toBe(true);
    expect(registry.has('animal.edit')).toBe(true);
    expect(registry.has('health-record.export')).toBe(true);
  });

  it('should not throw when called twice', () => {
    expect(() => {
      service.init();
      service.init();
    }).not.toThrow();
  });

  it('should not register definitions a second time when init is called twice', () => {
    service.init();
    service.init();
    expect(registry.has('animal.create')).toBe(true);
  });
});
