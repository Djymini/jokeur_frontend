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
    <button z-button (click)="isOpen.set(true)" class="add-animal-btn">
      <span class="material-icons">add</span>
      <span class="btn-text">Ajouter un animal</span>
    </button>

    <z-dynamic-form-modal
      #modal
      [isOpen]="isOpen()"
      formId="animal.create"
      [metadata]="metadata()"
      (closed)="isOpen.set(false)"
      (submitted)="onSubmit($event)"
    />
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .add-animal-btn {
      display: inline-flex !important;
      align-items: center !important;
      gap: 8px !important;

      @media (max-width: 768px) {
        padding: 0 16px !important;
      }

      @media (max-width: 480px) {
        width: 40px !important;
        height: 40px !important;
        padding: 0 !important;
        border-radius: 50% !important;
        justify-content: center;

        .btn-text {
          display: none;
        }

        .material-icons {
          margin: 0;
          font-size: 1.25rem;
        }
      }
    }
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
      toast.success('Carnet de santé créé avec succès');
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
