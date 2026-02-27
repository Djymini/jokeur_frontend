import { Injectable } from '@angular/core';
import { BaseApi } from '@/internal-shared/services/base.api';
import { Vaccine } from '@/features/vaccines/models/vaccine.model';
import { VaccineRequestDto } from '@/features/vaccines/models/vaccineRequestDto';

@Injectable({
  providedIn: 'root',
})
export class VaccinesApi extends BaseApi {
  async getVaccine(endpoint: string): Promise<Vaccine[]> {
    return this.get<Vaccine[]>('/vaccines/' + endpoint);
  }

  async addVaccine(vaccineRequest: VaccineRequestDto): Promise<Vaccine> {
    return this.post<Vaccine>('/vaccines', vaccineRequest);
  }

  async modifyVaccine(vaccineNewValue: Vaccine): Promise<Vaccine> {
    return this.put<Vaccine>(
      `/vaccines/${vaccineNewValue.healthRecordId}/${vaccineNewValue.id}`,
      vaccineNewValue,
    );
  }

  async deleteVaccine(vaccineRequest: Vaccine): Promise<string> {
    return this.delete<string>(`/vaccines/${vaccineRequest.healthRecordId}/${vaccineRequest.id}`);
  }
}
