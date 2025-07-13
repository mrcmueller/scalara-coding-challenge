import { DataSource } from '@angular/cdk/table';
import { inject } from '@angular/core';
import { startWith, switchMap, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Delete } from '../types/interfaces';
import { BeziehungAntwortDto } from '../api/models';
import { BeziehungenService } from '../api/services';
import { BeziehungenRefresh } from '../services/beziehungenRefresh.service';

export class BeziehungenDataSource
  extends DataSource<BeziehungAntwortDto>
  implements Delete
{
  constructor() {
    super();
  }

  service = inject(BeziehungenService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  refresh$ = inject(BeziehungenRefresh);

  data = this.refresh$.pipe(
    startWith([]),
    switchMap(() => {
      return this.service.beziehungenControllerBeziehungen();
    }),
  );

  delete(id: string, event: Event) {
    event.stopPropagation();
    const sub = this.service
      .beziehungenControllerLoescheBeziehung({ id })
      .subscribe(() => {
        this.refresh$.refresh();
      });
  }

  visit(id: string, event: Event) {
    this.router.navigate([`./${id}`], { relativeTo: this.route });
  }

  connect(): Observable<BeziehungAntwortDto[]> {
    return this.data;
  }

  disconnect() {}
}
