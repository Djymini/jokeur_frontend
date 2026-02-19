import { Injectable } from '@angular/core';
import { FormDefinition } from '@/shared/models/forms/form-definition.model';

@Injectable({ providedIn: 'root' })
export class FormRegistryService {
  private readonly definitions = new Map<string, FormDefinition>();

  has(id: string): boolean {
    return this.definitions.has(id);
  }

  register(definition: FormDefinition): void {
    const id = definition.id?.trim();
    if (!id) throw new Error('FormDefinition.id is required');

    if (this.definitions.has(id)) {
      throw new Error(`FormDefinition already registered for id="${id}"`);
    }

    this.definitions.set(id, definition);
  }

  getOrThrow(formId: string): FormDefinition {
    const id = formId?.trim();
    if (!id) throw new Error('formId is required');

    const definition = this.definitions.get(id);
    if (!definition) throw new Error(`FormDefinition not found for id="${id}"`);
    return definition;
  }
}
