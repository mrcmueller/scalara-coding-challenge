import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { KontakteService } from '../../../api/services';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'kontakte-root',
  standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './kontaktePage.html',
  styleUrl: './kontaktePage.scss',
})
export class KontaktePage {
  protected title = 'web';
  private kontakteService = inject(KontakteService);
  kontakteSignal = toSignal(this.kontakteService.kontakteControllerKontakte(), {
    initialValue: null,
  });
}
