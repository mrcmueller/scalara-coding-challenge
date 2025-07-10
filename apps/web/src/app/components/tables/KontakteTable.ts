import { DataSource } from '@angular/cdk/table';
import { Component } from '@angular/core';
import { Observable, Subject, switchMap, startWith, Subscription } from 'rxjs';
import { KontakteService } from '../../api/services';
import { KontaktAntwortMitBeziehungenDto } from '../../api/models';
import { MatTableModule } from '@angular/material/table';

interface Delete {
  delete: (id: string) => void;
}

@Component({
  selector: 'kontakte-table',
  styleUrl: './KontakteTable.scss',
  templateUrl: './KontakteTable.html',
  imports: [MatTableModule],
})
export class KontakteTable {
  dataSource: DataSource<KontaktAntwortMitBeziehungenDto> & Delete;

  constructor(kontakteService: KontakteService) {
    this.dataSource = new KontakteDataSource(kontakteService);
  }

  displayedColumns: string[] = ['name', 'adresse', 'land', 'action'];
}

export class KontakteDataSource
  extends DataSource<KontaktAntwortMitBeziehungenDto>
  implements Delete
{
  kontakteService: KontakteService;
  refresh$ = new Subject<void>();
  data: Observable<KontaktAntwortMitBeziehungenDto[]>;

  constructor(kontakteService: KontakteService) {
    super();
    this.kontakteService = kontakteService;
    this.data = this.refresh$.pipe(
      startWith(null),
      switchMap(() => this.kontakteService.kontakteControllerKontakte()),
    );
  }

  delete(id: string) {
    const sub = this.kontakteService
      .kontakteControllerLoescheKontakte({ id })
      .subscribe(() => {
        this.refresh$.next();
      });
  }

  connect(): Observable<KontaktAntwortMitBeziehungenDto[]> {
    return this.data;
  }

  disconnect() {}
}
