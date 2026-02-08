import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterFormOwnerModel } from '@/features/auth/models/register-form-owner-model';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  protected http = inject(HttpClient);
  protected readonly BASE_URL = environment.apiUrl;

  /* protected getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  } */

  async register(registerForm: FormGroup<RegisterFormOwnerModel>): Promise<RegisterFormOwnerModel> {
    return await firstValueFrom(
      this.http.post<RegisterFormOwnerModel>(`${this.BASE_URL}/auth/register`, registerForm.value),
    );
  }

  // fait par chatGPT à vérifier avec eshop si identique
  async login(payload: { email: string; password: string; }): Promise<{ token: string; email: string; role: string; }> {
    return await firstValueFrom(
      this.http.post<{ token: string; email: string; role: string }>(`${this.BASE_URL}/auth/login`, payload)
    );
  }

}
