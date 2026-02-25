import { BaseApi } from '@/internal-shared/services/base.api';
import { Injectable } from '@angular/core';
import { NotificationModel } from '@/shared/models/notification-model';
import { PageModel } from '@/shared/models/page-model';

@Injectable({ providedIn: 'root' })
export class NotificationApiService extends BaseApi {
  private readonly _endpoint = '/news';

  async getAllNotifications(page: number, size: number): Promise<PageModel<NotificationModel>> {
    return this.get<PageModel<NotificationModel>>(this._endpoint + `?page=${page}&size=${size}`);
  }
}
