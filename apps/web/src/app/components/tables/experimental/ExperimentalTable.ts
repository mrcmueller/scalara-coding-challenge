import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BeziehungenDataSource } from '../../../dataSources/beziehungen.dataSource';
import { DataSource } from '@angular/cdk/table';
import { ListDataSource } from '../../../types/interfaces';
import { ExperimentalDataSource } from '../../../dataSources/experimental.dataSource';

@Component({
  selector: 'experimental-table',
  styleUrl: './ExperimentalTable.scss',
  templateUrl: './ExperimentalTable.html',
  imports: [MatTableModule],
})
export class ExperimentalTable {
  @Input() dataSource = new ExperimentalDataSource();

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
