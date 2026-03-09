import { Component, inject, signal } from '@angular/core';
import { DynamicFormModalComponent } from '@/shared/components/forms/dynamic-form-modal/dynamic-form-modal.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { HealthRecordFacade } from '@/features/health-records/services/health-record.facade';
import { HealthRecordFormMetadata } from '@/features/health-records/services/health-record-metadata.api';
import { AuthService } from '@/core/services/auth.service';

@Component({
  standalone: true,
  imports: [DynamicFormModalComponent, ZardButtonComponent],
  template: `
    <button z-button (click)="isOpen.set(true)">Ajouter un animal</button>

    <z-dynamic-form-modal
      [isOpen]="isOpen()"
      formId="animal.create"
      [metadata]="metadata()"
      (closed)="isOpen.set(false)"
      (submitted)="onSubmit($event)"
    />
  `,
})
export default class HealthRecordFormPage {
  private readonly _facade = inject(HealthRecordFacade);
  protected readonly _user = inject(AuthService).user;

  protected readonly isOpen = signal(false);
  protected readonly metadata = signal<HealthRecordFormMetadata | null>(null);

  constructor() {
    this._facade.loadFormMetadata().then((m) => this.metadata.set(m));
  }

  protected async onSubmit(payload: Record<string, unknown>): Promise<void> {
    try {
      await this._facade.createFromFormPayload(payload, this._user()!.id);
      this.isOpen.set(false);
    } catch (error: any) {
      console.error(error);
    }
  }
}
