import { Component } from '@angular/core';
import { Login } from '../login/login';
import { UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private loginService: Login;
  user:any;

  constructor(loginService: Login, private userService: UserService) {
    this.loginService = loginService;
    this.user = userService.getUserData();
  }

  //usar no futuro header
  logout() {
    this.loginService.logout();
  }
}
