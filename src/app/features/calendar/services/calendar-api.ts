import { Injectable } from '@angular/core';
import { BaseApi } from '@/internal-shared/services/base.api';
import { Agenda } from '@/features/calendar/models/agenda.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarApi extends BaseApi {
  async getAgenda(userId: string, date: string): Promise<Agenda> {
    return this.get<Agenda>('/agenda/' + userId + '?date=' + date);
  }
}
