import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BeziehungenDataSource } from '../../../dataSources/beziehungen.dataSource';

@Component({
  selector: 'beziehungen-von-kontakt-table',
  styleUrl: './BeziehungenVonKontaktTable.scss',
  templateUrl: './BeziehungenVonKontaktTable.html',
  imports: [MatTableModule],
})
export class BeziehungenVonKontakteTable {
  @Input() dataSource = new BeziehungenDataSource();

  constructor() {}

  displayedColumns: string[] = [
    'immobilie',
    'beziehungstyp',
    'dienstleistungstyp',
    'startdatum',
    'enddatum',
    'action',
  ];

  ngOnInit() {}

  ngOnDestroy() {}
}
