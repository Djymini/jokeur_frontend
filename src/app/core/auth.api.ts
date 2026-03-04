import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { RegisterUserPayload } from '@/core/models/register-user-payload';
import { BaseApi } from '@/internal-shared/services/base.api';
import { UserModel } from '@/core/models/user-model';
import { HttpErrorResponse } from '@angular/common/http';
import { toast } from 'ngx-sonner';

@Injectable({ providedIn: 'root' })
export class AuthApi extends BaseApi {
  // protected errorService = inject(ErrorService);

  async register(payload: RegisterUserPayload): Promise<{ message: string }> {
    try {
      return await firstValueFrom(
        this.http.post<{ message: string }>(`${this.BASE_URL}/auth/register`, payload),
      );
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        const backendMessage = (error.error as any)?.message;

        if (backendMessage) {
          toast.error(String(backendMessage));
          throw new Error(String(backendMessage));
        }
      }

      const err = this._handleError(error);
      toast.error(err.message);
      throw err;
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
