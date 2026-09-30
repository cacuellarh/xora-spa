import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, InMemoryScrollingFeature, InMemoryScrollingOptions } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { providePlanCatalog, provideSeo } from '@c-code/c-code-fw/ui';
import { routes } from './app.routes';
import { DEFAULT_SEO_IMAGE, SITE_URL } from './site.config';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, inMemoryScrollingFeature),
    provideClientHydration(withEventReplay()),
    // withFetch permite que el prerender lea los JSON de assets/data.
    provideHttpClient(withFetch()),
    // Xora no tiene priceRanges.json: el filtro solo ofrece servicios incluidos.
    providePlanCatalog({ priceRangesUrl: null }),
    provideSeo({ siteUrl: SITE_URL, defaultImage: DEFAULT_SEO_IMAGE }),
  ]
};
