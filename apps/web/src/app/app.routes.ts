import { Routes } from '@angular/router';
import { App } from './app';
import { HomePage } from './components/pages/home/homePage';
import { ImmobilienPage } from './components/pages/immobilien/immobilienPage';
import { KontaktePage } from './components/pages/kontakte/kontaktePage';
import { BeziehungenPage } from './components/pages/beziehungen/beziehungenPage';
import { KontaktDetail } from './components/pages/kontakte/detail/kontaktDetail';
import { KontaktErstellen } from './components/pages/kontakte/erstellen/kontaktErstellen';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'immobilien',
    component: ImmobilienPage,
  },
  {
    path: 'kontakte',
    component: KontaktePage,
  },
  {
    path: 'beziehungen',
    component: BeziehungenPage,
  },
  { path: 'kontakte/hinzufuegen', component: KontaktErstellen },
  { path: 'kontakte/:id', component: KontaktDetail },
  //   { path: 'immobilien', component:  },
  //   { path: 'immobilien/:id', component:  },
  //   { path: 'immobilien/neu', component:  },
  //   { path: 'beziehungen', component:  },
  //   { path: 'beziehungen/:id', component:  },
  //   { path: 'beziehungen/neu', component:  },
  //   { path: 'kontakte', component:  },
  //   { path: 'kontakte/:id', component:  },
  //   { path: 'kontakte/neu', component:  },
];
