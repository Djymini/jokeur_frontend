import { Component, input } from '@angular/core';
import {
  ZardBreadcrumbComponent,
  ZardBreadcrumbItemComponent,
} from '@/shared/components/breadcrumb';
import { BreadcrumbNode } from '@/internal-shared/models/breadcrumb-node.model';
import { ZardIconComponent } from '@/shared/components/icon';

@Component({
  selector: 'app-breadcrumb',
  imports: [ZardBreadcrumbComponent, ZardBreadcrumbItemComponent, ZardIconComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  breadcrumbRoad = input.required<BreadcrumbNode[]>();
}
