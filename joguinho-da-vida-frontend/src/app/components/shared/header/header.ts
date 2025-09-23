import { Component, OnInit } from '@angular/core';
import { Login } from '../../login/login';
import { MatIconModule } from '@angular/material/icon';
import { UserApiService } from '../../../services/api/user-api-service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  private loginService: Login;
  user: any;
  

  constructor(loginService: Login, private userApiService: UserApiService){
    this.loginService = loginService;
  }
  async ngOnInit(): Promise<void> {
    this.user = await this.userApiService.getMyUserInfo();
    console.log('User data on Header init:', this.user);
  }

  logout() {
    this.loginService.logout();
  }

}
