import { Component } from '@angular/core';

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
  ];
}
