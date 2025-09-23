import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  accessToken?: string;

  constructor(private oidcSecurityService: OidcSecurityService) { }

  getAccessToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.oidcSecurityService.getAccessToken().subscribe({
        next: token => resolve(token),
        error: err => reject(err)
      });
    });
  }
  getIdToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.oidcSecurityService.getIdToken().subscribe({
        next: token => resolve(token),
        error: err => reject(err)
      });
    });
  }

  
}
