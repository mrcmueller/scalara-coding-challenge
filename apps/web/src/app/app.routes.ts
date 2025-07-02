import { Routes } from '@angular/router';
import { App } from './homePage/app';
import { Exammple } from './examplePage/example';

export const routes: Routes = [
  {
    path: '',
    component: App,
  },
  {
    path: 'example',
    component: Exammple,
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
