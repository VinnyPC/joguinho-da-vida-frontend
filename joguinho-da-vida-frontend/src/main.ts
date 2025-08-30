// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { App } from './app/app';

// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth } from 'angular-auth-oidc-client';
import { routes } from './app/app.routes';
import { App } from './app/app';
import { provideRouter } from '@angular/router';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAuth({
      config: {
        authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_83ju4bBly',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin + '/login',
        clientId: '3g9ifoegsd2u8dk9tn9m956ggh',
        usePushedAuthorisationRequests: false,
        scope: 'openid email', // 'openid profile offline_access ' + your scopes
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        ignoreNonceAfterRefresh: true,
        customParamsAuthRequest: {
          prompt: 'login',
           // login, consent
        },
        maxIdTokenIatOffsetAllowedInSeconds: 600,
      }
    }),
  ],
});

