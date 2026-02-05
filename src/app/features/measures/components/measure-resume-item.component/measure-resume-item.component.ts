import { Component, input } from '@angular/core';

@Component({
  selector: 'app-measure-resume-item',
  imports: [],
  templateUrl: './measure-resume-item.component.html',
  styleUrl: './measure-resume-item.component.scss',
})
export class MeasureResumeItemComponent {
  value = input.required<string>();
  date = input.required<string>();
}
