import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KontaktDetailRefresh extends Subject<void> {
  constructor() {
    super();
  }

  refresh(): void {
    this.next();
  }
}
