import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'immobilien',
  // imports: [RouterOutlet],
  standalone: true,
  templateUrl: './immobilienPage.html',
  styleUrl: './immobilienPage.scss',
})
export class ImmobilienPage {
  protected title = 'web';
}
