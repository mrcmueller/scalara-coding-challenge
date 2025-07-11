import { DataSource } from '@angular/cdk/table';
import { inject } from '@angular/core';
import { startWith, switchMap, Observable } from 'rxjs';
import { ImmobilieAntwortMitBeziehungenDto } from '../api/models';
import { ImmobilienService } from '../api/services';
import { ImmobilienRefresh } from '../services/immobilienRefresh.service';
import { Delete } from './kontakte.dataSource';

export class ImmobilienDataSource
  extends DataSource<ImmobilieAntwortMitBeziehungenDto>
  implements Delete
{
  constructor() {
    super();
  }

  service = inject(ImmobilienService);
  refresh$ = inject(ImmobilienRefresh);
  data = this.refresh$.pipe(
    startWith(null),
    switchMap(() => {
      return this.service['immobilienControllerImmobilien']();
    }),
  );

  delete(id: string) {
    const sub = this.service
      .immobilienControllerLoescheImmobilie({ id })
      .subscribe(() => {
        this.refresh$.refresh();
      });
  }

  connect(): Observable<ImmobilieAntwortMitBeziehungenDto[]> {
    return this.data;
  }

  disconnect() {}
}
