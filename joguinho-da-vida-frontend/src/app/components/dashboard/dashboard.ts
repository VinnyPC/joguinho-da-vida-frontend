import { Component } from '@angular/core';
import { Login } from '../login/login';
import { UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';
import { Header } from "../shared/header/header";
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Header, MatProgressBarModule],
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
