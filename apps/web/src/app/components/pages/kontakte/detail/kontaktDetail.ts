import {
  Component,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { KontakteService } from '../../../../api/services';
import { KontaktAntwortMitBeziehungenDto } from '../../../../api/models';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

@Component({
  selector: 'kontakt-detail',
  styleUrl: './kontaktDetail.scss',
  standalone: true,
  templateUrl: './kontaktDetail.html',
  imports: [MatButtonModule],
})
export class KontaktDetail {
  route = inject(ActivatedRoute);
  service = inject(KontakteService);
  id = '';
  kontaktSignal: WritableSignal<undefined | KontaktAntwortMitBeziehungenDto> =
    signal(undefined);

  ngOnInit() {
    const routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    if (this.id) {
      this.service
        .kontakteControllerKontakt({ id: this.id })
        .subscribe((val) => this.kontaktSignal.set(val));
    }
  }
}
