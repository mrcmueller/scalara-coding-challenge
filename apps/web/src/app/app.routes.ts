import { Routes } from '@angular/router';
import { App } from './app';
import { HomePage } from './components/pages/home/homePage';
import { ImmobilienPage } from './components/pages/immobilien/immobilienPage';
import { KontaktePage } from './components/pages/kontakte/kontaktePage';
import { BeziehungenPage } from './components/pages/beziehungen/beziehungenPage';
import { KontaktDetail } from './components/pages/kontakte/detail/kontaktDetail';
import { KontaktErstellenOderBearbeiten } from './components/pages/kontakte/erstellenOderBearbeiten/kontaktErstellenOderBearbeiten';
import { ImmobilieErstellenOderBearbeiten } from './components/pages/immobilien/erstellenOderBearbeiten/immobilieErstellenOderBearbeiten';
import { ImmobilienDetail } from './components/pages/immobilien/detail/immobilienDetail';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'beziehungen',
    component: BeziehungenPage,
  },
  {
    path: 'immobilien',
    component: ImmobilienPage,
  },
  {
    path: 'immobilien/hinzufuegen',
    component: ImmobilieErstellenOderBearbeiten,
  },
  {
    path: 'immobilien/:immobilienId',
    component: ImmobilienDetail,
  },
  {
    path: 'immobilien/:immobilienId/bearbeiten',
    component: ImmobilieErstellenOderBearbeiten,
  },
  {
    path: 'kontakte',
    component: KontaktePage,
  },
  { path: 'kontakte/hinzufuegen', component: KontaktErstellenOderBearbeiten },
  { path: 'kontakte/:kontaktId', component: KontaktDetail },
  {
    path: 'kontakte/:kontaktId/bearbeiten',
    component: KontaktErstellenOderBearbeiten,
  },

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
