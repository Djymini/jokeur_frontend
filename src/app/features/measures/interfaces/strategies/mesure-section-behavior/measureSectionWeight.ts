import { MeasureSectionBehavior } from '@/features/measures/interfaces/measureSectionBahavior';
import { MeasureSectionPropertiesModel } from '@/features/measures/models/measureSectionPropertiesModel';
import { inject } from '@angular/core';
import { MeasureModel } from '@/features/measures/models/measureModel';
import { HealthRecordStore } from '@/features/health-records/services/health-record.store';

export class MeasureSectionWeight implements MeasureSectionBehavior {
  private _healthRecordStore = inject(HealthRecordStore);
  initSectionProperties(): MeasureSectionPropertiesModel {
    return {
      boardName: 'Suivi du poids',
      resumeTitle: 'Dernières pesées',
      boardIcon: 'popcorn',
    };
  }

  getMeasures(): MeasureModel[] {
    return this._healthRecordStore.weightArray();
  }

  getType(): string {
    return 'weight';
  }
}
