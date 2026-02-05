import { ZardIcon } from '@/shared/components/icon';

export interface MeasureSectionBehavior {
  initBoardName(): string;
  initResumeTitle(): string;
  initBoardIcon(): ZardIcon;
}
