import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private _count:number = 0;

  increment(): void {
    this._count++;
  }

  getCount(): number {
    return this._count;
  }
}
