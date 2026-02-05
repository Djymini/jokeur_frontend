import { Component, computed, input } from '@angular/core';
import { MeasureBoardComponent } from '@/features/measures/components/measure-board.component/measure-board.component';
import { MeasureResumeComponent } from '@/features/measures/components/measure-resume.component/measure-resume.component';
import { MeasureSectionBehavior } from '@/features/measures/interfaces/measureSectionBahavior';

@Component({
  selector: 'app-measure-section',
  imports: [MeasureBoardComponent, MeasureResumeComponent],
  templateUrl: './measure-section.component.html',
  styleUrl: './measure-section.component.scss',
})
export class MeasureSectionComponent {
  measureSection = input.required<MeasureSectionBehavior>();

  boardName = computed(() => this.measureSection().initSectionProperties().boardName);
  boardIcon = computed(() => this.measureSection().initSectionProperties().boardIcon);
  resumeTitle = computed(() => this.measureSection().initSectionProperties().resumeTitle);
  measures = computed(() => this.measureSection().getMeasures())
}
