import { CommonModule } from '@angular/common';
import { Component, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
@Injectable({
  providedIn: 'root', // ✅ disponibiliza globalmente
})

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private router: Router) { } 

  private readonly oidcSecurityService = inject(OidcSecurityService);

  configuration$ = this.oidcSecurityService.getConfiguration();

  userData$ = this.oidcSecurityService.userData$;

  isAuthenticated = false;

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;

        console.warn('authenticated: ', isAuthenticated);
      }
    );
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout() {
    // limpa sessionStorage
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }

    // redireciona para rota interna
    this.router.navigate(['/login']);

    // se quiser redirecionar para Cognito logout:
    // const logoutUri = encodeURIComponent(window.location.origin + '/login');
    // const clientId = '3g9ifoegsd2u8dk9tn9m956ggh';
    // window.location.href = `https://us-east-1-83ju4bbly.auth.us-east-1.amazoncognito.com/logout?client_id=${clientId}&logout_uri=${logoutUri}`;
  }

}
