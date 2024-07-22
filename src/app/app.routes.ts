import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { NoauthGuard } from './no-auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component'),
    canActivate: [NoauthGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component'),
    canActivate: [MsalGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
