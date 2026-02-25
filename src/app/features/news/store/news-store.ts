import { Injectable, signal } from '@angular/core';
import { PageModel } from '@/shared/models/page-model';
import { NotificationModel } from '@/shared/models/notification-model';

@Injectable({ providedIn: 'root' })
export class NewsStore {
  notifications = signal<PageModel<NotificationModel>>({ content: [], totalElements: 0 });
}
