import { Component, inject, signal, viewChild } from '@angular/core';
import { DynamicFormModalComponent } from '@/shared/components/forms/dynamic-form-modal/dynamic-form-modal.component';
import { RouterLink } from '@angular/router';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';
import { HealthRecordFacade } from '@/features/health-records/services/health-record.facade';
import { DashboardStore } from '@/features/dashboard/store/dashboard-store';
import { AuthService } from '@/core/services/auth.service';
import { environment } from '../../../../../environments/environment';
import { toast } from 'ngx-sonner';
import { DashboardRules } from '@/features/dashboard/domain/dashboard.rules';

@Component({
  selector: 'app-dashboard-animal',
  imports: [DynamicFormModalComponent, RouterLink, ZardButtonComponent, ZardIconComponent],
  templateUrl: './dashboard-animal.component.html',
  styleUrl: './dashboard-animal.component.scss',
})
export class DashboardAnimalComponent {
  animalTypeMap: Record<string, string> = {
    CAT: 'Chat',
    DOG: 'Chien',
  };

  readonly modalRef = viewChild(DynamicFormModalComponent);
  private readonly _facade = inject(HealthRecordFacade);
  protected readonly dashboardStore = inject(DashboardStore);
  protected readonly DashboardRules = DashboardRules;
  isOpen = signal(false);

  authService = inject(AuthService);

  getPhotoUrl(photoKey: string): string {
    return `${environment.apiUrl}/uploads/${photoKey}`;
  }

  formatBreed(breed: string): string {
    return breed
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  async onSubmit(payload: Record<string, unknown>): Promise<void> {
    try {
      const newAnimal = await this._facade.createFromFormPayload(
        payload,
        this.authService.user()!.id,
      );
      this.dashboardStore.animals.update((list) => [...list, newAnimal]);
      this.isOpen.set(false);
      toast.success('Carnet de santé créé avec succès');
    } catch (error: any) {
      if (error?.message === 'FILE_TOO_LARGE') {
        this.modalRef()?.handleServerError({ errorCode: 'FILE_TOO_LARGE' });
        toast.error('Le fichier est trop volumineux (maximum 2MB).');
      } else if (error?.status === 409) {
        this.modalRef()?.handleServerError(error);
      } else {
        console.error(error);
      }
    }
  }
}
