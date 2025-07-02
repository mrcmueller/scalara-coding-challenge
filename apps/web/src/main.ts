import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/homePage/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
