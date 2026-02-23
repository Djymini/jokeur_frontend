import { Injectable } from '@angular/core';
import { BaseApi } from '@/internal-shared/services/base.api';
import { AppointmentModel } from '@/internal-shared/domaine/appointment-model';
import { PageModel } from '@/internal-shared/domaine/page-model';

@Injectable({ providedIn: 'root' })
export class AppointmentApiService extends BaseApi {
  private readonly _endpoint = '/appointment';

  async getAppointments(userId: number): Promise<PageModel<AppointmentModel>> {
    return this.get<PageModel<AppointmentModel>>(
      this._endpoint + `?userId=${userId}&page=0&size=1`,
    );
  }
}
