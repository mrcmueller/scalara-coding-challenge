import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { KontakteService } from '../../../../api/services';
import { KontaktAntwortMitBeziehungenDto } from '../../../../api/models';

@Component({
  selector: 'kontakt-detail',
  styleUrl: './kontaktDetail.scss',
  standalone: true,
  templateUrl: './kontaktDetail.html',
})
export class KontaktDetail {
  id: string;
  kontaktSignal: Signal<KontaktAntwortMitBeziehungenDto | null>;
  constructor(kontakteService: KontakteService, route: ActivatedRoute) {
    this.id = route.snapshot.paramMap.get('id')!;
    this.kontaktSignal = toSignal(
      kontakteService.kontakteControllerKontakt({ id: this.id }),
      { initialValue: null },
    );
  }
}
