import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'measure',
})
export class MeasurePipe implements PipeTransform {
  transform(value: number, type: string): string {
    switch (type.toUpperCase()) {
      case 'BPM':
        return value.toString() + ' bpm';
      case 'RESPIRATORY_RATE':
        return value.toString() + ' cpm';
      case 'TEMPERATURE':
        return value.toString() + ' °C';
      case 'WEIGHT':
        return value.toString() + ' kg';
      default:
        return value.toString() + ' inconnu';
    }
  }
}
