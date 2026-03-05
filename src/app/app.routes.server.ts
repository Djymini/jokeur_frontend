import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Pages publiques statiques : pré-générées au build pour de meilleures performances
    path: 'login',
    renderMode: RenderMode.Prerender,
  },
  {
    // Pages publiques statiques : pré-générées au build pour de meilleures performances
    path: 'register',
    renderMode: RenderMode.Prerender,
  },
  {
    // Route protégée : rendu côté client uniquement car elle dépend du localStorage
    // (token JWT, données utilisateur) qui n'est pas accessible côté serveur (SSR)
    path: 'dashboard',
    renderMode: RenderMode.Client,
  },
  {
    path: 'health-record/:id',
    renderMode: RenderMode.Client,
  },
  {
    // Toutes les autres routes : rendu à la demande côté serveur
    path: '**',
    renderMode: RenderMode.Server,
  },
];
