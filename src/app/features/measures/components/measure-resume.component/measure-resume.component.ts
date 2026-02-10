import { Component, input } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';
import { MeasureResumeItemComponent } from '@/features/measures/components/measure-resume-item.component/measure-resume-item.component';
import { MeasureModel } from '@/features/measures/models/measureModel';

@Component({
  selector: 'app-measure-resume',
  imports: [
    ZardButtonComponent,
    ZardIconComponent,
    MeasureResumeItemComponent,
  ],
  templateUrl: './measure-resume.component.html',
  styleUrl: './measure-resume.component.scss',
})
export class MeasureResumeComponent {
  title = input.required<string>();
  measures = input.required<MeasureModel[]>();
}
