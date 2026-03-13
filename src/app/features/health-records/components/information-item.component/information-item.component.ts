import { Component, input } from '@angular/core';

@Component({
  selector: 'app-information-item',
  imports: [],
  templateUrl: './information-item.component.html',
  styleUrl: './information-item.component.scss',
})
export class InformationItemComponent {
  label = input.required<string>();
  information = input.required<string>();
}
