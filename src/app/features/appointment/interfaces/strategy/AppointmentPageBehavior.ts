import { DatePageInterface } from '@/internal-shared/interfaces/DatePageInterface';
import { inject, WritableSignal } from '@angular/core';
import { AppointmentPageStore } from '@/features/appointment/services/appointment-page-store';
import { UserModel } from '@/core/models/user-model';
import { toast } from 'ngx-sonner';
import { AppointmentApi } from '@/features/appointment/services/appointment.api';

export class AppointmentPageBehavior implements DatePageInterface {
  private _appointmentApi: AppointmentApi;
  appointmentPageStore: AppointmentPageStore;

  constructor() {
    this._appointmentApi = inject(AppointmentApi);
    this.appointmentPageStore = inject(AppointmentPageStore);
  }

  async loadReminders(currentPage: number, pageSize: number, user: UserModel): Promise<void> {
    try {
      const result = await this._appointmentApi.getAppointments(user.id, currentPage, pageSize);

      const content = result.content.map((appointment) => ({
        ...appointment,
        summary: appointment.reason,
      }));

      this.appointmentPageStore.appointmentPage.set({
        ...result,
        content: content,
      });
    } catch (error: any) {
      throw new Error(error.message);
      toast.error('Erreur lors du chargement des rappels');
    }
  }

  onPageChange(pageSignal: WritableSignal<number>, page: number, totalPages: number): void {
    if (page >= 0 && page < totalPages) {
      pageSignal.set(page);
    }
  }

  nextPage(page: number): number {
    return page + 1;
  }
  previousPage(page: number): number {
    return page - 1;
  }
}
