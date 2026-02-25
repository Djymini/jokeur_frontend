import { Injectable } from '@angular/core';
import { BaseApi } from '@/internal-shared/services/base.api';
import { AppointmentModel } from '@/shared/models/appointment-model';
import { PageModel } from '@/shared/models/page-model';

@Injectable({ providedIn: 'root' })
export class AppointmentApi extends BaseApi {
  private readonly _endpoint = '/appointment';

  async getAppointments(
    userId: number,
    page: number,
    size: number,
  ): Promise<PageModel<AppointmentModel>> {
    return this.get<PageModel<AppointmentModel>>(
      this._endpoint + `?userId=${userId}&page=${page}&size=${size}`,
    );
  }
}
