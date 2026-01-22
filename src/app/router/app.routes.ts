import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Accueil',
    loadComponent: () => import('../features/under-construction/pages/under-construction.page'),
  },
];
