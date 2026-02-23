import { MeasureSectionBehavior } from '@/features/measures/interfaces/measureSectionBahavior';
import { MeasureSectionPropertiesModel } from '@/features/measures/models/measureSectionPropertiesModel';
import { inject, Signal } from '@angular/core';
import { MeasureModel } from '@/features/measures/models/measureModel';
import { HealthRecordStore } from '@/features/health-records/services/health-record.store';

export class MeasureSectionRespiratoryFrequency implements MeasureSectionBehavior {
  private _healthRecordStore = inject(HealthRecordStore);
  initSectionProperties(): MeasureSectionPropertiesModel {
    return {
      boardName: 'Suivi de la fréquence respiratoire',
      resumeTitle: 'Dernières fréquences',
      boardIcon: 'activity',
    };
  }

  getMeasures(): Signal<MeasureModel[]> {
    return this._healthRecordStore.respiratoryRateArray;
  }

  getType(): string {
    return 'respiratory rate';
  }
}
