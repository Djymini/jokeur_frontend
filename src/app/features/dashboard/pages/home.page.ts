import { Component } from '@angular/core';
import OwnerComponent from '@/features/dashboard/owner.component/owner.component';

@Component({
  selector: 'app-home.page',
  imports: [OwnerComponent],
  template: ` <app-owner></app-owner> `,
  styles: ``,
})
export default class HomePage {}
