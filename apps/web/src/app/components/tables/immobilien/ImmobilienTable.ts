import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ImmobilienDataSource } from '../../../dataSources/immobilien.dataSource';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'immobilien-table',
  styleUrl: './ImmobilienTable.scss',
  templateUrl: './ImmobilienTable.html',
  imports: [MatTableModule],
})
export class ImmobilienTable {
  @Input() dataSource = new ImmobilienDataSource();

  constructor() {}

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
