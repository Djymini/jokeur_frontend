import { Component, computed, inject, input, output } from '@angular/core';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { ZardButtonComponent } from '@/shared/components/button';
import { DashboardStore } from '@/features/dashboard/store/dashboard-store';
import {
  resolveBreedLabel,
  resolveLabel,
} from '@/features/health-records/utils/health-record-label.utils';
import { HealthRecordRules } from '@/features/health-records/domain/health-record.rules';

@Component({
  selector: 'app-health-record-header',
  imports: [ZardBadgeComponent, ZardButtonComponent],
  templateUrl: './health-record-header.component.html',
  styleUrl: './health-record-header.component.scss',
})
export class HealthRecordHeaderComponent {
  healthRecord = input.required<HealthRecord>();
  readonly editClicked = output<void>();

  private readonly _dashboardStore = inject(DashboardStore);

  protected readonly breedLabel = computed(() => {
    const record = this.healthRecord();
    console.log('breed:', record.breed, 'animalType:', record.animalType);
    return resolveBreedLabel(record.breed, record.animalType, this._dashboardStore.metadata());
  });

  protected readonly badges = computed(() => {
    const record = this.healthRecord();
    const metadata = this._dashboardStore.metadata();
    const age = HealthRecordRules.calculateAge(record.birthDate);
    const sexLabel = resolveLabel(record.sex, metadata?.sexes ?? []);
    return [age, sexLabel, record.currentWeight + ' kg'];
  });
}
