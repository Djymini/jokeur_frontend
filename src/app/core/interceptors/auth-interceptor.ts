import { HttpInterceptorFn } from '@angular/common/http';
import { DOCUMENT, inject } from '@angular/core';

/* A REMETTRE SI PROBLEME
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Ne pas ajouter le token aux routes publiques
  if (req.url.includes('/auth/')) {
    return next(req);
  }

  const documentRef = inject(DOCUMENT);
  const storage = documentRef.defaultView?.localStorage;

  const token = storage?.getItem('jwt_token');

  if (token) {
    return next(
      req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      }),
    );
  }

  return next(req);
}; */

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1) Ne pas toucher aux preflight (sécurité)
  if (req.method === 'OPTIONS') {
    return next(req);
  }

  // 2) Ne pas ajouter le token aux routes publiques d’auth
  //    -> couvre /auth, /auth/, /auth/login, /auth/register, etc.
  const isAuthRoute =
    req.url.includes('/auth') && (req.url.includes('/auth/') || req.url.endsWith('/auth'));

  if (isAuthRoute) {
    return next(req);
  }

  const documentRef = inject(DOCUMENT);
  const storage = documentRef.defaultView?.localStorage;
  const token = storage?.getItem('jwt_token')?.trim();

  if (!token) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    }),
  );
};
