import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ZardIconComponent } from '@/shared/components/icon';
import { NewsStore } from '@/features/news/store/news-store';
import { NewsApi } from '@/features/dashboard/services/news-api.service';
import { DatePipe } from '@angular/common';
import { IsRecentPipe } from '@/features/news/pipes/is-recent.pipe';

@Component({
  selector: 'app-news',
  imports: [ZardIconComponent, DatePipe, IsRecentPipe],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export default class NewsComponent implements OnInit {
  protected readonly Math = Math;

  private readonly _platformId = inject(PLATFORM_ID);
  newsStore = inject(NewsStore);
  private _newsApi = inject(NewsApi);

  currentPage = signal<number>(0);
  pageSize = signal<number>(5);
  totalPages = computed(() => this.newsStore.news().totalPages || 0);
  totalElements = computed(() => this.newsStore.news().totalElements || 0);

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.loadNews();
    }
  }

  async loadNews(): Promise<void> {
    try {
      const result = await this._newsApi.getAllNews(this.currentPage(), this.pageSize());

      const decodedContent = result.content.map((news) => ({
        ...news,
        summary: this._decodeHtmlEntities(news.summary),
      }));

      this.newsStore.news.set({
        ...result,
        content: decodedContent,
      });
    } catch (error) {
      console.error('Erreur lors du chargement des actualités:', error);
    }
  }

  private _decodeHtmlEntities(text: string): string {
    if (!text) return text;
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }

  async onPageChange(page: number): Promise<void> {
    if (page >= 0 && page < this.totalPages()) {
      this.currentPage.set(page);
      await this.loadNews();
    }
  }

  nextPage(): void {
    this.onPageChange(this.currentPage() + 1);
  }

  previousPage(): void {
    this.onPageChange(this.currentPage() - 1);
  }
}
