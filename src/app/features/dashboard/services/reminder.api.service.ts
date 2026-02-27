import { Injectable } from '@angular/core';
import { BaseApi } from '@/internal-shared/services/base.api';
import { PageModel } from '@/shared/models/page-model';
import { Reminder } from '@/features/reminders/models/reminder.model';

@Injectable({ providedIn: 'root' })
export class ReminderApiService extends BaseApi {
  private readonly _endpoint = '/reminder';

  async getAllReminder(userId: number, page: number, size: number): Promise<PageModel<Reminder>> {
    return this.get<PageModel<Reminder>>(
      this._endpoint + `?userId=${userId}&page=${page}&size=${size}`,
    );
  }
}
