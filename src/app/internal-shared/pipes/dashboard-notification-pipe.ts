import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashboardNotification',
})
export class DashboardNotificationPipe implements PipeTransform {

  transform(value: number, text: string): string {
    if (value > 1){
      return value + " " + text + "s";
    }

    return value + ' ' + text;
  }

}
