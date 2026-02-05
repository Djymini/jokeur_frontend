import { MeasureSectionBehavior } from '@/features/measures/interfaces/measureSectionBahavior';
import { ZardIcon } from '@/shared/components/icon';

export class MeasureSectionWeight implements MeasureSectionBehavior {
  initBoardName(): string {
    return 'Suivi du poids';
  }

  initBoardIcon(): ZardIcon {
    return 'popcorn';
  }

  initResumeTitle(): string {
    return 'Dernières pesées';
  }
}
