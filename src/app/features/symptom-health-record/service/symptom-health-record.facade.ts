import { inject, Injectable } from '@angular/core';
import { SymptomHealthRecordApi } from '@/features/symptom-health-record/service/symptom-health-record.api';
import { CreateUpdateSymptomRecordDto } from '@/features/symptom-health-record/domain/create-update-symptom-record-dto';
import { SymptomHealthRecordStore } from '@/features/symptom-health-record/service/symptom-health-record.store';
import { SymptomHealthRecordDTO } from '@/features/symptom-health-record/domain/symptom-record-dto';
import { toast } from 'ngx-sonner';

@Injectable({ providedIn: 'root' })
export class SymptomHealthRecordFacade {
  private _symptomHealthRecordApi: SymptomHealthRecordApi = inject(SymptomHealthRecordApi);
  private _symptomRecordStore: SymptomHealthRecordStore = inject(SymptomHealthRecordStore);

  async addSymptomRecord(id: number, addSymptom: CreateUpdateSymptomRecordDto): Promise<void> {
    await this._symptomHealthRecordApi.createSymptomRecord(id, addSymptom);

    toast.success('Valeur ajoutée au carnet', {
      duration: 2000,
    });
  }

  async getSymptomRecord(healthRecordId: number): Promise<SymptomHealthRecordDTO[]> {
    const response = await this._symptomHealthRecordApi.getAllSymptomsRecord(healthRecordId);
    console.log('avant : ', this._symptomRecordStore.symptomRecordArray());

    this._symptomRecordStore.setSymptomsRecord(response);
    console.log('response : ', response);
    console.log('après : ', this._symptomRecordStore.symptomRecordArray());
    return this._symptomRecordStore.symptomRecordArray();
  }

  async modify(
    healthRecordId: number,
    updatedSymptom: CreateUpdateSymptomRecordDto,
  ): Promise<void> {
    await this._symptomHealthRecordApi.updateSymptomRecord(healthRecordId, updatedSymptom);

    this._symptomRecordStore.setSymptomsRecord(await this.getSymptomRecord(healthRecordId));

    toast.success('Valeur modifiée dans le carnet', {
      duration: 2000,
    });
  }

  async remove(sypmtomRecordId: number): Promise<void> {
    const msgConfirmation = await this._symptomHealthRecordApi.deleteSymptomRecord(sypmtomRecordId);
    this._symptomRecordStore.removeSymptomRecord(sypmtomRecordId);

    toast.success(msgConfirmation, {
      duration: 2000,
    });
  }
}
