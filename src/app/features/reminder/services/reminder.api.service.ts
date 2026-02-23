import { Injectable } from '@angular/core';
import { ReminderModel } from '@/internal-shared/domaine/reminder-model';
import { BaseApi } from '@/internal-shared/services/base.api';

@Injectable({ providedIn: 'root' })
export class ReminderApiService extends BaseApi {
  private readonly _endpoint = '/reminder';

  async getAllReminder(userId: number): Promise<ReminderModel[]> {
    return this.get<ReminderModel[]>(this._endpoint + `?userId=${userId}`);
  }
}
