import { MeasureSectionPropertiesModel } from '@/features/measures/models/measureSectionPropertiesModel';
import { MeasureModel } from '@/features/measures/models/measureModel';
import { Signal } from '@angular/core';

export interface MeasureSectionBehavior {
  initSectionProperties(): MeasureSectionPropertiesModel;
  getMeasures(): Signal<MeasureModel[]>;
  getType(): string;
}
