import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { KontakteService } from '../../../api/services';
import { KontaktAntwortMitBeziehungenDto } from '../../../api/models';

@Component({
  selector: 'kontakt-detail',
  standalone: true,
  templateUrl: './kontakteDetail.html',
})
export class KontakteDetail {
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
