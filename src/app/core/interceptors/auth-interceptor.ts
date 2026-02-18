import { HttpInterceptorFn } from '@angular/common/http';
import { DOCUMENT, inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Ne pas ajouter le token aux routes publiques
  if (req.url.includes('/auth/')) {
    return next(req);
  }

  const document: Document = inject(DOCUMENT);
  const localStorage = document.defaultView?.localStorage


  if (localStorage!) {
    const token = localStorage.getItem('jwt_token');

    if (token) {
      return next(
        req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
    }
  }


  return next(req);
};
