import { Injectable } from '@angular/core';
import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { formatDate } from '@angular/common';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
  override dayViewTitle({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'EEEE d MMMM yyyy', locale ?? 'fr-FR');
  }

  override weekViewTitle({ date, locale }: DateFormatterParams): string {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 6);
    return `${formatDate(start, 'd MMM', locale ?? 'fr-FR')} - ${formatDate(end, 'd MMM yyyy', locale ?? 'fr-FR')}`;
  }

  override monthViewTitle({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'MMMM yyyy', locale ?? 'fr-FR');
  }
}
