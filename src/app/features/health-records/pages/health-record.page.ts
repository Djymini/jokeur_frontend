import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HealthRecordFacade } from '@/features/health-records/services/health-record.facade';
import { HealthRecordHeaderComponent } from '@/features/health-records/components/health-record-header.component/health-record-header.component';
import { HealthRecordSectionComponent } from '@/features/health-records/components/health-record-section.component/health-record-section.component';
import { ZardButtonComponent } from '@/shared/components/button';
import { DynamicFormModalComponent } from '@/shared/components/forms/dynamic-form-modal/dynamic-form-modal.component';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { DashboardStore } from '@/features/dashboard/store/dashboard-store';
import { MeasureType } from '@/features/measures/utils/measureTypeEnum';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { toast } from 'ngx-sonner';
import { HealthRecordExportApi } from '@/features/health-record-export/services/health-record-export.api';
import { ExportFormat } from '@/features/health-record-export/models/health-record-export.model';
import { BreadcrumbNode } from '@/internal-shared/models/breadcrumb-node.model';
import { BreadcrumbComponent } from '@/internal-shared/components/breadcrumb.component/breadcrumb.component';

const MEASURE_TYPE_VALUES = new Set<string>(Object.values(MeasureType) as string[]);

@Component({
  selector: 'app-health-record.page',
  imports: [
    HealthRecordHeaderComponent,
    HealthRecordSectionComponent,
    ZardButtonComponent,
    BreadcrumbComponent,
    DynamicFormModalComponent,
  ],
  template: `
    <div class="top-bar">
      <app-breadcrumb [breadcrumbRoad]="breadcrumbRoad"></app-breadcrumb>

      <z-button zSize="lg" zType="outline" (click)="isExportOpen.set(true)">
        <span class="material-icons">download</span>
        Exporter
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

    <z-dynamic-form-modal
      [isOpen]="isExportOpen()"
      formId="health-record.export"
      (closed)="isExportOpen.set(false)"
      (submitted)="onExportSubmit($event)"
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
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
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

    .bottom-bar {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      margin-top: 32px;
    }

    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 16px;
    }

    .modal-box {
      background: white;
      border-radius: 12px;
      padding: 32px;
      max-width: 520px;
      width: 100%;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
    }

    .modal-box h2 {
      font-size: 18px;
      margin-bottom: 25px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class HealthRecordPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly healthRecordFacade = inject(HealthRecordFacade);
  private readonly exportApi = inject(HealthRecordExportApi);
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly dashboardStore = inject(DashboardStore);

  breadcrumbRoad: BreadcrumbNode[] = [];

  readonly editModal = viewChild<DynamicFormModalComponent>('editModal');
  isEditOpen = signal(false);
  isExportOpen = signal(false);

  healthRecord: HealthRecord = this._normalizeHealthRecord(
    this.route.snapshot.data['healthRecord'],
  );
  protected editInitialValues: Record<string, unknown> = this._buildInitialValues(
    this.healthRecord,
  );

  constructor() {
    if (!this.dashboardStore.metadata()) {
      this.healthRecordFacade.loadFormMetadata().then((metadata) => {
        this.dashboardStore.metadata.set(metadata);
      });
    }
  }

  ngOnInit(): void {
    this.breadcrumbRoad = [
      {
        link: ['health-record/' + this.healthRecord.id],
        name: 'Carnet de santé de ' + this.healthRecord.petName,
      },
    ];
  }

  private _normalizeHealthRecord(rawHealthRecord: Record<string, unknown>): HealthRecord {
    return {
      ...rawHealthRecord,
      animalType: (rawHealthRecord['animalType'] ?? rawHealthRecord['AnimalType']) as string,
    } as HealthRecord;
  }

  private _buildInitialValues(healthRecord: HealthRecord): Record<string, unknown> {
    const rawHealthRecord = healthRecord as unknown as Record<string, unknown>;
    const animalType = (rawHealthRecord['animalType'] ?? rawHealthRecord['AnimalType']) as
      | string
      | undefined;
    return {
      petName: healthRecord.petName,
      animalType: animalType ?? null,
      breed: healthRecord.breed,
      sex: healthRecord.sex,
      birthDate: healthRecord.birthDate
        ? new Date(healthRecord.birthDate).toISOString().substring(0, 10)
        : null,
      currentWeight: healthRecord.currentWeight,
      color: healthRecord.color,
      identificationNumber: healthRecord.identificationNumber ?? null,
      tattooNumber: healthRecord.tattoo ?? null,
      allergy: healthRecord.allergy ?? null,
    };
  }

  async onEditSubmit(payload: Record<string, unknown>): Promise<void> {
    try {
      const updatedHealthRecord = await this.healthRecordFacade.updateFromFormPayload(
        payload,
        this.healthRecord.id,
      );
      this.healthRecord = updatedHealthRecord;
      this.editInitialValues = this._buildInitialValues(updatedHealthRecord);
      this.isEditOpen.set(false);
      toast.success('Animal modifié avec succès');
    } catch (error: any) {
      if (error?.message === 'FILE_TOO_LARGE') {
        this.editModal()?.handleServerError({ errorCode: 'FILE_TOO_LARGE' }, 'image');
        toast.error('Le fichier est trop volumineux (maximum 2MB).');
      } else if (error?.status === 409) {
        this.editModal()?.handleServerError(error);
      } else {
        console.error(error);
      }
    }
  }

  async onExportSubmit(payload: Record<string, unknown>): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const format = payload['format'] as ExportFormat;
    const measureTypes = Object.keys(payload).filter(
      (key) => MEASURE_TYPE_VALUES.has(key) && payload[key] === true,
    ) as unknown as MeasureType[];

    const exportRequest = {
      from: payload['from'] as string,
      to: payload['to'] as string,
      measureTypes,
      includeVaccines: payload['includeVaccines'] === true,
      format,
    };

    try {
      const blob =
        format === 'XLSX'
          ? await this.exportApi.exportXlsx(this.healthRecord.id, exportRequest)
          : await this.exportApi.exportPdf(this.healthRecord.id, exportRequest);

      const fileName =
        format === 'XLSX'
          ? `fiche-sante_${payload['from']}_${payload['to']}.xlsx`
          : `fiche-sante_${payload['from']}_${payload['to']}.pdf`;

      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = fileName;
      anchor.click();
      URL.revokeObjectURL(url);

      this.isExportOpen.set(false);
      toast.success('Export généré avec succès');
    } catch {
      toast.error("Erreur lors de la génération de l'export");
    }
  }
}
