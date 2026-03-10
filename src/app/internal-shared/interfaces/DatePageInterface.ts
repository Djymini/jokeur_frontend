import { UserModel } from '@/core/models/user-model';
import { WritableSignal } from '@angular/core';

export interface DatePageInterface {
  loadReminders(currentPage: number, pageSize: number, user: UserModel): Promise<void>;
  onPageChange(pageSignal: WritableSignal<number>, page: number, totalPages: number): void;
  nextPage(page: number): number;
  previousPage(page: number): number;
}
