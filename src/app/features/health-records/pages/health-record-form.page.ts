import { Component, inject, signal, viewChild } from '@angular/core';
import { DynamicFormModalComponent } from '@/shared/components/forms/dynamic-form-modal/dynamic-form-modal.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { HealthRecordFacade } from '@/features/health-records/services/health-record.facade';
import { HealthRecordFormMetadata } from '@/features/health-records/services/health-record-metadata.api';
import { AuthService } from '@/core/services/auth.service';
import { toast } from 'ngx-sonner';

@Component({
  standalone: true,
  imports: [DynamicFormModalComponent, ZardButtonComponent],
  template: `
    <button z-button (click)="isOpen.set(true)">Ajouter un animal</button>

    <z-dynamic-form-modal
      #modal
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
  private readonly _modal = viewChild<DynamicFormModalComponent>('modal');
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
      if (error?.message === 'FILE_TOO_LARGE') {
        this._modal()?.handleServerError({ errorCode: 'FILE_TOO_LARGE' });
        toast.error('Le fichier est trop volumineux (maximum 2MB).');
      } else {
        this._modal()?.handleServerError({ errorCode: error?.message });
      }
    }
  }
}
