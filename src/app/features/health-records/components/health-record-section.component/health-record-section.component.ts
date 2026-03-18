import { Component, inject, input, signal } from '@angular/core';

import { MeasureSectionBehavior } from '@/features/measures/interfaces/measureSectionBahavior';
import { MeasureSectionWeight } from '@/features/measures/interfaces/strategies/mesure-section-behavior/measureSectionWeight';
import { MeasureSectionBpm } from '@/features/measures/interfaces/strategies/mesure-section-behavior/measureSectionBpm';
import { MeasureSectionTemperature } from '@/features/measures/interfaces/strategies/mesure-section-behavior/measureSectionTemperature';
import { MeasureSectionRespiratoryFrequency } from '@/features/measures/interfaces/strategies/mesure-section-behavior/measureSectionRespiratoryFrequency';
import { TabBarComponent } from '@/internal-shared/components/tab-bar.component/tab-bar.component';
import { TabLink } from '@/internal-shared/models/tabLink.model';
import { MeasureSectionComponent } from '@/features/measures/components/measure-section.component/measure-section.component';
import { VaccinesSectionComponent } from '@/features/vaccines/components/vaccines-section.component/vaccines-section.component';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { SymptomsRecordSectionComponent } from '@/features/symptom-health-record/component/symptoms-record-section.component/symptoms-record-section.component';
import { HealthRecordInformationSectionComponent } from '@/features/health-records/components/health-record-information-section.component/health-record-information-section.component';
import { TreatmentSectionComponent } from '@/features/treatments/components/treatment-section.component/treatment-section.component';
import { toast } from 'ngx-sonner';
import { HealthRecordFacade } from '@/features/health-records/services/health-record.facade';
import { Router } from '@angular/router';
import { DashboardStore } from '@/features/dashboard/store/dashboard-store';
import { ZardButtonComponent } from '@/shared/components/button';

@Component({
  selector: 'app-health-record-section',
  imports: [
    TabBarComponent,
    MeasureSectionComponent,
    VaccinesSectionComponent,
    SymptomsRecordSectionComponent,
    HealthRecordInformationSectionComponent,
    TreatmentSectionComponent,
    ZardButtonComponent,
  ],
  templateUrl: './health-record-section.component.html',
  styleUrl: './health-record-section.component.scss',
})
export class HealthRecordSectionComponent {
  private _healthRecordFacade = inject(HealthRecordFacade);
  protected readonly dashboardStore = inject(DashboardStore);
  private _router = inject(Router);

  healthRecord = input.required<HealthRecord>();
  isDeleteOpen = signal(false);

  measureSectionArray: MeasureSectionBehavior[] = [
    new MeasureSectionWeight(),
    new MeasureSectionBpm(),
    new MeasureSectionTemperature(),
    new MeasureSectionRespiratoryFrequency(),
  ];

  tabLinks: TabLink[] = [
    { name: 'Information', icon: 'info' },
    { name: 'Suivi médical', icon: 'favorite_border' },
    { name: 'Prévention', icon: 'medication' },
    { name: 'Données', icon: 'ssid_chart' },
  ];

  activeTab = signal<string>(this.tabLinks[0].name);

  constructor() {
    if (!this.dashboardStore.metadata()) {
      this._healthRecordFacade.loadFormMetadata().then((metadata) => {
        this.dashboardStore.metadata.set(metadata);
      });
    }
  }

  selectTab(name: string): void {
    this.activeTab.set(name);
  }

  async onDeleteConfirm(): Promise<void> {
    try {
      await this._healthRecordFacade.deleteHealthRecord(this.healthRecord().id);
      toast.success('Carnet de santé supprimé');
      this._router.navigate(['/dashboard']);
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  }
}
