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
      console.log('environement : ' + environment.name);
      console.log('BASE_API : ' + this.BASE_URL);
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

  protected async postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    try {
      return await firstValueFrom(this.http.post<T>(`${this.BASE_URL}${endpoint}`, formData));
    } catch (error) {
      throw this._handleError(error);
    }
  }

  protected async postBlob(endpoint: string, body: any): Promise<Blob> {
    try {
      return await firstValueFrom(
        this.http.post(`${this.BASE_URL}${endpoint}`, body, {
          headers: this.getHeaders(),
          responseType: 'blob',
        }),
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

      switch (error.status) {
        case 400:
          return new Error(backendMessage ?? 'Données invalides');
        case 401: {
          const err = new Error(backendMessage ?? 'Non autorisé') as any;
          err.status = 401;
          return err;
        }
        case 403:
          return new Error(backendMessage ?? 'Accès interdit');
        case 404:
          return new Error(backendMessage ?? 'Ressource non trouvée');
        case 409: {
          const err = new Error(error.error?.message ?? 'Conflit') as any;
          err.status = 409;
          err.errorCode = error.error?.error ?? 'UNKNOWN_CONFLICT';
          return err;
        }
        case 413: {
          const err = new Error('FILE_TOO_LARGE') as any;
          err.status = 413;
          err.errorCode = 'FILE_TOO_LARGE';
          return err;
        }

        case 500:
          return new Error(backendMessage ?? 'Erreur serveur');
        default: {
          const err = new Error('Erreur réseau') as any;
          err.status = 0;
          toast.error('Erreur réseau', { id: 'Erreur réseau' });
          return err;
        }
      }
    }

    console.error('BASE_API unknown error shape:', error);
    toast.error('Erreur inconnue');
    return new Error('Erreur inconnue');
  }
}
