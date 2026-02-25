import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';
import { NewsStore } from '@/features/news/store/news-store';
import { NotificationApiService } from '@/features/dashboard/services/notification.api.service';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-news',
  imports: [ZardButtonComponent, ZardIconComponent, NgClass, DatePipe],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export default class NewsComponent implements OnInit {
  protected readonly Math = window.Math;

  newsStore = inject(NewsStore);
  private _notificationApi = inject(NotificationApiService);

  currentPage = signal<number>(0);
  pageSize = signal<number>(5);
  totalPages = computed(() => this.newsStore.notifications().totalPages || 0);
  totalElements = computed(() => this.newsStore.notifications().totalElements || 0);

  ngOnInit(): void {
    this.loadNotifications();
  }

  async loadNotifications(): Promise<void> {
    try {
      const result = await this._notificationApi.getAllNotifications(
        this.currentPage(),
        this.pageSize(),
      );

      const decodedContent = result.content.map((notification) => ({
        ...notification,
        summary: this._decodeHtmlEntities(notification.summary),
      }));

      this.newsStore.notifications.set({
        ...result,
        content: decodedContent,
      });
    } catch (error) {
      console.error('Erreur lors du chargement des notifications:', error);
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
      await this.loadNotifications();
    }
  }

  nextPage(): void {
    this.onPageChange(this.currentPage() + 1);
  }

  previousPage(): void {
    this.onPageChange(this.currentPage() - 1);
  }
}
