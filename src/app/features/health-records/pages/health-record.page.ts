import { Component, inject, signal, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HealthRecordFacade } from '@/features/health-records/services/health-record.facade';
import { HealthRecordHeaderComponent } from '@/features/health-records/components/health-record-header.component/health-record-header.component';
import { HealthRecordSectionComponent } from '@/features/health-records/components/health-record-section.component/health-record-section.component';
import { ZardButtonComponent } from '@/shared/components/button';
import { DynamicFormModalComponent } from '@/shared/components/forms/dynamic-form-modal/dynamic-form-modal.component';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { HealthRecordFormBootstrapService } from '@/features/health-records/services/health-record-form-bootstrap.service';
import { DashboardStore } from '@/features/dashboard/store/dashboard-store';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-health-record.page',
  imports: [
    HealthRecordHeaderComponent,
    HealthRecordSectionComponent,
    ZardButtonComponent,
    DynamicFormModalComponent,
  ],
  template: `
    <div class="button-container">
      <z-button z-button zSize="lg" zType="link" (click)="returnToDashboard()">
        <span class="material-icons cursor-pointer">arrow_back</span>
        Retour à mon tableau de bord
      </z-button>
    </div>
    <app-health-record-header [healthRecord]="healthRecord" (editClicked)="isEditOpen.set(true)" />
    <app-health-record-section [healthRecord]="healthRecord" />

    <z-dynamic-form-modal
      #editModal
      [isOpen]="isEditOpen()"
      formId="animal.edit"
      [metadata]="dashboardStore.metadata()"
      [initialValues]="editInitialValues"
      (closed)="isEditOpen.set(false)"
      (submitted)="onEditSubmit($event)"
    />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 48px;
    }
    .button-container {
      width: 100%;
      margin-bottom: 32px;
    }
    button {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: bold;
    }
    button span {
      font-weight: bold;
    }
  `,
})
export default class HealthRecordPage {
  private readonly route = inject(ActivatedRoute);
  private readonly healthRecordFacade = inject(HealthRecordFacade);
  private readonly bootstrap = inject(HealthRecordFormBootstrapService);
  protected readonly dashboardStore = inject(DashboardStore);

  readonly editModal = viewChild<DynamicFormModalComponent>('editModal');
  isEditOpen = signal(false);

  healthRecord: HealthRecord = this.route.snapshot.data['healthRecord'];
  protected readonly editInitialValues: Record<string, unknown>;

  constructor(private router: Router) {
    this.bootstrap.init();

    const r = this.healthRecord as unknown as Record<string, unknown>;
    const animalType = (r['animalType'] ?? r['AnimalType']) as string | undefined;

    this.editInitialValues = {
      petName: this.healthRecord.petName,
      animalType: animalType ?? null,
      breed: this.healthRecord.breed,
      sex: this.healthRecord.sex,
      birthDate: this.healthRecord.birthDate
        ? new Date(this.healthRecord.birthDate).toISOString().substring(0, 10)
        : null,
      currentWeight: this.healthRecord.currentWeight,
      color: this.healthRecord.color,
      identificationNumber: this.healthRecord.identificationNumber ?? null,
      tattooNumber: this.healthRecord.tattoo ?? null,
      allergy: this.healthRecord.allergy ?? null,
    };

    if (!this.dashboardStore.metadata()) {
      this.healthRecordFacade.loadFormMetadata().then((m) => {
        this.dashboardStore.metadata.set(m);
      });
    }
  }

  returnToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  async onEditSubmit(payload: Record<string, unknown>): Promise<void> {
    try {
      await this.healthRecordFacade.updateFromFormPayload(payload, this.healthRecord.id);
      this.isEditOpen.set(false);
      toast.success('Données modifiées avec succès');
    } catch (error: any) {
      if (error?.status === 409) {
        this.editModal()?.handleServerError(error);
      } else {
        console.error(error);
      }
    }
  }
}
