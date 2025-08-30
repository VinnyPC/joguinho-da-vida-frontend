import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
    const oidcSecurityService = inject(OidcSecurityService);
    const router = inject(Router);

    return oidcSecurityService.isAuthenticated$.pipe(
        take(1),
        map((isAuthenticated) => {
            if (!isAuthenticated) {
                router.navigate(['/login']); // redireciona para login se não autenticado
                return false;
            }
            return true;
        })
    );
};
