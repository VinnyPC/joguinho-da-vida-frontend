import { CommonModule, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UserService } from '../../services/user-service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Injectable({
  providedIn: 'root', // ✅ disponibiliza globalmente
})

@Component({
  selector: 'app-login',
  imports: [CommonModule, MatSlideToggleModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements AfterViewInit {

  constructor(private router: Router, private el: ElementRef,
    private userService: UserService) { }

  private readonly oidcSecurityService = inject(OidcSecurityService);

  configuration$ = this.oidcSecurityService.getConfiguration();

  userData$ = this.oidcSecurityService.userData$;

  isAuthenticated = false;

  layers!: NodeListOf<HTMLElement>;

  // posição do mouse
  targetX = 0;
  targetY = 0;

  // posição atual suavizada
  currentX = 0;
  currentY = 0;

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
  ngAfterViewInit() {
    this.layers = this.el.nativeElement.querySelectorAll('.parallax-layer');
    this.animate();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const { innerWidth, innerHeight } = window;
    const mouseX = event.clientX - innerWidth / 2;
    const mouseY = event.clientY - innerHeight / 2;

    // alvo que o movimento deve seguir
    this.targetX = (mouseX / innerWidth) * 2;
    this.targetY = (mouseY / innerHeight) * 2;
  }

  animate() {
    // suavização (0.05 = mais lento, 0.2 = mais rápido)
    this.currentX += (this.targetX - this.currentX) * 0.05;
    this.currentY += (this.targetY - this.currentY) * 0.05;

    // aplica transform em cada camada
    this.layers.forEach((layer: HTMLElement) => {
      const depth = parseFloat(layer.getAttribute('data-depth') || '0');
      const moveX = this.currentX * depth * 30;
      const moveY = this.currentY * depth * 10;

      layer.style.transform = `translate(calc(${moveX}px - 50%), ${moveY}px) scale(1.1)`;
    });

    requestAnimationFrame(() => this.animate());
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
