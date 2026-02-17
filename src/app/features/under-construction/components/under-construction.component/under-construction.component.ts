import { Component } from '@angular/core';
import { MeasureSectionBpm } from '@/features/measures/interfaces/strategies/mesure-section-behavior/measureSectionBpm';
import { MeasureSectionComponent } from '@/features/measures/components/measure-section.component/measure-section.component';

@Component({
  selector: 'app-under-construction',
  imports: [MeasureSectionComponent],
  templateUrl: './under-construction.component.html',
  styleUrl: './under-construction.component.scss',
})
export class UnderConstructionComponent {
  section = new MeasureSectionBpm();
}
