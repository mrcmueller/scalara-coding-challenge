import { Component } from '@angular/core';
import { KontakteTable } from '../../tables/KontakteTable';
import { MatButtonModule } from '@angular/material/button';
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
}
