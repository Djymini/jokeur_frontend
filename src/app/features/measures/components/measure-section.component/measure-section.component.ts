import { Component, input, OnInit } from '@angular/core';
import { MeasureBoardComponent } from '@/features/measures/components/measure-board.component/measure-board.component';
import { MeasureResumeComponent } from '@/features/measures/components/measure-resume.component/measure-resume.component';
import { MeasureType } from '@/features/measures/utils/measureTypeEnum';
import { ZardIcon } from '@/shared/components/icon';

@Component({
  selector: 'app-measure-section',
  imports: [MeasureBoardComponent, MeasureResumeComponent],
  templateUrl: './measure-section.component.html',
  styleUrl: './measure-section.component.scss',
})
export class MeasureSectionComponent implements OnInit {
  type = input.required<MeasureType>();

  boardName: string = '';
  boardIcon: ZardIcon = 'check';
  resumeTitle: string = '';

  ngOnInit(): void {
    switch (this.type()) {
      case MeasureType.WEIGHT:
        this.boardName = 'Suivi du poids';
        this.boardIcon = 'popcorn';
        this.resumeTitle = 'Dernières pesées';
        break;
      case MeasureType.BPM:
        this.boardName = 'Suivi fréquence cardiaque';
        this.boardIcon = 'heart';
        this.resumeTitle = 'Dernières mesures';
        break;
      case MeasureType.RESPIRATORY_RATE:
        this.boardName = 'Suivi fréquence respiratoire';
        this.boardIcon = 'activity';
        this.resumeTitle = 'Dernières mesures';
        break;
      case MeasureType.TEMPERATURE:
        this.boardName = 'Suivi température';
        this.boardIcon = 'sun';
        this.resumeTitle = 'Dernières mesures';
        break;
      default:
        this.boardName = 'Suivi température';
        this.boardIcon = 'sun';
        this.resumeTitle = 'Dernières mesures';
        break;
    }
  }
}
