import {
  Component,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { KontakteService } from '../../../../api/services';
import { KontaktAntwortMitBeziehungenDto } from '../../../../api/models';
import { MatButtonModule } from '@angular/material/button';
import { delay, Observable, startWith, switchMap } from 'rxjs';
import { KontaktDetailRefresh } from '../../../../services/kontaktDetailRefresh.service';

@Component({
  selector: 'kontakt-detail',
  styleUrl: './kontaktDetail.scss',
  standalone: true,
  templateUrl: './kontaktDetail.html',
  imports: [MatButtonModule],
})
export class KontaktDetail {
  router = inject(Router);
  route = inject(ActivatedRoute);
  service = inject(KontakteService);
  refresh = inject(KontaktDetailRefresh);
  data: WritableSignal<null | KontaktAntwortMitBeziehungenDto> = signal(null);
  params?: { id?: string };

  ngOnInit() {
    // this.refresh.pipe(
    //   startWith(null),
    //   switchMap(() => {
    //     return this.service.kontakteControllerKontakt({id: ""});
    //   }),
    // );

    this.route.params.subscribe((params) => {
      this.params = params;
      // console.log('param update, kontakts');
      const id = params['id'];
      // console.log(params);

      if (id) {
        setTimeout(() => {
          this.service
            .kontakteControllerKontakt({ id })
            .subscribe((val) => this.data.set(val));
        }, 2000);
      }
    });

    // console.log(this.route.snapshot.routeConfig?.path);

    this.refresh.subscribe(() => {
      const routeConfig = this.route.snapshot.routeConfig?.path;
      if (
        typeof routeConfig === 'string' &&
        routeConfig.startsWith('kontakte/:id')
      ) {
      }
    });
  }

  ngOnDestroy() {}
}
