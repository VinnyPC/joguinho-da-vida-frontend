import { Routes } from '@angular/router';
import { authGuard } from './auth/authGuard';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard], // <-- rota protegida

    },
    {
        path: 'login',
        component: Login,
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    },
];
