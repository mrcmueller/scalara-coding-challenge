import { DataSource } from '@angular/cdk/table';
import { inject } from '@angular/core';
import { Observable, BehaviorSubject, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BeziehungAntwortDto } from '../api/models';
import { BeziehungenService } from '../api/services';
import { KontakteRefresh } from '../services/kontakteRefresh.service';

export class ExperimentalDataSource extends DataSource<BeziehungAntwortDto> {
  constructor() {
    super();
  }

  service = inject(BeziehungenService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  refresh$ = inject(KontakteRefresh);
  id?: string;

  public loadingSubject = new BehaviorSubject<boolean>(false);

  public dataSubject = new BehaviorSubject<BeziehungAntwortDto[]>([]);

  getBeziehungen(kontaktId?: string) {
    this.id = kontaktId;
    this.loadingSubject.next(true);
    if (kontaktId) {
      this.service
        .beziehungenControllerBeziehungen({ kontaktId })
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
    const formattedDate = date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formattedDate;
  }

  handleFetchedData(res: BeziehungAntwortDto[]) {
    const resCopy = [...res];
    resCopy.forEach((el) => {
      el.startdatum = this.dateStringToDatum(el.startdatum);
      el.enddatum = this.dateStringToDatum(el.enddatum);
    });
    this.dataSubject.next(resCopy);
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
    this.router.navigate([`./${id}`], { relativeTo: this.route });
  }

  connect(): Observable<BeziehungAntwortDto[]> {
    this.refresh$.subscribe(() => {
      this.getBeziehungen(this.id);
    });

    return this.dataSubject.asObservable();
  }

  disconnect() {}
}
