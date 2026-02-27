import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HealthRecordFacade } from '@/features/health-records/services/health-record.facade';
import { HealthRecordHeaderComponent } from '@/features/health-records/components/health-record-header.component/health-record-header.component';
import { HealthRecordSectionComponent } from '@/features/health-records/components/health-record-section.component/health-record-section.component';
import { ZardButtonComponent } from '@/shared/components/button';

@Component({
  selector: 'app-health-record.page',
  imports: [HealthRecordHeaderComponent, HealthRecordSectionComponent, ZardButtonComponent],
  template: `
    <div class="button-container">
      <z-button z-button zSize="lg" zType="link" (click)="returnToDashboard()">
        <span class="material-icons cursor-pointer">arrow_back</span>
        Retour à mon tableau de bord
      </z-button>
    </div>
    <app-health-record-header [healthRecord]="healthRecord"></app-health-record-header>
    <app-health-record-section [healthRecord]="healthRecord"></app-health-record-section>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 48px;
    }
    .button-container {
      width: 100%;
      margin-bottom: 32px;
    }
    button {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: bold;
    }
    button span {
      font-weight: bold;
    }
  `,
})
export default class HealthRecordPage {
  private route = inject(ActivatedRoute);
  private healthRecordFacade = inject(HealthRecordFacade);

  healthRecord = this.route.snapshot.data['healthRecord'];

  constructor(private router: Router) {}

  returnToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
