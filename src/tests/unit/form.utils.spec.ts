import { FormBuilder, Validators } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { buildDynamicForm } from '../../app/shared/utils/forms/form-utils';
import { FormField } from '../../app/shared/models/forms/form-field.model';

describe('buildDynamicForm', () => {
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create a form group with correct controls', () => {
    const fields: FormField[] = [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'age', label: 'Age', type: 'number' }
    ];

    const form = buildDynamicForm(formBuilder, fields);

    expect(form.get('name')).toBeTruthy();
    expect(form.get('age')).toBeTruthy();
  });

  it('should set initial value to empty string for text fields', () => {
    const fields: FormField[] = [
      { key: 'name', label: 'Name', type: 'text' }
    ];

    const form = buildDynamicForm(formBuilder, fields);

    expect(form.get('name')?.value).toBe('');
  });

  it('should set initial value to null for number fields', () => {
    const fields: FormField[] = [
      { key: 'age', label: 'Age', type: 'number' }
    ];

    const form = buildDynamicForm(formBuilder, fields);

    expect(form.get('age')?.value).toBeNull();
  });

  it('should set initial value to null for date fields', () => {
    const fields: FormField[] = [
      { key: 'birthDate', label: 'Birth Date', type: 'date' }
    ];

    const form = buildDynamicForm(formBuilder, fields);

    expect(form.get('birthDate')?.value).toBeNull();
  });

  it('should set initial value to null for file fields', () => {
    const fields: FormField[] = [
      { key: 'avatar', label: 'Avatar', type: 'file' }
    ];

    const form = buildDynamicForm(formBuilder, fields);

    expect(form.get('avatar')?.value).toBeNull();
  });

  it('should set initial value to empty string for textarea fields', () => {
    const fields: FormField[] = [
      { key: 'description', label: 'Description', type: 'textarea' }
    ];

    const form = buildDynamicForm(formBuilder, fields);

    expect(form.get('description')?.value).toBe('');
  });

  it('should set initial value to empty string for select fields', () => {
    const fields: FormField[] = [
      { key: 'country', label: 'Country', type: 'select' }
    ];

    const form = buildDynamicForm(formBuilder, fields);

    expect(form.get('country')?.value).toBe('');
  });

  it('should disable readonly fields', () => {
    const fields: FormField[] = [
      { key: 'name', label: 'Name', type: 'text', readonly: true }
    ];

    const form = buildDynamicForm(formBuilder, fields);

    expect(form.get('name')?.disabled).toBe(true);
  });

  it('should not disable non-readonly fields', () => {
    const fields: FormField[] = [
      { key: 'name', label: 'Name', type: 'text', readonly: false }
    ];

    const form = buildDynamicForm(formBuilder, fields);

    expect(form.get('name')?.enabled).toBe(true);
  });

  it('should apply validators when provided', () => {
    const fields: FormField[] = [
      {
        key: 'name',
        label: 'Name',
        type: 'text',
        validators: [Validators.required]
      }
    ];

    const form = buildDynamicForm(formBuilder, fields);
    const control = form.get('name');

    control?.setValue('');
    expect(control?.valid).toBe(false);
    expect(control?.errors).toBeTruthy();

    control?.setValue('John');
    expect(control?.valid).toBe(true);
    expect(control?.errors).toBeNull();
  });

  it('should apply multiple validators', () => {
    const fields: FormField[] = [
      {
        key: 'email',
        label: 'Email',
        type: 'text',
        validators: [Validators.required, Validators.email]
      }
    ];

    const form = buildDynamicForm(formBuilder, fields);
    const control = form.get('email');

    control?.setValue('');
    expect(control?.hasError('required')).toBe(true);

    control?.setValue('invalid');
    expect(control?.hasError('email')).toBe(true);

    control?.setValue('test@example.com');
    expect(control?.valid).toBe(true);
  });

  it('should handle fields without validators', () => {
    const fields: FormField[] = [
      { key: 'notes', label: 'Notes', type: 'textarea' }
    ];

    const form = buildDynamicForm(formBuilder, fields);
    const control = form.get('notes');

    control?.setValue('');
    expect(control?.valid).toBe(true);

    control?.setValue('Some notes');
    expect(control?.valid).toBe(true);
  });

  it('should create form with multiple fields of different types', () => {
    const fields: FormField[] = [
      { key: 'name', label: 'Name', type: 'text', validators: [Validators.required] },
      { key: 'age', label: 'Age', type: 'number', validators: [Validators.min(0)] },
      { key: 'birthDate', label: 'Birth Date', type: 'date' },
      { key: 'bio', label: 'Bio', type: 'textarea' },
      { key: 'photo', label: 'Photo', type: 'file' },
      { key: 'country', label: 'Country', type: 'select', readonly: true }
    ];

    const form = buildDynamicForm(formBuilder, fields);

    expect(form.get('name')).toBeTruthy();
    expect(form.get('age')).toBeTruthy();
    expect(form.get('birthDate')).toBeTruthy();
    expect(form.get('bio')).toBeTruthy();
    expect(form.get('photo')).toBeTruthy();
    expect(form.get('country')).toBeTruthy();

    expect(form.get('name')?.value).toBe('');
    expect(form.get('age')?.value).toBeNull();
    expect(form.get('birthDate')?.value).toBeNull();
    expect(form.get('bio')?.value).toBe('');
    expect(form.get('photo')?.value).toBeNull();
    expect(form.get('country')?.disabled).toBe(true);
  });
});
