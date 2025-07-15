import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { KontakteDataSource } from '../../../dataSources/kontakte.dataSource';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'kontakte-table',
  styleUrl: './KontakteTable.scss',
  templateUrl: './KontakteTable.html',
  imports: [MatTableModule],
})
export class KontakteTable {
  @Input() dataSource = new KontakteDataSource();

  constructor() {}

  displayedColumns: string[] = ['name', 'adresse', 'land', 'action'];

  ngOnInit() {}

  ngOnDestroy() {}
}
