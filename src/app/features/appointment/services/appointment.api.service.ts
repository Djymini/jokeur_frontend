import { Injectable } from '@angular/core';
import { BaseApi } from '@/internal-shared/services/base.api';
import { AppointmentModel } from '@/internal-shared/domaine/appointment-model';

@Injectable({ providedIn: 'root' })
export class AppointmentApiService extends BaseApi {
  private readonly _endpoint = '/appointment';

  async getAppointments(userId: number): Promise<AppointmentModel[]> {
    // TODO récupere idOwner depuis localstorage
    return this.get<AppointmentModel[]>(this._endpoint + `?userId=${userId}`);
  }
}
