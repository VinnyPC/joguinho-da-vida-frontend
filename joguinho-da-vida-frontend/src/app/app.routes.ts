import { Routes } from '@angular/router';
import { authGuard } from './auth/authGuard';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { Profile } from './components/profile/profile';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard],

    },
    {
        path: 'profile',
        component: Profile,
        canActivate: [authGuard],
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
