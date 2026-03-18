import { Pipe, PipeTransform } from '@angular/core';

const RECENT_THRESHOLD_DAYS = 7;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

@Pipe({
  name: 'isRecent',
  standalone: true,
})
export class IsRecentPipe implements PipeTransform {
  transform(publishedAt: Date | string): boolean {
    if (!publishedAt) return false;

    const published =
      typeof publishedAt === 'string'
        ? new Date(publishedAt.includes('T') ? publishedAt : publishedAt + 'T00:00:00')
        : publishedAt;

    if (isNaN(published.getTime())) return false;

    const diffDays = (Date.now() - published.getTime()) / MS_PER_DAY;
    return diffDays <= RECENT_THRESHOLD_DAYS;
  }
}
