import { Injectable } from '@angular/core';
import { BaseApi } from '@/internal-shared/services/base.api';
import { NotificationModel } from '@/shared/models/notification-model';

@Injectable({ providedIn: 'root' })
export class DashboardApiService extends BaseApi {
  private readonly _endpoint = '/notifications';

  async getAllNotifications(): Promise<NotificationModel[]> {
    return this.get<NotificationModel[]>(this._endpoint);
  }
}
