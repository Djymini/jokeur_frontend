import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeasureSectionComponent } from '@/features/measures/components/measure-section.component/measure-section.component';
import { MeasureSectionWeight } from '@/features/measures/interfaces/strategies/mesure-section-behavior/measureSectionWeight';
import { MeasureSectionBehavior } from '@/features/measures/interfaces/measureSectionBahavior';
import { MeasureSectionBpm } from '@/features/measures/interfaces/strategies/mesure-section-behavior/measureSectionBpm';
import { MeasureSectionTemperature } from '@/features/measures/interfaces/strategies/mesure-section-behavior/measureSectionTemperature';
import { MeasureSectionRespiratoryFrequency } from '@/features/measures/interfaces/strategies/mesure-section-behavior/measureSectionRespiratoryFrequency';
import { HealthRecordFacade } from '@/features/health-records/services/health-record.facade';

@Component({
  selector: 'app-health-record.page',
  imports: [MeasureSectionComponent],
  template: `
    <div class="container">
      @for (section of measureSectionArray; track $index) {
        <app-measure-section [measureSection]="section"></app-measure-section>
      }
    </div>
  `,
  styles: ``,
})
export default class HealthRecordPage {
  private route = inject(ActivatedRoute);
  private healthRecordFacade = inject(HealthRecordFacade);

  healthRecord = this.route.snapshot.data['healthRecord'];

  measureSectionArray: MeasureSectionBehavior[] = [
    new MeasureSectionWeight(),
    new MeasureSectionBpm(),
    new MeasureSectionTemperature(),
    new MeasureSectionRespiratoryFrequency(),
  ];
}
