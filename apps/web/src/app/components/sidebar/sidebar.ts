import { Component } from '@angular/core';
import { title } from 'process';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class Sidebar {
  items = [
    {
      title: 'Immobilien',
      icon: '',
    },
    { title: 'Kontakte', icon: '' },
    { title: 'Beziehungen', icon: '' },
  ];
}
