import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserModel } from '@/core/models/user-model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _tokenKey = 'jwt_token';
  private readonly _platformId = inject(PLATFORM_ID);

  readonly isLoggedIn = signal<boolean>(false);
  readonly user = signal<UserModel | undefined>(undefined);

  constructor() {
    if (this._isBrowser()) {
      this.isLoggedIn.set(this._hasToken());

      const stored = localStorage.getItem('user');
      if (stored) {
        this.user.set(JSON.parse(stored));
      }
    }
  }

  private _isBrowser(): boolean {
    return isPlatformBrowser(this._platformId);
  }

  private _hasToken(): boolean {
    if (!this._isBrowser()) return false;
    const token = localStorage.getItem(this._tokenKey);
    if (!token) {
      localStorage.removeItem('user');
      return false;
    }
    return true;
  }

  getToken(): string | null {
    if (!this._isBrowser()) return null;
    return localStorage.getItem(this._tokenKey);
  }

  setToken(token: string): void {
    if (!this._isBrowser()) return;
    localStorage.setItem(this._tokenKey, token);
    this.isLoggedIn.set(true);
  }

  updateUser(user: UserModel): void {
    this.user.set(user);
    if (this._isBrowser()) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  logout(): void {
    if (!this._isBrowser()) return;
    localStorage.removeItem(this._tokenKey);
    localStorage.removeItem('user');
    this.isLoggedIn.set(false);
    this.user.set(undefined);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
