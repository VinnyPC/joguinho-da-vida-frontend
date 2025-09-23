import { Injectable } from '@angular/core';
import { TokenService } from '../../auth/tokenService';
import { UserService } from '../user-service/user-service';
import { environment } from '../../../env/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private tokenService: TokenService, private userService: UserService, private http: HttpClient) { }

  async getUserInfoById(userId: string) {
    const apiUrl = environment.apiUrl + environment.endpoints.user + userId;

    const token = await this.tokenService.getIdToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const result = await firstValueFrom(this.http.get(apiUrl, { headers }));
    return result;
  }

  async getMyUserInfo() {
    const userData: any = this.userService.getUserData();
    console.log('User Data from UserService:', userData);

    try {
      const result = await this.getUserInfoById(userData.username);
      console.log('Dados do usuario obtidos da API:', result);
      return result;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  }

}
