import { TestBed } from '@angular/core/testing';
import { FormDefinition } from '@/shared/models/forms/form-definition.model';
import { FormRegistryService } from '@/shared/services/forms/form-registry.service';

const mockDefinition = (id: string): FormDefinition => ({
  id,
  title: `Form ${id}`,
  submitLabel: 'Submit',
  cancelLabel: 'Cancel',
  fields: []
});

describe('FormRegistryService', () => {
  let registry: FormRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FormRegistryService] });
    registry = TestBed.inject(FormRegistryService);
  });


  describe('register', () => {
    it('should register a form definition without throwing', () => {
      expect(() => registry.register(mockDefinition('animal.create'))).not.toThrow();
    });

    it('should register multiple definitions with different ids', () => {
      expect(() => {
        registry.register(mockDefinition('animal.create'));
        registry.register(mockDefinition('animal.edit'));
      }).not.toThrow();
    });

    it('should throw when registering a duplicate id', () => {
      registry.register(mockDefinition('animal.create'));
      expect(() => registry.register(mockDefinition('animal.create'))).toThrow(
        'FormDefinition already registered for id="animal.create"'
      );
    });

    it('should throw when definition has an empty id', () => {
      expect(() => registry.register(mockDefinition(''))).toThrow('FormDefinition.id is required');
    });

    it('should throw when definition id is only whitespace', () => {
      expect(() => registry.register(mockDefinition('   '))).toThrow('FormDefinition.id is required');
    });
  });


  describe('getOrThrow', () => {
    it('should return the definition for a registered id', () => {
      const definition = mockDefinition('animal.create');
      registry.register(definition);

      const result = registry.getOrThrow('animal.create');

      expect(result).toEqual(definition);
    });

    it('should throw for an unknown id', () => {
      expect(() => registry.getOrThrow('unknown.form')).toThrow(
        'FormDefinition not found for id="unknown.form"'
      );
    });

    it('should return the correct definition when multiple are registered', () => {
      const create = mockDefinition('animal.create');
      const edit = mockDefinition('animal.edit');
      registry.register(create);
      registry.register(edit);

      expect(registry.getOrThrow('animal.create')).toEqual(create);
      expect(registry.getOrThrow('animal.edit')).toEqual(edit);
    });

    it('should throw when formId is empty', () => {
      expect(() => registry.getOrThrow('')).toThrow('formId is required');
    });

    it('should throw when formId is only whitespace', () => {
      expect(() => registry.getOrThrow('   ')).toThrow('formId is required');
    });

    it('should tolerate whitespace around a valid id (trim)', () => {
      registry.register(mockDefinition('animal.create'));
      // getOrThrow trim le formId, donc '  animal.create  ' doit fonctionner
      expect(() => registry.getOrThrow('  animal.create  ')).not.toThrow();
    });
  });


  describe('has', () => {
    it('should return true for a registered id', () => {
      registry.register(mockDefinition('animal.create'));
      expect(registry.has('animal.create')).toBe(true);
    });

    it('should return false for an unknown id', () => {
      expect(registry.has('animal.create')).toBe(false);
    });

    it('should return false after only registering a different id', () => {
      registry.register(mockDefinition('animal.edit'));
      expect(registry.has('animal.create')).toBe(false);
    });
  });
});
