import { MeasureSectionBehavior } from '@/features/measures/interfaces/measureSectionBahavior';
import { ZardIcon } from '@/shared/components/icon';

export class MeasureSectionBpm implements MeasureSectionBehavior {
  initBoardName(): string {
    return 'Suivi de la fréquence cardiaque';
  }

  initBoardIcon(): ZardIcon {
    return 'heart';
  }

  initResumeTitle(): string {
    return 'Dernières fréquences';
  }
}
