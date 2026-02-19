import { Injectable, inject } from '@angular/core';
import { FormRegistryService } from '@/shared/services/forms/form-registry.service';
import { AnimalFormFactory } from '@/features/health-records/factories/animal-form.factory';

@Injectable({ providedIn: 'root' })
export class HealthRecordFormBootstrapService {
  private readonly _registry = inject(FormRegistryService);
  private readonly _factory = inject(AnimalFormFactory);

  private _initialized = false;

  init(): void {
    if (this._initialized) return;
    this._initialized = true;

    const definitions = this._factory.getDefinitions();

    for (const definition of definitions) {
      if (!this._registry.has(definition.id)) {
        this._registry.register(definition);
      }
    }
  }
}
