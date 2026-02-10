import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { RegisterUserPayload } from '@/core/models/register-user-payload';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  protected http = inject(HttpClient);
  protected readonly BASE_URL = environment.apiUrl;

  /* protected getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  } */

  async register(payload: RegisterUserPayload): Promise<{ message: string }> {
    return await firstValueFrom(
      this.http.post<{ message: string }>(`${this.BASE_URL}/auth/register`, payload)
    );
  }

  // fait par chatGPT à vérifier avec eshop si identique
  async login(payload: {
    email: string;
    password: string;
  }): Promise<{ token: string; email: string; role: string }> {
    return await firstValueFrom(
      this.http.post<{ token: string; email: string; role: string }>(
        `${this.BASE_URL}/auth/login`,
        payload,
      ),
    );
  }
}
