import { Component, inject } from '@angular/core';
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
  private route = inject(ActivatedRoute);
  private kontakteService = inject(KontakteService);
  id = this.route.snapshot.paramMap.get('id')!;
  kontaktSignal = toSignal(
    this.kontakteService.kontakteControllerKontakt({ id: this.id }),
    { initialValue: null },
  );
}
