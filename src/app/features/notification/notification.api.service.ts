import { BaseApi } from '@/internal-shared/services/base.api';
import { Injectable } from '@angular/core';
import { NotificationModel } from '@/internal-shared/domaine/notification-model';

@Injectable({ providedIn: 'root' })
export class NotificationApiService extends BaseApi {
  private readonly _endpoint = '/notifications';

  async getAllNotifications(): Promise<NotificationModel[]> {
    return this.get<NotificationModel[]>(this._endpoint);
  }
}
