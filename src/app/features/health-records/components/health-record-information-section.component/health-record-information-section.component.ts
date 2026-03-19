import { Component, computed, input } from '@angular/core';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { HealthRecordInformation } from '@/features/health-records/models/health-record-information.model';
import { HealthRecordRules } from '@/features/health-records/domain/health-record.rules';
import { InformationItemComponent } from '@/features/health-records/components/information-item.component/information-item.component';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { DisplayDateRules } from '@/internal-shared/domain/display-date.rules';
import { DashboardRules } from '@/features/dashboard/domain/dashboard.rules';

@Component({
  selector: 'app-health-record-information-section',
  imports: [InformationItemComponent, ZardBadgeComponent],
  templateUrl: './health-record-information-section.component.html',
  styleUrl: './health-record-information-section.component.scss',
})
export class HealthRecordInformationSectionComponent {
  healthRecord = input.required<HealthRecord>();

  healthRecordInformation = computed<HealthRecordInformation[]>(() => {
    const record = this.healthRecord();

    return [
      { label: 'Nom', information: record.petName },
      { label: 'Race', information: record.breed },
      { label: 'Age', information: DashboardRules.getAge(record.birthDate) },
      { label: 'Sexe', information: record.sex },
      { label: 'Poids', information: HealthRecordRules.displayWeight(record.currentWeight) },
      {
        label: 'Date de naissance',
        information: DisplayDateRules.formatDateFromDate(record.birthDate),
      },
      { label: 'Couleur', information: record.color },
      { label: "N° d'identification", information: record.identificationNumber },
      { label: 'Tatouage', information: record.tattoo?.toString() ?? '' },
    ];
  });
}
