import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BeziehungenDataSource } from '../../../dataSources/beziehungen.dataSource';

@Component({
  selector: 'beziehungen-table',
  styleUrl: './BeziehungenTable.scss',
  templateUrl: './BeziehungenTable.html',
  imports: [MatTableModule],
})
export class BeziehungenTable {
  @Input() dataSource = new BeziehungenDataSource();

  constructor() {}

  displayedColumns: string[] = [
    'kontakt',
    'immobilie',
    'beziehungstyp',
    'startdatum',
    'enddatum',
    'dienstleistungstyp',
    'action',
  ];

  ngOnInit() {
    this.dataSource.getBeziehungen();
  }

  ngOnDestroy() {}
}
