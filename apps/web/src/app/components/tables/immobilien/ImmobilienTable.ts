import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ImmobilienDataSource } from '../../../dataSources/immobilien.dataSource';

@Component({
  selector: 'immobilien-table',
  styleUrl: './ImmobilienTable.scss',
  templateUrl: './ImmobilienTable.html',
  imports: [MatTableModule],
})
export class ImmobilienTable {
  dataSource: ImmobilienDataSource;

  constructor() {
    this.dataSource = new ImmobilienDataSource();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  displayedColumns: string[] = [
    'name',
    'adresse',
    'land',
    'beschreibung',
    'action',
  ];
}
