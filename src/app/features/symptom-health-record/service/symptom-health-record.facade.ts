import { inject, Injectable } from '@angular/core';
import { SymptomHealthRecordApi } from '@/features/symptom-health-record/service/symptom-health-record.api';
import { CreateUpdateSymptomRecordDto } from '@/features/symptom-health-record/model/create-update-symptom-record-dto';
import { SymptomHealthRecordStore } from '@/features/symptom-health-record/service/symptom-health-record.store';
import { SymptomHealthRecordDTO } from '@/features/symptom-health-record/model/symptom-record-dto';
import { toast } from 'ngx-sonner';
import { SymptomHealthRecordRules } from '@/features/symptom-health-record/domain/symptom-health-record-rules';

@Injectable({ providedIn: 'root' })
export class SymptomHealthRecordFacade {
  private _symptomHealthRecordApi: SymptomHealthRecordApi = inject(SymptomHealthRecordApi);
  private _symptomRecordStore: SymptomHealthRecordStore = inject(SymptomHealthRecordStore);

  async addSymptomRecord(id: number, addSymptom: CreateUpdateSymptomRecordDto): Promise<void> {
    SymptomHealthRecordRules.validate(addSymptom);
    await this._symptomHealthRecordApi.createSymptomRecord(id, addSymptom);
    toast.success('Valeur ajoutée au carnet', {
      duration: 2000,
    });
  }

  async getSymptomRecord(healthRecordId: number): Promise<SymptomHealthRecordDTO[]> {
    const response = await this._symptomHealthRecordApi.getAllSymptomsRecord(healthRecordId);
    this._symptomRecordStore.setSymptomsRecord(response);
    return this._symptomRecordStore.symptomRecordArray();
  }

  async modify(
    healthRecordId: number,
    updatedSymptom: CreateUpdateSymptomRecordDto,
  ): Promise<void> {
    SymptomHealthRecordRules.validate(updatedSymptom);

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
