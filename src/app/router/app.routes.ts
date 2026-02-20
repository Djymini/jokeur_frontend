import { Routes } from '@angular/router';
import { authGuard } from '@/router/guards/auth-guard';
import { healthRecordResolver } from '@/router/resolvers/health-record/health-record-resolver';

export const routes: Routes = [
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

  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    title: 'Tableau de bord',
    loadComponent: () => import('../features/dashboard/pages/home.page'),
    canActivate: [authGuard],
  },

  {
    path: 'form',
    title: 'Formulaire',
    loadComponent: () => import('@/features/health-records/pages/health-record-form.page'),
  },

  {
    path: 'health-record/:id',
    title: 'Carnet de santé',
    loadComponent: () => import('../features/health-records/pages/health-record.page'),
    resolve: { healthRecord: healthRecordResolver },
  },
];
