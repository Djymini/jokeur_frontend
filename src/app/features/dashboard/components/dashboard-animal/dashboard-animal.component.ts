import { Component, inject, signal, viewChild } from '@angular/core';
import { DynamicFormModalComponent } from '@/shared/components/forms/dynamic-form-modal/dynamic-form-modal.component';
import { RouterLink } from '@angular/router';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';
import { HealthRecordFormMetadata } from '@/features/health-records/services/health-record-metadata.api';
import { HealthRecordFacade } from '@/features/health-records/services/health-record.facade';
import { DashboardStore } from '@/features/dashboard/store/dashboard-store';

@Component({
  selector: 'app-dashboard-animal',
  imports: [DynamicFormModalComponent, RouterLink, ZardButtonComponent, ZardIconComponent],
  templateUrl: './dashboard-animal.component.html',
  styleUrl: './dashboard-animal.component.scss',
})
export class DashboardAnimalComponent {
  animalTypeMap: Record<string, string> = {
    CAT: 'Chat',
    DOG: 'Chien',
  };

  readonly modalRef = viewChild(DynamicFormModalComponent);
  private readonly _facade = inject(HealthRecordFacade);
  protected readonly dashboardStore = inject(DashboardStore);
  isOpen = signal(false);
  metadata = signal<HealthRecordFormMetadata | null>(null);

  async onSubmit(payload: Record<string, unknown>): Promise<void> {
    try {
      const newAnimal = await this._facade.createFromFormPayload(payload, 1);
      this.dashboardStore.animals.update((list) => [...list, newAnimal]);
      this.isOpen.set(false);
    } catch (error: any) {
      console.log('catch error:', error, 'status:', error?.status, 'errorCode:', error?.errorCode);
      if (error?.status === 409) {
        this.modalRef()?.handleServerError(error);
      } else {
        console.error(error);
      }
    }
  }
}
