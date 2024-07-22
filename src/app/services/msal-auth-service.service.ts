import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MsalAuthServiceService {
  
  constructor( private msalService: MsalService, private msalBroadcastService: MsalBroadcastService, private router: Router) { 
    this.msalBroadcastService.inProgress$
      .pipe(filter((status: InteractionStatus) => status === InteractionStatus.None))
      .subscribe(() => {
        console.log('MSAL is initialized and ready.');
      });
  }

  public msalLogin(){
    this.msalService.loginPopup().subscribe({
      next: (response: AuthenticationResult ) =>{
        console.log(response);
        localStorage.setItem("respuesta", JSON.stringify(response))
        this.msalService.instance.setActiveAccount(response.account);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
      complete: () => {
        this.router.navigate(['profile']);
      }
    })
  }

  public msalLogout(){
    this.msalService.logout().subscribe({
      next: () => {
        localStorage.removeItem("respuesta")
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {
        this.router.navigate(['login']);
      }
    });
  }
}
