import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'home',
    renderMode: RenderMode.Server,
  },
  {
    path: 'login',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'register',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'dashboard',
    renderMode: RenderMode.Client,
  },
  {
    path: 'health-record/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'settings',
    renderMode: RenderMode.Client,
  },
  {
    path: 'legal-notice',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
