import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BeziehungenDataSource } from '../../../dataSources/beziehungen.dataSource';

@Component({
  selector: 'beziehungen-table',
  styleUrl: './BeziehungenTable.scss',
  templateUrl: './BeziehungenTable.html',
  imports: [MatTableModule],
})
export class BeziehungenTable {
  dataSource: BeziehungenDataSource;

  constructor() {
    this.dataSource = new BeziehungenDataSource();
  }

  displayedColumns: string[] = [
    'kontakt',
    'immobilie',
    'beziehungstyp',
    'dienstleistungs',
  ];

  ngOnInit() {}

  ngOnDestroy() {}
}
