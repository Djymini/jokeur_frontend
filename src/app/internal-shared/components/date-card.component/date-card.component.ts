import { Component, computed, input } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { Reminder } from '@/features/reminders/models/reminder.model';
import { DatePipe } from '@angular/common';
import { DateCounterPipe } from '@/internal-shared/pipes/date-counter-pipe';
import { Appointment } from '@/features/appointment/models/appointment.model';

@Component({
  selector: 'app-date-card',
  imports: [ZardButtonComponent, ZardBadgeComponent, DatePipe, DateCounterPipe],
  templateUrl: './date-card.component.html',
  styleUrl: './date-card.component.scss',
})
export class DateCardComponent {
  date = input.required<Reminder | Appointment>();
  hasDescription = input.required<boolean>();

  displayData = computed(() => {
    const item = this.date();

    if ('description' in item) {
      return {
        title: item.description,
        timestamp: item.reminderDate,
      };
    }

    return {
      title: item.reason,
      timestamp: item.dateTime,
    };
  });
}
