import { DataSource } from '@angular/cdk/table';
import { inject } from '@angular/core';
import { startWith, switchMap, Observable } from 'rxjs';
import { KontaktAntwortMitBeziehungenDto } from '../api/models';
import { KontakteService } from '../api/services';
import { KontakteRefresh } from '../services/kontakteRefresh.service';

export interface Delete {
  delete: (id: string) => void;
}

export class KontakteDataSource
  extends DataSource<KontaktAntwortMitBeziehungenDto>
  implements Delete
{
  constructor() {
    super();
  }

  service = inject(KontakteService);
  refresh$ = inject(KontakteRefresh);
  data = this.refresh$.pipe(
    startWith(null),
    switchMap(() => {
      return this.service['kontakteControllerKontakte']();
    }),
  );

  delete(id: string) {
    const sub = this.service
      .kontakteControllerLoescheKontakte({ id })
      .subscribe(() => {
        this.refresh$.refresh();
      });
  }

  connect(): Observable<KontaktAntwortMitBeziehungenDto[]> {
    return this.data;
  }

  disconnect() {}
}
