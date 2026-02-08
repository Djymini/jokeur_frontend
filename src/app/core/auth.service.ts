import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _tokenKey = 'access_token';
  private readonly _platformId = inject(PLATFORM_ID);

  readonly isLoggedIn = signal<boolean>(false);

  constructor() {
    if (this._isBrowser()) {
      this.isLoggedIn.set(this._hasToken());
    }
  }

  private _isBrowser(): boolean {
    return isPlatformBrowser(this._platformId);
  }

  private _hasToken(): boolean {
    if (!this._isBrowser()) return false;
    return !!localStorage.getItem(this._tokenKey);
  }

  getToken(): string | null {
    if (!this._isBrowser()) return null;
    return localStorage.getItem(this._tokenKey);
  }

  /*
  loginMock(_username: string, _password: string): void {
    void _username;
    void _password;

    if (!this._isBrowser()) return;
    localStorage.setItem(this._tokenKey, 'mock-token');
    this.isLoggedIn.set(true);
  }
  */

  setToken(token: string): void {
    if(!this._isBrowser()) return;
  localStorage.setItem(this._tokenKey, token);
  this.isLoggedIn.set(true);
  }

  logout(): void {
      if (!this._isBrowser()) return;
      localStorage.removeItem(this._tokenKey);
      this.isLoggedIn.set(false);
    }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
