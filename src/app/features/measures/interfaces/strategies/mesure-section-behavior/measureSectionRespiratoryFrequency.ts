import { MeasureSectionBehavior } from '@/features/measures/interfaces/measureSectionBahavior';
import { MeasureSectionPropertiesModel } from '@/features/measures/models/measureSectionPropertiesModel';
import { inject } from '@angular/core';
import { HealthRecordStore } from '@/features/health-record/services/health-record-store';
import { MeasureModel } from '@/features/measures/models/measureModel';

export class MeasureSectionRespiratoryFrequency implements MeasureSectionBehavior {
  private _healthRecordStore = inject(HealthRecordStore);
  initSectionProperties(): MeasureSectionPropertiesModel {
    return {
      boardName: 'Suivi de la fréquence respiratoire',
      resumeTitle: 'Dernières fréquences',
      boardIcon: 'activity',
    };
  }

  getMeasures(): MeasureModel[] {
    return this._healthRecordStore.respiratoryRateArray();
  }

  getType(): string {
    return "respiratory rate";
  }
}
