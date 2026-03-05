import { Component, computed, input, output } from '@angular/core';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { ZardButtonComponent } from '@/shared/components/button';

@Component({
  selector: 'app-health-record-header',
  imports: [ZardBadgeComponent, ZardButtonComponent],
  templateUrl: './health-record-header.component.html',
  styleUrl: './health-record-header.component.scss',
})
export class HealthRecordHeaderComponent {
  healthRecord = input.required<HealthRecord>();
  readonly editClicked = output<void>();

  protected readonly badges = computed(() => {
    const r = this.healthRecord();
    const age = new Date().getFullYear() - new Date(r.birthDate).getFullYear();
    return [age + ' ans', r.sex, r.currentWeight + ' kg'];
  });
}
