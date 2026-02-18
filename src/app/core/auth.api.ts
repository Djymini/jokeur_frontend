import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { RegisterUserPayload } from '@/core/models/register-user-payload';
import { ErrorService } from '@/core/services/error.service';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  protected http = inject(HttpClient);
  protected readonly BASE_URL = environment.apiUrl;
  protected errorService = inject(ErrorService);

  async register(payload: RegisterUserPayload): Promise<{ message: string }> {
    try {
      return await firstValueFrom(
        this.http.post<{ message: string }>(`${this.BASE_URL}/auth/register`, payload),
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async login(payload: {
    email: string;
    password: string;
  }): Promise<{ token: string; email: string; role: string }> {
    try {
      return await firstValueFrom(
        this.http.post<{ token: string; email: string; role: string }>(
          `${this.BASE_URL}/auth/login`,
          payload,
        ),
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  protected handleError(error: any): Error {
    if (error instanceof HttpErrorResponse) {
      let err: Error;

      switch (error.status) {
        case 400:
          err = new Error('Données invalides');
          break;
        case 401:
          err = new Error('Non autorisé');
          break;
        case 403:
          err = new Error('Accès interdit');
          break;
        case 404:
          err = new Error('Ressource non trouvée');
          break;
        case 500:
          err = new Error('Erreur serveur');
          break;
        default:
          err = new Error('Erreur réseau');
      }

      // 👇 NotificationService vers ErrorService
      this.errorService.notify(err.message);
      return err;
    }

    const generic = new Error('Erreur inconnue');
    this.errorService.notify(generic.message);
    return generic;
  }
}
