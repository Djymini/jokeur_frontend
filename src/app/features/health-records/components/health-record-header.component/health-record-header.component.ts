import { Component, input, OnInit } from '@angular/core';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { HealthRecord } from '@/features/health-records/models/health-record.model';
import { ZardButtonComponent } from '@/shared/components/button';

@Component({
  selector: 'app-health-record-header',
  imports: [ZardBadgeComponent, ZardButtonComponent],
  templateUrl: './health-record-header.component.html',
  styleUrl: './health-record-header.component.scss',
})
export class HealthRecordHeaderComponent implements OnInit {
  healthRecord = input.required<HealthRecord>();
  date = new Date(Date.now()).getFullYear();

  badgeContainer: string[] = [];

  ngOnInit(): void {
    const age =
      new Date(Date.now()).getFullYear() - new Date(this.healthRecord().birthDate).getFullYear();
    this.badgeContainer.push(age.toString() + ' ans');
    this.badgeContainer.push(this.healthRecord().sex);
    this.badgeContainer.push(this.healthRecord().currentWeight.toString() + ' kg');
  }
}
