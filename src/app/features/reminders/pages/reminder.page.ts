import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { BreadcrumbNode } from '@/internal-shared/models/breadcrumb-node.model';
import { BreadcrumbComponent } from '@/internal-shared/components/breadcrumb.component/breadcrumb.component';
import { ReminderSectionComponent } from '@/features/reminders/components/reminder-section.component/reminder-section.component';
import { ReminderPageStore } from '@/features/reminders/services/reminder-page-store';
import { ReminderApiService } from '@/features/dashboard/services/reminder.api.service';
import { AuthService } from '@/core/services/auth.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-reminder.page',
  imports: [BreadcrumbComponent, ReminderSectionComponent],
  template: `
    <app-breadcrumb [breadcrumbRoad]="breadcrumbRoad"></app-breadcrumb>
    <app-reminder-section [reminderPage]="reminderPageStore.reminderPage()"></app-reminder-section>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 48px;
    }
  `,
})
export default class ReminderPage implements OnInit {
  reminderPageStore = inject(ReminderPageStore);
  private _reminderApi = inject(ReminderApiService);
  private _authService = inject(AuthService);

  breadcrumbRoad: BreadcrumbNode[] = [{ link: ['reminder'], name: 'Rappel' }];

  currentPage = signal<number>(0);
  pageSize = signal<number>(5);
  totalPages = computed(() => this.reminderPageStore.reminderPage().totalPages || 0);
  totalElements = computed(() => this.reminderPageStore.reminderPage().totalElements || 0);

  ngOnInit(): void {
    this.loadReminders();
  }

  async loadReminders(): Promise<void> {
    try {
      const result = await this._reminderApi.getAllReminder(
        this._authService.user()!.id,
        this.currentPage(),
        this.pageSize(),
      );

      const content = result.content.map((reminder) => ({
        ...reminder,
        summary: reminder.description,
      }));

      this.reminderPageStore.reminderPage.set({
        ...result,
        content: content,
      });
    } catch (error) {
      const errorMeassage = 'Erreur lors du chargement des rappels';
      throw new Error(errorMeassage);
      toast.error(errorMeassage);
    }
  }

  async onPageChange(page: number): Promise<void> {
    if (page >= 0 && page < this.totalPages()) {
      this.currentPage.set(page);
      await this.loadReminders();
    }
  }

  nextPage(): void {
    this.onPageChange(this.currentPage() + 1);
  }

  previousPage(): void {
    this.onPageChange(this.currentPage() - 1);
  }
}
