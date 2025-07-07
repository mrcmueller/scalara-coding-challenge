import { Routes } from '@angular/router';
import { App } from './app';
import { HomePage } from './components/pages/homePage/homePage';
import { Immobilien } from './components/pages/immobilienPage/immobilien';
import { Kontakte } from './components/pages/kontaktePage/kontakte';
import { Beziehungen } from './components/pages/beziehungenPage/beziehungen';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'immobilien',
    component: Immobilien,
  },
  {
    path: 'kontakte',
    component: Kontakte,
  },
  {
    path: 'beziehungen',
    component: Beziehungen,
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
