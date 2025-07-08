import { Routes } from '@angular/router';
import { App } from './app';
import { HomePage } from './components/pages/homePage/homePage';
import { ImmobilienPage } from './components/pages/immobilienPage/immobilienPage';
import { KontaktePage } from './components/pages/kontaktePage/kontaktePage';
import { BeziehungenPage } from './components/pages/beziehungenPage/beziehungenPage';

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
