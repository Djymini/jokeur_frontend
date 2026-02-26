import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseApi {
  protected http = inject(HttpClient);
  protected readonly BASE_URL = environment.apiUrl;

  protected getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  protected async get<T>(endpoint: string): Promise<T> {
    try {
      return await firstValueFrom(
        this.http.get<T>(`${this.BASE_URL}${endpoint}`, { headers: this.getHeaders() }),
      );
    } catch (error) {
      throw this._handleError(error);
    }
  }

  protected async post<T>(endpoint: string, body: any): Promise<T> {
    try {
      return await firstValueFrom(
        this.http.post<T>(`${this.BASE_URL}${endpoint}`, body, { headers: this.getHeaders() }),
      );
    } catch (error) {
      throw this._handleError(error);
    }
  }

  protected async put<T>(endpoint: string, body: any): Promise<T> {
    try {
      return await firstValueFrom(
        this.http.put<T>(`${this.BASE_URL}${endpoint}`, body, { headers: this.getHeaders() }),
      );
    } catch (error) {
      throw this._handleError(error);
    }
  }

  protected async patch<T>(endpoint: string, body: any): Promise<T> {
    try {
      return await firstValueFrom(
        this.http.patch<T>(`${this.BASE_URL}${endpoint}`, body, { headers: this.getHeaders() }),
      );
    } catch (error) {
      throw this._handleError(error);
    }
  }

  protected async delete<T>(endpoint: string): Promise<T> {
    try {
      return await firstValueFrom(
        this.http.delete<T>(`${this.BASE_URL}${endpoint}`, { headers: this.getHeaders() }),
      );
    } catch (error) {
      throw this._handleError(error);
    }
  }

  protected _handleError(error: unknown): Error {
    if (error instanceof HttpErrorResponse) {
      const backendMessage =
        error.error && typeof error.error === 'object' && (error.error as any)?.message
          ? String((error.error as any).message)
          : typeof error.error === 'string'
            ? error.error
            : null;

      let message = backendMessage;

      if (backendMessage) {
        message = backendMessage;
      } else {
        switch (error.status) {
          case 400:
            message = 'Données invalides';
            break;
          case 401:
            message = 'Non autorisé';
            break;
          case 403:
            message = 'Accès interdit';
            break;
          case 404:
            message = 'Ressource non trouvée';
            break;
          case 500:
            message = 'Erreur serveur';
            break;
          default:
            message = 'Erreur réseau';
        }
      }

      toast.error(message, { id: message });
      return new Error(message);
    }

    console.error('BASE_API unknown error shape:', error);

    toast.error('Erreur inconnue');
    return new Error('Erreur inconnue');
  }
}
