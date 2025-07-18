import { DataSource } from '@angular/cdk/table';
import { inject } from '@angular/core';
import { startWith, switchMap, Observable } from 'rxjs';
import { KontaktAntwortMitBeziehungenDto } from '../api/models';
import { KontakteService } from '../api/services';
import { KontakteRefresh } from '../services/kontakteRefresh.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Delete, ListDataSource } from '../types/interfaces';

export class KontakteDataSource
  extends DataSource<KontaktAntwortMitBeziehungenDto>
  implements Delete
{
  constructor() {
    super();
  }

  service = inject(KontakteService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  refresh$ = inject(KontakteRefresh);

  data = this.refresh$.pipe(
    startWith([]),
    switchMap(() => {
      return this.service['kontakteControllerKontakte']();
    }),
  );

  delete(id: string, event: Event) {
    event.stopPropagation();
    const sub = this.service
      .kontakteControllerLoescheKontakte({ id })
      .subscribe(() => {
        this.refresh$.refresh();
      });
  }

  visit(id: string, event: Event) {
    this.router.navigate([`./${id}`], { relativeTo: this.route });
  }

  connect(): Observable<KontaktAntwortMitBeziehungenDto[]> {
    return this.data;
  }

  disconnect() {}
}
