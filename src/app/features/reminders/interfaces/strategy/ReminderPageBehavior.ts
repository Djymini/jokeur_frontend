import { DatePageInterface } from '@/internal-shared/interfaces/DatePageInterface';
import { toast } from 'ngx-sonner';
import { inject, WritableSignal } from '@angular/core';
import { ReminderApiService } from '@/features/dashboard/services/reminder.api.service';
import { ReminderPageStore } from '@/features/reminders/services/reminder-page-store';
import { UserModel } from '@/core/models/user-model';

export class ReminderPageBehavior implements DatePageInterface {
  private _reminderApi: ReminderApiService;
  reminderPageStore: ReminderPageStore;

  constructor() {
    this._reminderApi = inject(ReminderApiService);
    this.reminderPageStore = inject(ReminderPageStore);
  }

  async loadReminders(currentPage: number, pageSize: number, user: UserModel): Promise<void> {
    try {
      const result = await this._reminderApi.getAllReminder(user.id, currentPage, pageSize);

      const content = result.content.map((reminder) => ({
        ...reminder,
        summary: reminder.description,
      }));

      this.reminderPageStore.reminderPage.set({
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
