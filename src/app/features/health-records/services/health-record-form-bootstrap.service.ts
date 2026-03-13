import { Injectable, inject } from '@angular/core';
import { FormRegistryService } from '@/shared/services/forms/form-registry.service';
import { AnimalFormFactory } from '@/features/health-records/factories/animal-form.factory';
import { HealthRecordExportFormFactory } from '@/features/health-record-export/factories/health-record-export-form.factory';

@Injectable({ providedIn: 'root' })
export class HealthRecordFormBootstrapService {
  private readonly _registry = inject(FormRegistryService);
  private readonly _animalFactory = inject(AnimalFormFactory);
  private readonly _exportFactory = inject(HealthRecordExportFormFactory);

  private _initialized = false;

  init(): void {
    if (this._initialized) return;
    this._initialized = true;

    const definitions = [
      ...this._animalFactory.getDefinitions(),
      ...this._exportFactory.getDefinitions(),
    ];

    for (const definition of definitions) {
      if (!this._registry.has(definition.id)) {
        this._registry.register(definition);
      }
    }
  }
}
