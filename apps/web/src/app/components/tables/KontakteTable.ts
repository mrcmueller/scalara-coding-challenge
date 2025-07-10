import { DataSource } from '@angular/cdk/table';
import { Component, inject, Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class KontakteRefresh extends Subject<void> {
  constructor() {
    super();
  }

  refresh(): void {
    console.log('I am the refresh and I am executed!');
    this.next();
  }
}

export class KontakteDataSource
  extends DataSource<KontaktAntwortMitBeziehungenDto>
  implements Delete
{
  constructor(kontakteService: KontakteService) {
    super();
  }

  kontakteService = inject(KontakteService);
  refresh$ = inject(KontakteRefresh);
  data = this.refresh$.pipe(
    startWith(null),
    switchMap(() => {
      console.log('run');
      return this.kontakteService.kontakteControllerKontakte();
    }),
  );

  delete(id: string) {
    const sub = this.kontakteService
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
