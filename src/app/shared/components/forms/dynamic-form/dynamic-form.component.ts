import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { FormDefinition } from '@/shared/models/forms/form-definition.model';
import { FormField, SelectOption } from '@/shared/models/forms/form-field.model';
import { HealthRecordFormMetadata } from '@/features/health-records/services/health-record-metadata.api';
import { applyBreedDependencyRule } from '@/features/health-records/utils/breed-dependency.utils';
import { resolveSelectOptions } from '@/shared/utils/forms/select-options.utils';
import { buildDynamicForm } from '@/shared/utils/forms/form-utils';
import { getFieldErrorMessage } from '@/shared/utils/forms/field-error-message';
import { take } from 'rxjs';



type FormPayload = Record<string, unknown>;

@Component({
  selector: 'z-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ZardButtonComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  protected readonly serverErrors = signal<Record<string, string>>({});
  protected readonly isDragging = signal<Record<string, boolean>>({});
  protected readonly fileNames = signal<Record<string, string>>({});

  readonly definition = input.required<FormDefinition>();
  readonly metadata = input<HealthRecordFormMetadata | null>(null);

  readonly cancelled = output<void>();
  readonly submitted = output<FormPayload>();

  protected readonly fields = computed<FormField[]>(() =>
    this.definition().fields ?? []
  );

  protected readonly formGroup = signal<FormGroup>(
    this.formBuilder.group({})
  );

  protected readonly debugPayload = signal<FormPayload | null>(null);

  constructor() {
    effect(() => {
      const form = buildDynamicForm(this.formBuilder, this.fields());
      this.formGroup.set(form);
    });

    effect(() => {
      applyBreedDependencyRule(this.formGroup(), this.metadata());
    });
  }

  protected onFileSelected(field: FormField, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.item(0) ?? null;

    const control = this.formGroup().get(field.key);
    control?.setValue(selectedFile);
    control?.markAsDirty();
  }

  protected isInvalid(key: string): boolean {
    const ctrl = this.formGroup().get(key);
    return !!(ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty));
  }

  protected onCancel(): void {
    this.cancelled.emit();
  }

  protected onSubmit(): void {
    const form = this.formGroup();

    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    const payload: FormPayload = form.getRawValue();
    this.submitted.emit(payload);
  }

  protected getSelectOptions(field: FormField): SelectOption[] {
    return resolveSelectOptions(field, this.formGroup(), this.metadata());
  }

  protected onDragOver(field: FormField, event: DragEvent): void {
    event.preventDefault();
    this.isDragging.update(d => ({ ...d, [field.key]: true }));
  }

  protected onDragLeave(field: FormField): void {
    this.isDragging.update(d => ({ ...d, [field.key]: false }));
  }

  protected onDrop(field: FormField, event: DragEvent): void {
    event.preventDefault();
    this.isDragging.update(d => ({ ...d, [field.key]: false }));

    const file = event.dataTransfer?.files?.item(0) ?? null;
    if (!file) return;

    this.fileNames.update(names => ({ ...names, [field.key]: file.name }));
    const control = this.formGroup().get(field.key);
    control?.setValue(file);
    control?.markAsDirty();
  }

  protected getErrorMessage(field: FormField): string {
    const control = this.formGroup().get(field.key);
    return getFieldErrorMessage(control, field.label);
  }

  public setServerError(fieldKey: string, message: string): void {
    const control = this.formGroup().get(fieldKey);
    if (!control) return;

    control.markAsTouched();
    control.setErrors({ serverError: message });
    this.serverErrors.update(errors => ({ ...errors, [fieldKey]: message }));

    control.valueChanges.pipe(take(1)).subscribe(() => {
      const currentErrors = { ...control.errors };
      delete currentErrors['serverError'];
      control.setErrors(Object.keys(currentErrors).length ? currentErrors : null);
      this.serverErrors.update(errors => {
        const next = { ...errors };
        delete next[fieldKey];
        return next;
      });
    });
  }
}
