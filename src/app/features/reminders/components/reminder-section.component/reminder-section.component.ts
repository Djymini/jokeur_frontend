import { Component, input } from '@angular/core';
import { DateCardComponent } from '@/internal-shared/components/date-card.component/date-card.component';
import { ZardButtonComponent } from '@/shared/components/button';
import { PageModel } from '@/shared/models/page-model';
import { Reminder } from '@/features/reminders/models/reminder.model';

@Component({
  selector: 'app-reminder-section',
  imports: [DateCardComponent, ZardButtonComponent],
  templateUrl: './reminder-section.component.html',
  styleUrl: './reminder-section.component.scss',
})
export class ReminderSectionComponent {
  reminderPage = input.required<PageModel<Reminder>>();
}
