import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // Ne pas ajouter le token aux routes publiques
  if (req.url.includes('/auth/')) {
    return next(req);
  }

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

  return next(req);
};
