import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { KontakteDataSource } from '../../../dataSources/kontakte.dataSource';

@Component({
  selector: 'kontakte-table',
  styleUrl: './KontakteTable.scss',
  templateUrl: './KontakteTable.html',
  imports: [MatTableModule],
})
export class KontakteTable {
  dataSource: KontakteDataSource;

  constructor() {
    this.dataSource = new KontakteDataSource();
  }

  displayedColumns: string[] = ['name', 'adresse', 'land', 'action'];

  ngOnInit() {
    console.log(
      `${Math.floor(Math.random() * 100)} Initialized: ${this.constructor.name}`,
    );
  }

  ngOnDestroy() {
    console.log(
      `${Math.floor(Math.random() * 100)} Destroyed: ${this.constructor.name}`,
    );
  }
}
