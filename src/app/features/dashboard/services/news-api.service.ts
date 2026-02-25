import { BaseApi } from '@/internal-shared/services/base.api';
import { Injectable } from '@angular/core';
import { NewsModel } from '@/shared/models/news-model';
import { PageModel } from '@/shared/models/page-model';

@Injectable({ providedIn: 'root' })
export class NewsApi extends BaseApi {
  private readonly _endpoint = '/news';

  async getAllNews(page: number, size: number): Promise<PageModel<NewsModel>> {
    return this.get<PageModel<NewsModel>>(this._endpoint + `?page=${page}&size=${size}`);
  }
}
