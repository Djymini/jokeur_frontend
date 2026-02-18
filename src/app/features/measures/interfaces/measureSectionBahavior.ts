import { MeasureSectionPropertiesModel } from '@/features/measures/models/measureSectionPropertiesModel';
import { MeasureModel } from '@/features/measures/models/measureModel';

export interface MeasureSectionBehavior {
  initSectionProperties(): MeasureSectionPropertiesModel;
  getMeasures(): MeasureModel[];
  getType(): string;
}
