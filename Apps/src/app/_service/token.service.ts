import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private roles: string[] = [];

  constructor(private router: Router) {}

  public setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY) || '';
  }

  public isLogged(): boolean {
    return !!this.getToken();
  }

  public getUserName(): string | null {
    const payload = this.decodePayload();
    return payload ? payload.sub : null;
  }

  public isAdmin(): boolean {
    const payload = this.decodePayload();
    return payload ? payload.roles.includes('ROLE_ADMIN') : false;
  }

  public logOut(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  private decodePayload(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error decoding token payload', error);
      return null;
    }
  }
}
