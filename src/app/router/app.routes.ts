import { Routes } from '@angular/router';
import { authGuard } from '@/router/guards/auth-guard';
import { healthRecordResolver } from '@/router/resolvers/health-record/health-record-resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
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
    canActivate: [authGuard],
    loadComponent: () => import('../features/dashboard/pages/dashboard.page'),
  },
  {
    path: 'news',
    title: 'Les actualités',
    loadComponent: () => import('@/features/news/news.component'),
  },

  {
    path: 'form',
    title: 'Formulaire',
    loadComponent: () => import('@/features/health-records/pages/health-record-form.page'),
  },

  {
    path: 'reminder',
    title: 'Rappels',
    loadComponent: () => import('@/features/reminders/pages/reminder.page'),
  },

  {
    path: 'appointment',
    title: 'Rendez-vous',
    loadComponent: () => import('@/features/appointment/pages/appointment.page'),
  },

  {
    path: 'health-record/:id',
    title: 'Carnet de santé',
    loadComponent: () => import('../features/health-records/pages/health-record.page'),
    resolve: { healthRecord: healthRecordResolver },
  },

  {
    path: 'forgot-password',
    title: 'Reinitialisation du mot de passe',
    loadComponent: () => import('@/features/auth/pages/forgot-password.page'),
  },

  {
    path: 'reset-password',
    title: 'Modification du mot de passe',
    loadComponent: () => import('@/features/auth/pages/reset-password.page'),
  },
  {
    path: 'user-profile',
    title: 'Modification des informations',
    loadComponent: () => import('@/features/auth/pages/user-profile.page').then((m) => m.default),
  },
];
