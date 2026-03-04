import { MeasureSectionBehavior } from '@/features/measures/interfaces/measureSectionBahavior';
import { MeasureSectionPropertiesModel } from '@/features/measures/models/measureSectionPropertiesModel';
import { MeasureModel } from '@/features/measures/models/measureModel';
import { inject, Signal } from '@angular/core';
import { HealthRecordStore } from '@/features/health-records/services/health-record.store';

export class MeasureSectionBpm implements MeasureSectionBehavior {
  private _healthRecordStore = inject(HealthRecordStore);
  initSectionProperties(): MeasureSectionPropertiesModel {
    return {
      boardName: 'Suivi de la fréquence cardiaque',
      resumeTitle: 'Dernières fréquences',
      boardIcon: 'heart',
    };
  }

  getMeasures(): Signal<MeasureModel[]> {
    return this._healthRecordStore.bpmArray;
  }

  getType(): string {
    return 'bpm';
  }
}
