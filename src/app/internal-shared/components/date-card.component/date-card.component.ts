import { Component, input } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { Reminder } from '@/features/reminders/models/reminder.model';
import { DatePipe } from '@angular/common';
import { DateCounterPipe } from '@/internal-shared/pipes/date-counter-pipe';

@Component({
  selector: 'app-date-card',
  imports: [ZardButtonComponent, ZardBadgeComponent, DatePipe, DateCounterPipe],
  templateUrl: './date-card.component.html',
  styleUrl: './date-card.component.scss',
})
export class DateCardComponent {
  reminder = input.required<Reminder>();
  hasDescription = input.required<boolean>();
}
