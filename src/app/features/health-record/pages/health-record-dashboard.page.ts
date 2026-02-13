import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicFormModalComponent } from '@/shared/components/forms/dynamic-form-modal/dynamic-form-modal.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { HealthRecordFacade } from '@/features/health-record/services/health-record.facade';
import { HealthRecordFormBootstrapService } from '@/features/health-record/services/health-record-form-bootstrap.service';
import { HealthRecordFormMetadata } from '@/features/health-record/services/health-record-metadata.api';

@Component({
  standalone: true,
  imports: [CommonModule, DynamicFormModalComponent, ZardButtonComponent],
  template: `
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <button z-button zType="default" (click)="openCreateAnimalModal()">
        Ajouter un animal
      </button>
    </div>

    @if (errorMessage()) {
      <div style="padding: 12px; background: #fee; border: 1px solid #fcc; border-radius: 8px; color: #c00; margin-top: 12px;">
        ⚠️ {{ errorMessage() }}
      </div>
    }

    <z-dynamic-form-modal
      [isOpen]="isCreateAnimalOpen()"
      formId="animal.create"
      [metadata]="metadata()"
      (closed)="onCloseModal()"
      (submitted)="onCreateAnimalSubmitted($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HealthRecordDashboardPage {
  private readonly _healthRecordFacade = inject(HealthRecordFacade);
  private readonly _formsBootstrap = inject(HealthRecordFormBootstrapService);

  protected readonly isCreateAnimalOpen = signal(false);
  protected readonly metadata = signal<HealthRecordFormMetadata | null>(null);
  protected readonly errorMessage = signal<string | null>(null);

  constructor() {
    this._formsBootstrap.init();
    void this.loadMetadata();
  }

  private async loadMetadata(): Promise<void> {
    try {
      const metadata = await this._healthRecordFacade.loadFormMetadata();
      this.metadata.set(metadata);
    } catch (error) {
      console.error('[FORM METADATA] failed:', error);
      this.metadata.set(null);
      this.errorMessage.set('Impossible de charger les données du formulaire');
    }
  }

  protected openCreateAnimalModal(): void {
    this.isCreateAnimalOpen.set(true);
    this.errorMessage.set(null);
  }

  protected onCloseModal(): void {
    this.isCreateAnimalOpen.set(false);
    this.errorMessage.set(null);
  }

  protected async onCreateAnimalSubmitted(payload: Record<string, unknown>): Promise<void> {
    this.errorMessage.set(null);

    try {
      const simulatedOwnerId = 1;
      const response = await this._healthRecordFacade.createFromFormPayload(payload, simulatedOwnerId);
      console.log('[CREATE HEALTH RECORD] response:', response);
      this.isCreateAnimalOpen.set(false);
    } catch (error) {
      console.error('[CREATE HEALTH RECORD] error:', error);

      if (error instanceof Error) {
        this.errorMessage.set(error.message);
      } else {
        this.errorMessage.set('Une erreur inattendue est survenue');
      }
    }
  }
}
