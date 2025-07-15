import { DataSource } from '@angular/cdk/table';
import { inject } from '@angular/core';
import { Observable, BehaviorSubject, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BeziehungAntwortDto } from '../api/models';
import { BeziehungenService } from '../api/services';
import { BeziehungenRefresh } from '../services/beziehungenRefresh.service';

export class BeziehungenDataSource extends DataSource<BeziehungAntwortDto> {
  constructor() {
    super();
  }

  service = inject(BeziehungenService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  refresh$ = inject(BeziehungenRefresh);
  public id?: string;

  public loadingSubject = new BehaviorSubject<boolean>(false);

  public dataSubject = new BehaviorSubject<BeziehungAntwortDto[]>([]);

  getBeziehungen(kontaktId?: string) {
    this.loadingSubject.next(true);
    if (kontaktId) {
      this.id = kontaktId;
    }
    if (this.id) {
      this.service
        .beziehungenControllerBeziehungen({ kontaktId: this.id })
        .pipe(take(1))
        .subscribe({ next: (res) => this.handleFetchedData(res) });
    } else {
      this.service
        .beziehungenControllerBeziehungen()
        .pipe(take(1))
        .subscribe({ next: (res) => this.handleFetchedData(res) });
    }
  }

  dateStringToDatum(dateString: string) {
    const date = new Date(dateString);
    const result = date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    return result;
  }

  handleFetchedData(res: BeziehungAntwortDto[]) {
    const newArray = res.map((el) => {
      const { startdatum, enddatum, ...rest } = el;
      const formattedStartdatum = this.dateStringToDatum(startdatum);
      const formattedEnddatum = this.dateStringToDatum(enddatum);

      return {
        startdatum: formattedStartdatum,
        enddatum: formattedEnddatum,
        ...rest,
      };
    });
    this.dataSubject.next(newArray);
    this.loadingSubject.next(false);
  }

  delete(id: string, event: Event) {
    event.stopPropagation();
    const sub = this.service
      .beziehungenControllerLoescheBeziehung({ id })
      .subscribe(() => {
        this.refresh$.refresh();
      });
  }

  visit(id: string, event: Event) {
    this.router.navigate([`beziehungen/${id}`]);
  }

  connect(): Observable<BeziehungAntwortDto[]> {
    this.refresh$.subscribe(() => {
      this.getBeziehungen(this.id);
    });

    return this.dataSubject.asObservable();
  }

  disconnect() {}
}
