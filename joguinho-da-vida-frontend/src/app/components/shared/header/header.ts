import { Component } from '@angular/core';
import { Login } from '../../login/login';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private loginService: Login;

  constructor(loginService: Login){
    this.loginService = loginService;
  }

  logout() {
    this.loginService.logout();
  }

}
