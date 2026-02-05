import { MeasureSectionBehavior } from '@/features/measures/interfaces/measureSectionBahavior';
import { ZardIcon } from '@/shared/components/icon';

export class MeasureSectionTemperature implements MeasureSectionBehavior {
  initBoardName(): string {
    return 'Suivi des températures';
  }

  initBoardIcon(): ZardIcon {
    return 'monitor';
  }

  initResumeTitle(): string {
    return 'Dernières températures';
  }
}
