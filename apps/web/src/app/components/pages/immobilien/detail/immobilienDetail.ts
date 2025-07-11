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
  immobilienSignal: WritableSignal<null | ImmobilieAntwortMitBeziehungenDto> =
    signal(null);

  ngOnInit() {
    console.log(
      `${Math.floor(Math.random() * 100)} Initialized: ${this.constructor.name}`,
    );

    this.route.params.subscribe((params) => {
      console.log('param update, immos');

      const id = params['id'];

      if (id) {
        this.service
          .immobilienControllerImmobilie({ id })
          .subscribe((val) => this.immobilienSignal.set(val));
      }
    });
  }

  ngOnDestroy() {
    console.log(
      `${Math.floor(Math.random() * 100)} Destroyed: ${this.constructor.name}`,
    );
  }
}
