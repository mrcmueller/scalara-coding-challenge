import { Component } from '@angular/core';
import { ImmobilienTable } from '../../tables/immobilien/ImmobilienTable';
import { MatButtonModule } from '@angular/material/button';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'immobilien',
  standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './immobilienPage.html',
  styleUrl: './immobilienPage.scss',
  imports: [MatButtonModule, ImmobilienTable],
})
export class ImmobilienPage {
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
