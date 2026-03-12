import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormComponent } from '@/shared/components/forms/dynamic-form/dynamic-form.component';
import { FormDefinition } from '@/shared/models/forms/form-definition.model';
import { Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

const makeDefinition = (overrides: Partial<FormDefinition> = {}): FormDefinition => ({
  id: 'test.form',
  title: 'Test',
  submitLabel: 'Soumettre',
  cancelLabel: 'Annuler',
  fields: [],
  ...overrides,
});

describe('DynamicFormComponent', () => {
  let fixture: ComponentFixture<DynamicFormComponent>;
  let component: DynamicFormComponent;

  const render = (definition: FormDefinition) => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('definition', definition);
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DynamicFormComponent],
    });
  });

  describe('onSubmit', () => {
    it('should not emit submitted when form is invalid', () => {
      render(makeDefinition({
        fields: [{ key: 'name', label: 'Nom', type: 'text', validators: [Validators.required] }],
      }));

      const spy = jest.fn();
      component.submitted.subscribe(spy);

      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);
      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should mark all controls as touched when form is invalid', () => {
      render(makeDefinition({
        fields: [{ key: 'name', label: 'Nom', type: 'text', validators: [Validators.required] }],
      }));

      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);
      fixture.detectChanges();

      const control = (component as any).formGroup().get('name');
      expect(control.touched).toBe(true);
    });

    it('should emit submitted with payload when form is valid', () => {
      render(makeDefinition({
        fields: [{ key: 'name', label: 'Nom', type: 'text' }],
      }));

      const spy = jest.fn();
      component.submitted.subscribe(spy);

      (component as any).formGroup().get('name').setValue('Rex');

      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith({ name: 'Rex' });
    });
  });

  describe('onCancel', () => {
    it('should emit cancelled when cancel button is clicked', () => {
      render(makeDefinition());

      const spy = jest.fn();
      component.cancelled.subscribe(spy);

      const cancelButton = fixture.debugElement.query(By.css('button[type="button"]'));
      cancelButton.triggerEventHandler('click', null);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('setServerError', () => {
    it('should mark the control as touched and set serverError', () => {
      render(makeDefinition({
        fields: [{ key: 'tattooNumber', label: 'Tatouage', type: 'text' }],
      }));

      component.setServerError('tattooNumber', 'Ce numéro est déjà utilisé.');
      fixture.detectChanges();

      const control = (component as any).formGroup().get('tattooNumber');
      expect(control.touched).toBe(true);
      expect(control.errors).toEqual({ serverError: 'Ce numéro est déjà utilisé.' });
    });

    it('should clear serverError when control value changes', () => {
      render(makeDefinition({
        fields: [{ key: 'tattooNumber', label: 'Tatouage', type: 'text' }],
      }));

      component.setServerError('tattooNumber', 'Ce numéro est déjà utilisé.');
      fixture.detectChanges();

      const control = (component as any).formGroup().get('tattooNumber');
      control.setValue('NEW123');
      fixture.detectChanges();

      expect(control.errors).toBeNull();
    });

    it('should do nothing when fieldKey does not exist', () => {
      render(makeDefinition());
      expect(() => component.setServerError('unknown', 'erreur')).not.toThrow();
    });
  });

  describe('isInvalid', () => {
    it('should return false when control is pristine and untouched', () => {
      render(makeDefinition({
        fields: [{ key: 'name', label: 'Nom', type: 'text', validators: [Validators.required] }],
      }));

      expect((component as any).isInvalid('name')).toBe(false);
    });

    it('should return true when control is touched and invalid', () => {
      render(makeDefinition({
        fields: [{ key: 'name', label: 'Nom', type: 'text', validators: [Validators.required] }],
      }));

      const control = (component as any).formGroup().get('name');
      control.markAsTouched();
      expect((component as any).isInvalid('name')).toBe(true);
    });
  });
});
