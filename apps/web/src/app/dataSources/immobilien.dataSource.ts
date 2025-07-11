import { DataSource } from '@angular/cdk/table';
import { inject } from '@angular/core';
import { startWith, switchMap, Observable } from 'rxjs';
import { ImmobilieAntwortMitBeziehungenDto } from '../api/models';
import { ImmobilienService } from '../api/services';
import { ImmobilienRefresh } from '../services/immobilienRefresh.service';
import { Delete } from '../types/interfaces';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';

export class ImmobilienDataSource
  extends DataSource<ImmobilieAntwortMitBeziehungenDto>
  implements Delete
{
  constructor() {
    super();
  }

  service = inject(ImmobilienService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  refresh$ = inject(ImmobilienRefresh);
  data = this.refresh$.pipe(
    startWith(null),
    switchMap(() => {
      return this.service['immobilienControllerImmobilien']();
    }),
  );

  delete(id: string, event: Event) {
    event.stopPropagation();

    const sub = this.service
      .immobilienControllerLoescheImmobilie({ id })
      .subscribe(() => {
        this.refresh$.refresh();
      });
  }

  visit(id: string, event: Event) {
    this.router.navigate([`./${id}`], { relativeTo: this.route });
  }

  connect(): Observable<ImmobilieAntwortMitBeziehungenDto[]> {
    return this.data;
  }

  disconnect() {}
}
