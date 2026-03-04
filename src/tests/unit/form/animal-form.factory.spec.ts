import { AnimalFormFactory } from '@/features/health-records/factories/animal-form.factory';

describe('AnimalFormFactory', () => {
  let factory: AnimalFormFactory;

  beforeEach(() => {
    factory = new AnimalFormFactory();
  });

  describe('getDefinitions', () => {
    it('should return 2 form definitions', () => {
      const definitions = factory.getDefinitions();
      expect(definitions).toHaveLength(2);
    });

    it('should have create and edit forms', () => {
      const definitions = factory.getDefinitions();

      const createForm = definitions.find(d => d.id === 'animal.create');
      const editForm = definitions.find(d => d.id === 'animal.edit');

      expect(createForm).toBeTruthy();
      expect(editForm).toBeTruthy();
    });

    it('should have correct titles for create form', () => {
      const definitions = factory.getDefinitions();
      const createForm = definitions.find(d => d.id === 'animal.create');

      expect(createForm?.title).toBe('Ajouter un animal');
      expect(createForm?.submitLabel).toBe('Ajouter');
      expect(createForm?.cancelLabel).toBe('Annuler');
    });

    it('should have correct titles for edit form', () => {
      const definitions = factory.getDefinitions();
      const editForm = definitions.find(d => d.id === 'animal.edit');

      expect(editForm?.title).toBe('Modifier les informations');
      expect(editForm?.submitLabel).toBe('Modifier');
      expect(editForm?.cancelLabel).toBe('Annuler');
    });

    it('should have all required fields', () => {
      const definitions = factory.getDefinitions();
      const createForm = definitions[0];

      const fieldKeys = createForm.fields.map(f => f.key);

      expect(fieldKeys).toContain('petName');
      expect(fieldKeys).toContain('animalType');
      expect(fieldKeys).toContain('breed');
      expect(fieldKeys).toContain('sex');
      expect(fieldKeys).toContain('birthDate');
      expect(fieldKeys).toContain('currentWeight');
      expect(fieldKeys).toContain('color');
      expect(fieldKeys).toContain('identificationNumber');
      expect(fieldKeys).toContain('tattooNumber');
      expect(fieldKeys).toContain('allergy');
    });

    it('should have correct field types', () => {
      const definitions = factory.getDefinitions();
      const fields = definitions[0].fields;

      expect(fields.find(f => f.key === 'petName')?.type).toBe('text');
      expect(fields.find(f => f.key === 'animalType')?.type).toBe('select');
      expect(fields.find(f => f.key === 'breed')?.type).toBe('select');
      expect(fields.find(f => f.key === 'sex')?.type).toBe('select');
      expect(fields.find(f => f.key === 'birthDate')?.type).toBe('date');
      expect(fields.find(f => f.key === 'currentWeight')?.type).toBe('number');
      expect(fields.find(f => f.key === 'color')?.type).toBe('select');
    });

    it('should have validators on required fields', () => {
      const definitions = factory.getDefinitions();
      const fields = definitions[0].fields;

      const petNameField = fields.find(f => f.key === 'petName');
      const animalTypeField = fields.find(f => f.key === 'animalType');
      const sexField = fields.find(f => f.key === 'sex');
      const weightField = fields.find(f => f.key === 'currentWeight');

      expect(petNameField?.validators).toBeDefined();
      expect(petNameField?.validators?.length).toBeGreaterThan(0);

      expect(animalTypeField?.validators).toBeDefined();
      expect(animalTypeField?.validators?.length).toBeGreaterThan(0);

      expect(sexField?.validators).toBeDefined();
      expect(sexField?.validators?.length).toBeGreaterThan(0);

      expect(weightField?.validators).toBeDefined();
      expect(weightField?.validators?.length).toBeGreaterThan(0);
    });

    it('should have correct select sources', () => {
      const definitions = factory.getDefinitions();
      const fields = definitions[0].fields;

      const animalTypeField = fields.find(f => f.key === 'animalType');
      const breedField = fields.find(f => f.key === 'breed');
      const sexField = fields.find(f => f.key === 'sex');

      expect(animalTypeField?.selectSource).toEqual({ kind: 'metadata', key: 'animalTypes' });
      expect(breedField?.selectSource).toEqual({ kind: 'metadataBy', key: 'breedsByAnimalType', dependsOn: 'animalType' });
      expect(sexField?.selectSource).toEqual({ kind: 'metadata', key: 'sexes' });
    });
  });
});
