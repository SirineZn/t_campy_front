import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  public getToken(): string {
    return localStorage.getItem('token')!;
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public removeToken(): void {
    localStorage.removeItem('token');
  }

  public getUserId(): string {
    return localStorage.getItem('userId')!;
  }

  public setUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  public removeUserId(): void {
    localStorage.removeItem('userId');
  }

  public isAdmin(): boolean {
    return localStorage.getItem('Admin') === 'true';
  }

  public setAdmin(): void {
    localStorage.setItem('Admin', 'true');
  }

  public login(username: string, password: string): void {
    if (username === 'admin' && password === 'admin') {
      this.setToken('token');
      this.setUserId('1');
      this.setAdmin();
    } else {
      this.setToken('token');
      this.setUserId('2');
    }
  }

  public register(username: string, password: string, age: number): void {
    if (username === 'admin' && password === 'admin') {
      this.setToken('token');
      this.setUserId('1');
      this.setAdmin();
      this.login(username, password);
    } else {
      this.setToken('token');
      this.setUserId('2');
      this.login(username, password);
    }
  }

  public removeAdmin(): void {
    localStorage.removeItem('Admin');
  }

  public logout(): void {
    this.removeToken();
    this.removeUserId();
    if (this.isAdmin()) this.removeAdmin();
  }

  public isLogged(): boolean {
    return !!localStorage.getItem('token');
  }

  public getUser(): string {
    return localStorage.getItem('userId')!;
  }
}
