import { Routes } from '@angular/router';

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
];
