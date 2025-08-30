import { Component } from '@angular/core';
import { Login } from '../login/login';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private loginService: Login;

  constructor(loginService: Login) {
    this.loginService = loginService;
  }

  logout() {
    this.loginService.logout();
  }
}
