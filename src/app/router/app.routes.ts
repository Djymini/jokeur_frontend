import { Routes } from '@angular/router';
import { authGuard } from '@/router/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Accueil',
    loadComponent: () => import('../features/dashboard/pages/home.page'),
  },
  {
    path: 'construction',
    title: 'under-construction',
    loadComponent: () => import('../features/under-construction/pages/under-construction.page'),
  },

  {
    path: 'register',
    title: 'Créer un compte',
    loadComponent: () => import('../features/auth/pages/register.page'),
  },

  {
    path: 'login',
    title: 'Se connecter',
    loadComponent: () => import('../features/auth/pages/login.page'),
  },

  {
    path: 'dashboard',
    title: 'Tableau de bord',
    loadComponent: () => import('../features/auth/pages/dashboard.page'),
    canActivate: [authGuard],
  },
];
