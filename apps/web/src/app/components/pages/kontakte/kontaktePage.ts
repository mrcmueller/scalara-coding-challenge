import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { KontakteTable } from '../../tables/kontakte/KontakteTable';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'kontakte',
  standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './kontaktePage.html',
  styleUrl: './kontaktePage.scss',
  imports: [MatButtonModule, KontakteTable],
})
export class KontaktePage {
  protected title = 'web';

  ngOnInit() {
    console.log(
      `${Math.floor(Math.random() * 100)} Initialized: ${this.constructor.name}`,
    );
  }

  ngOnDestroy() {
    console.log(
      `${Math.floor(Math.random() * 100)} Destroyed: ${this.constructor.name}`,
    );
  }
}
