import { MeasureSectionBehavior } from '@/features/measures/interfaces/measureSectionBahavior';
import { ZardIcon } from '@/shared/components/icon';

export class MeasureSectionRespiratoryFrequency implements MeasureSectionBehavior {
  initBoardName(): string {
    return 'Suivi de la fréquence respiratoire';
  }

  initBoardIcon(): ZardIcon {
    return 'activity';
  }

  initResumeTitle(): string {
    return 'Dernières fréquences';
  }
}
