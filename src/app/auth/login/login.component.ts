import { Component } from '@angular/core';
import { MsalAuthServiceService } from '../../services/msal-auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  constructor( private msalAuthService: MsalAuthServiceService){}

  login(){
    this.msalAuthService.msalLogin();
  }
}
