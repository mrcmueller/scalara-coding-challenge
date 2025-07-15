import { DataSource } from '@angular/cdk/table';
import { inject } from '@angular/core';
import { startWith, switchMap, Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Delete } from '../types/interfaces';
import { BeziehungAntwortDto } from '../api/models';
import { BeziehungenService } from '../api/services';
import { BeziehungenRefresh } from '../services/beziehungenRefresh.service';

export class ExperimentalDataSource
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

  public loadingSubject = new BehaviorSubject<boolean>(false);

  public dataSubject = new BehaviorSubject<BeziehungAntwortDto[]>([]);

  connect(): Observable<BeziehungAntwortDto[]> {
    return this.dataSubject.asObservable();
  }

  disconnect() {}
}
