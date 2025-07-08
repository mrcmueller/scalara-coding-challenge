import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'immobilien-root',
  // imports: [RouterOutlet],
  templateUrl: './immobilien.html',
  styleUrl: './immobilien.scss',
})
@Injectable({ providedIn: 'root' })
export class Immobilien {
  private http = inject(HttpClient);
  protected title = 'web';
  data = this.http
    .get('http://localhost:3000/immobilien')
    .subscribe((config) => {
      // process configuration
    });
  constructor() {}
}
