import { Routes } from '@angular/router';
import { authGuard } from '@/router/guards/auth-guard';
import { healthRecordResolver } from '@/router/resolvers/health-record/health-record-resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: '',
    loadComponent: () => import('@/core/layout/landing-layout/landing-layout.component'),
    children: [
      {
        path: 'home',
        title: 'Jokeur',
        loadComponent: () => import('@/features/landing-page/pages/landing-page'),
      },
      {
        path: 'legal-notice',
        title: 'Mentions légales',
        loadComponent: () => import('@/features/landing-page/pages/legal-notice.page'),
      },
    ],
  },

  {
    path: 'login',
    title: 'Se connecter',
    loadComponent: () => import('../features/auth/pages/login.page'),
  },
  {
    path: 'register',
    title: 'Créer un compte',
    loadComponent: () => import('../features/auth/pages/register.page'),
  },
  {
    path: 'forgot-password',
    title: 'Réinitialisation du mot de passe',
    loadComponent: () => import('@/features/auth/pages/forgot-password.page'),
  },
  {
    path: 'reset-password',
    title: 'Réinitialisation du mot de passe',
    loadComponent: () => import('@/features/auth/pages/reset-password.page'),
  },

  {
    path: '',
    loadComponent: () => import('@/core/layout/main-layout/main-layout.component'),
    children: [
      {
        path: 'construction',
        title: 'under-construction',
        loadComponent: () => import('../features/under-construction/pages/under-construction.page'),
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
        path: 'calendar',
        title: 'Agenda',
        loadComponent: () => import('@/features/calendar/pages/calendar.page'),
      },
      {
        path: 'health-record/:id',
        title: 'Carnet de santé',
        loadComponent: () => import('../features/health-records/pages/health-record.page'),
        resolve: { healthRecord: healthRecordResolver },
      },
      {
        path: 'settings',
        title: 'Modification des informations',
        loadComponent: () => import('@/features/auth/pages/settings.page'),

      },
    ],
  },
];
