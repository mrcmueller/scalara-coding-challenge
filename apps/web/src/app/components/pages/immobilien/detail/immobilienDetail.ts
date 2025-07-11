import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImmobilienService } from '../../../../api/services';
import { ImmobilieAntwortMitBeziehungenDto } from '../../../../api/models';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'immobilien-detail',
  styleUrl: './immobilienDetail.scss',
  standalone: true,
  templateUrl: './immobilienDetail.html',
  imports: [MatButtonModule],
})
export class ImmobilienDetail {
  route = inject(ActivatedRoute);
  service = inject(ImmobilienService);
  id = '';
  immobilienSignal: WritableSignal<null | ImmobilieAntwortMitBeziehungenDto> =
    signal(null);

  ngOnInit() {
    const routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];

      if (this.id) {
        this.service
          .immobilienControllerImmobilie({ id: this.id })
          .subscribe((val) => this.immobilienSignal.set(val));
      }
    });
  }
}
