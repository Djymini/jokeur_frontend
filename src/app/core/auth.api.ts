import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { RegisterUserPayload } from '@/core/models/register-user-payload';
import { ErrorService } from '@/core/services/error.service';
import { BaseApi } from '@/internal-shared/services/base.api';
import { UserModel } from '@/core/models/user-model';

@Injectable({ providedIn: 'root' })
export class AuthApi extends BaseApi {
  protected errorService = inject(ErrorService);

  async register(payload: RegisterUserPayload): Promise<{ message: string }> {
    try {
      return await firstValueFrom(
        this.http.post<{ message: string }>(`${this.BASE_URL}/auth/register`, payload),
      );
    } catch (error) {
      throw this._handleError(error);
    }
  }

  async login(payload: { email: string; password: string }): Promise<UserModel> {
    try {
      return await firstValueFrom(
        this.http.post<UserModel>(`${this.BASE_URL}/auth/login`, payload),
      );
    } catch (error) {
      throw this._handleError(error);
    }
  }
}
