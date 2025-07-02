import { Routes } from '@angular/router';
import { App } from './app';
import { Example } from './examplePage/example';
import { HomePage } from './homePage/homePage';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'example',
    component: Example,
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
