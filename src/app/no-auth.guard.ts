import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

export const NoauthGuard: CanActivateFn = (route, state) => {
  const msalService = inject(MsalService);
  const router = inject(Router);

  let sesionIniciada = msalService.instance.getActiveAccount();

  if (sesionIniciada != null) {
    router.navigate(['profile']);
    return false;
  } else {
    return true;
  }
};
