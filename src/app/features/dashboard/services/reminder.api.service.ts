import { Injectable } from '@angular/core';
import { ReminderModel } from '@/shared/models/reminder-model';
import { BaseApi } from '@/internal-shared/services/base.api';
import { PageModel } from '@/shared/models/page-model';

@Injectable({ providedIn: 'root' })
export class ReminderApiService extends BaseApi {
  private readonly _endpoint = '/reminder';

  async getAllReminder(
    userId: number,
    page: number,
    size: number,
  ): Promise<PageModel<ReminderModel>> {
    return this.get<PageModel<ReminderModel>>(
      this._endpoint + `?userId=${userId}&page=${page}&size=${size}`,
    );
  }
}
