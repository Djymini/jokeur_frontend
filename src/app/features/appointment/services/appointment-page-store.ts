import { Injectable, signal } from '@angular/core';
import { Appointment } from '@/features/appointment/models/appointment.model';
import { PageModel } from '@/shared/models/page-model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentPageStore {
  appointmentPage = signal<PageModel<Appointment>>({ content: [], totalElements: 0 });

  public updateAppointment(updatedAppointment: Appointment): void {
    this.appointmentPage.update((currentPage) => ({
      ...currentPage,
      content: currentPage.content.map((item) =>
        item.id === updatedAppointment.id ? updatedAppointment : item,
      ),
    }));
  }

  public deleteAppointment(appointmentId: number): void {
    this.appointmentPage.update((currentPage) => {
      const newContent = currentPage.content.filter((item) => item.id !== appointmentId);

      const itemsRemoved = currentPage.content.length - newContent.length;

      return {
        ...currentPage,
        content: newContent,
        totalElements: currentPage.totalElements - itemsRemoved,
        numberOfElements: (currentPage.numberOfElements ?? 0) - itemsRemoved,
      };
    });
  }
}
