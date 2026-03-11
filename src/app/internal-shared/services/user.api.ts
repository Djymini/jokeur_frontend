import { Injectable } from '@angular/core';
import { BaseApi } from './base.api';

@Injectable({ providedIn: 'root' })
export class UserApi extends BaseApi {
  getMe(): Promise<{ name: string; firstname: string; address: string | null }> {
    return this.get('/user/me');
  }

  updateUserProfile(payload: {
    name?: string;
    firstname?: string;
    address?: string;
  }): Promise<void> {
    return this.patch<void>('/user/me', payload);
  }
}
