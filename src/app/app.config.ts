import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuard, MsalInterceptor, MsalService } from '@azure/msal-angular';
import { Configuration, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

const msalConfig: Configuration = {
  auth: {
    clientId: environment.clientId,
    authority: environment.instance + environment.tenantId,
    redirectUri: 'http://localhost:4200'
  }
}

const msalInstanceFactory = () => {
  const msalInstance = new PublicClientApplication(msalConfig);
  msalInstance.initialize()
  return msalInstance;
};

const msalGuardConfiguration = {
  interactionType: InteractionType.Popup || InteractionType.Redirect, 
  authRequest: { scopes: ['user.read'] },
  loginFailedRoute: 'login',

};

const msalInterceptorConfig = {
  interactionType: InteractionType.Popup || InteractionType.Redirect,
  protectedResourceMap: new Map([['https://graph.microsoft.com/v1.0/me', ['user.read']]])
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: MSAL_INSTANCE, useFactory: msalInstanceFactory },
    { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfiguration },
    { provide: MSAL_INTERCEPTOR_CONFIG, useValue: msalInterceptorConfig },
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
    MsalService, MsalBroadcastService, MsalGuard,
  ]
};
