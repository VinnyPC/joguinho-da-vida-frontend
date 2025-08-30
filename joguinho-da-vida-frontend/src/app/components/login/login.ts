import { CommonModule } from '@angular/common';
import { Component, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UserService } from '../../services/user-service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Injectable({
  providedIn: 'root', // ✅ disponibiliza globalmente
})

@Component({
  selector: 'app-login',
  imports: [CommonModule, MatSlideToggleModule,],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private router: Router,
    private userService: UserService) { }

  private readonly oidcSecurityService = inject(OidcSecurityService);

  configuration$ = this.oidcSecurityService.getConfiguration();

  userData$ = this.oidcSecurityService.userData$;

  isAuthenticated = false;

  ngOnInit(): void {
    this.oidcSecurityService.userData$.subscribe((userData) => {
      if (userData) {
        console.log('Dados do usuário:', userData);
        this.userService.setUserData(userData); // salva no serviço global
      }
    });

    // Monitorar autenticação
    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      console.log('Está autenticado?', isAuthenticated);
    });

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

    // if (window.sessionStorage) {
    //   sessionStorage.clear();
    //   localStorage.clear();
    // }

    // // redireciona para rota interna
    // this.router.navigate(['/login']);

    // se quiser redirecionar para Cognito logout:
    // const logoutUri = encodeURIComponent(window.location.origin + '/login');
    // const clientId = '3g9ifoegsd2u8dk9tn9m956ggh';
    // window.location.href = `https://us-east-1-83ju4bbly.auth.us-east-1.amazoncognito.com/logout?client_id=${clientId}&logout_uri=${logoutUri}`;


    const clientId = '3g9ifoegsd2u8dk9tn9m956ggh';
    const logoutUri = encodeURIComponent(window.location.origin + '/login');

    window.location.href =
      `https://us-east-183ju4bbly.auth.us-east-1.amazoncognito.com/logout?client_id=${clientId}&logout_uri=${logoutUri}`;

    
  }


}
