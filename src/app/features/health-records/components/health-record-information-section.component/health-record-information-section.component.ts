import { Component, input, OnInit } from '@angular/core';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { HealthRecordInformation } from '@/features/health-records/models/health-record-information.model';
import { HealthRecordRules } from '@/features/health-records/domain/health-record.rules';
import { InformationItemComponent } from '@/features/health-records/components/information-item.component/information-item.component';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardButtonComponent } from '@/shared/components/button';

@Component({
  selector: 'app-health-record-information-section',
  imports: [InformationItemComponent, ZardBadgeComponent, ZardButtonComponent],
  templateUrl: './health-record-information-section.component.html',
  styleUrl: './health-record-information-section.component.scss',
})
export class HealthRecordInformationSectionComponent implements OnInit {
  healthRecord = input.required<HealthRecord>();

  healthRecordInformation: HealthRecordInformation[] = [];

  ngOnInit(): void {
    this.healthRecordInformation = [
      {
        label: 'Nom',
        information: this.healthRecord().petName,
      },
      {
        label: 'Race',
        information: this.healthRecord().breed,
      },
      {
        label: 'Age',
        information: HealthRecordRules.calculateAge(this.healthRecord().birthDate),
      },
      {
        label: 'Sexe',
        information: this.healthRecord().sex,
      },
      {
        label: 'Poids',
        information: HealthRecordRules.displayWeight(this.healthRecord().currentWeight),
      },
      {
        label: 'Date de naissance',
        information: this.healthRecord().birthDate.toString(),
      },
      {
        label: 'Couleur',
        information: this.healthRecord().color,
      },
      {
        label: "N° d'identification",
        information: this.healthRecord().identificationNumber,
      },
      {
        label: 'Tatouage',
        information: this.healthRecord().tattoo.toString(),
      },
    ];
  }
}
