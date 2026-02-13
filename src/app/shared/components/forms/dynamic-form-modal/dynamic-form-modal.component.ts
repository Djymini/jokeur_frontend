import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegistryService } from '@/shared/services/forms/form-registry.service';
import { FormDefinition } from '@/shared/models/forms/form-definition.model';
import { HealthRecordFormMetadata } from '@/features/health-record/services/health-record-metadata.api';
import { DynamicFormComponent } from '@/shared/components/forms/dynamic-form/dynamic-form.component';

type FormPayload = Record<string, unknown>;

@Component({
  selector: 'z-dynamic-form-modal',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './dynamic-form-modal.component.html',
  styleUrl: './dynamic-form-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormModalComponent {
  private readonly formRegistry = inject(FormRegistryService);

  readonly formId = input.required<string>();
  readonly isOpen = input(true);
  readonly metadata = input<HealthRecordFormMetadata | null>(null);

  readonly closed = output<void>();
  readonly submitted = output<FormPayload>();

  protected readonly definition = computed<FormDefinition>(() =>
    this.formRegistry.getOrThrow(this.formId())
  );

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.isOpen()) this.closed.emit();
  }

  protected onOverlayMouseDown(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.card')) {
      this.closed.emit();
    }
  }

  protected onOverlayKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.closed.emit();
    }
  }

  protected onFormCancelled(): void {
    this.closed.emit();
  }

  protected onFormSubmitted(payload: FormPayload): void {
    this.submitted.emit(payload);
  }
}
