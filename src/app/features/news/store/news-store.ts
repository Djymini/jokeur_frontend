import { Injectable, signal } from '@angular/core';
import { PageModel } from '@/shared/models/page-model';
import { NewsModel } from '@/shared/models/news-model';

@Injectable({ providedIn: 'root' })
export class NewsStore {
  news = signal<PageModel<NewsModel>>({ content: [], totalElements: 0 });
}
