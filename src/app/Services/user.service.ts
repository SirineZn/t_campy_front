import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUser() {
    return 'user';
  }

  public isLoggedIn(): boolean {
    return true;
  }

  public isLoggedOut(): boolean {
    return false;
  }

  public isAdmin(): boolean {
    return true;
  }

  public isUser(): boolean {
    return true;
  }
}
