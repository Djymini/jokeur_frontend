import { Component } from '@angular/core';
import { MeasureBoardComponent } from '@/features/measures/components/measure-board.component/measure-board.component';
import { MeasureResumeComponent } from '@/features/measures/components/measure-resume.component/measure-resume.component';
import { MeasureSectionComponent } from '@/features/measures/components/measure-section.component/measure-section.component';
import { MeasureSectionBpm } from '@/features/measures/interfaces/strategies/mesure-section-behavior/measureSectionBpm';

@Component({
  selector: 'app-under-construction',
  imports: [MeasureBoardComponent, MeasureResumeComponent, MeasureSectionComponent],
  templateUrl: './under-construction.component.html',
  styleUrl: './under-construction.component.scss',
})
export class UnderConstructionComponent {
  sectionWeight = new MeasureSectionBpm();
}
