import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'kontakt-erstellen',
  standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './kontaktErstellen.html',
  styleUrl: './kontaktErstellen.scss',
  imports: [MatButtonModule],
})
export class KontaktErstellen {
  protected title = 'web';
  // private kontakteService = inject(KontakteService);
  // kontakteSignal = toSignal(this.kontakteService.kontakteControllerKontakte(), {
  //   initialValue: null,
  // });
}
