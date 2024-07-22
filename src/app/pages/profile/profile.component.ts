import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalAuthServiceService } from '../../services/msal-auth-service.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export default class ProfileComponent implements OnInit{

  constructor( private msalAuth: MsalAuthServiceService ){}

  ngOnInit(): void {
    console.log(localStorage)
  }

  logout(){
    this.msalAuth.msalLogout();
  }
}
