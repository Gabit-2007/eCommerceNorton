import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideLucideIcons, LucideUser, LucideShoppingCart, LucideShoppingCartPlus, LucideStar } from '@lucide/angular'

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideLucideIcons(LucideShoppingCart, LucideShoppingCartPlus, LucideStar, LucideUser)
  ]
};
