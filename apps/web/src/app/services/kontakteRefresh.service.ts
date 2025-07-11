import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KontakteRefresh extends Subject<void> {
  constructor() {
    super();
  }

  refresh(): void {
    this.next();
  }
}
