import { Component, input } from '@angular/core';
import { Vaccine } from '@/features/vaccines/models/vaccine.model';
import { ZardButtonComponent } from '@/shared/components/button';

@Component({
  selector: 'app-vaccine-item',
  imports: [ZardButtonComponent],
  templateUrl: './vaccine-item.component.html',
  styleUrl: './vaccine-item.component.scss',
})
export class VaccineItemComponent {
  vaccine = input.required<Vaccine>();
}
