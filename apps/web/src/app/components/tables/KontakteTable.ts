import { DataSource } from '@angular/cdk/table';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { KontakteService } from '../../api/services';
import { KontaktAntwortMitBeziehungenDto } from '../../api/models';
import { MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'kontakte-table',
  styleUrl: './KontakteTable.scss',
  templateUrl: './KontakteTable.html',
  imports: [MatTableModule],
})
export class KontakteTable {
  dataSource: DataSource<KontaktAntwortMitBeziehungenDto>;

  constructor(kontakteService: KontakteService) {
    this.dataSource = new KontakteDataSource(kontakteService);
  }

  displayedColumns: string[] = ['name', 'adresse', 'land'];
}

export class KontakteDataSource extends DataSource<KontaktAntwortMitBeziehungenDto> {
  data: Observable<KontaktAntwortMitBeziehungenDto[]>;

  constructor(kontakteService: KontakteService) {
    super();
    this.data = kontakteService.kontakteControllerKontakte();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<KontaktAntwortMitBeziehungenDto[]> {
    return this.data;
  }

  disconnect() {}
}
