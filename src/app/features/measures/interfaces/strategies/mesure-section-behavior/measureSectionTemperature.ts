import { MeasureSectionBehavior } from '@/features/measures/interfaces/measureSectionBahavior';
import { MeasureSectionPropertiesModel } from '@/features/measures/models/measureSectionPropertiesModel';
import { inject } from '@angular/core';
import { MeasureModel } from '@/features/measures/models/measureModel';
import { HealthRecordStore } from '@/features/health-records/services/health-record.store';

export class MeasureSectionTemperature implements MeasureSectionBehavior {
  private _healthRecordStore = inject(HealthRecordStore);
  initSectionProperties(): MeasureSectionPropertiesModel {
    return {
      boardName: 'Suivi des températures',
      resumeTitle: 'Dernières températures',
      boardIcon: 'monitor',
    };
  }

  getMeasures(): MeasureModel[] {
    return this._healthRecordStore.temperatureArray();
  }

  getType(): string {
    return 'temperature';
  }
}
