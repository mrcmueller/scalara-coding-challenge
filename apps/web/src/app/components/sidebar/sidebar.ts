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
      title: 'Home',
      link: '/',
      icon: '/icons/sidebar/Logo.svg',
      classes: 'logoIcon w-10 mb-2',
    },
    {
      title: 'Immobilien',
      link: '/immobilien',
      icon: '/icons/sidebar/Building.svg',
      classes: 'immobilienIcon w-6',
    },
    {
      title: 'Kontakte',
      link: '/kontakte',
      icon: '/icons/sidebar/Contacts.svg',
      classes: 'kontakteIcon w-6',
    },
    {
      title: 'Beziehungen',
      link: '/beziehungen',
      icon: '/icons/sidebar/Bill.svg',
      classes: 'beziehungenIcon w-6',
    },
  ];
}
