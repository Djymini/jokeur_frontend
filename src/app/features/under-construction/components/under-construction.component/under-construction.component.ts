import { Component } from '@angular/core';
import { MeasureBoardComponent } from '@/features/measures/components/measure-board.component/measure-board.component';
import {
  MeasureResumeComponent
} from '@/features/measures/components/measure-resume.component/measure-resume.component';

@Component({
  selector: 'app-under-construction',
  imports: [MeasureBoardComponent, MeasureResumeComponent],
  templateUrl: './under-construction.component.html',
  styleUrl: './under-construction.component.scss',
})
export class UnderConstructionComponent {}
