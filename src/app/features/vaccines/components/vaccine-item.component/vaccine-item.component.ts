import { Component, input } from '@angular/core';
import { Vaccine } from '@/features/vaccines/models/vaccine.model';

@Component({
  selector: 'app-vaccine-item',
  imports: [],
  templateUrl: './vaccine-item.component.html',
  styleUrl: './vaccine-item.component.scss',
})
export class VaccineItemComponent {
  vaccine = input.required<Vaccine>();
}
