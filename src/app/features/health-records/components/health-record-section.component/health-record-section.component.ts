import { Component, input, signal } from '@angular/core';

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

@Component({
  selector: 'app-health-record-section',
  imports: [TabBarComponent, MeasureSectionComponent, VaccinesSectionComponent],
  templateUrl: './health-record-section.component.html',
  styleUrl: './health-record-section.component.scss',
})
export class HealthRecordSectionComponent {
  healthRecord = input.required<HealthRecord>();
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

  selectTab(name: string): void {
    this.activeTab.set(name);
  }
}
