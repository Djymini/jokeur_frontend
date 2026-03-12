import { Injectable } from '@angular/core';
import { RegisterUserPayload } from '@/core/models/register-user-payload';
import { BaseApi } from '@/internal-shared/services/base.api';
import { UserModel } from '@/core/models/user-model';

@Injectable({ providedIn: 'root' })
export class AuthApi extends BaseApi {
  register(payload: RegisterUserPayload): Promise<{ message: string }> {
    return this.post<{ message: string }>('/auth/register', payload);
  }

  login(payload: { email: string; password: string }): Promise<UserModel> {
    return this.post<UserModel>('/auth/login', payload);
  }

  forgotPassword(payload: { email: string }): Promise<{ message: string }> {
    return this.post<{ message: string }>('/auth/forgot-password', payload);
  }

  resetPassword(payload: { token: string; newPassword: string }): Promise<void> {
    return this.post<void>('/auth/reset-password', payload);
  }
}
