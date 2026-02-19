import { Injectable } from '@angular/core';
import { BaseApi } from '@/internal-shared/services/base.api';
import { AppointmentModel } from '@/internal-shared/domaine/appointment-model';
import { PageModel } from '@/internal-shared/domaine/page-model';

@Injectable({ providedIn: 'root' })
export class AppointmentApiService extends BaseApi {
  private readonly _endpoint = '/appointment';

  async getAppointments(): Promise<PageModel<AppointmentModel>> {
    // TODO récupere idOwner depuis localstorage
    const idOwner = 1;
    return this.get<PageModel<AppointmentModel>>(this._endpoint + `?idOwner=${idOwner}&page=0&size=1`);
  }
}
