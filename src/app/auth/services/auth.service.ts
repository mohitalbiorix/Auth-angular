import { Injectable } from '@angular/core';
import { Auth } from 'src/app/shared/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public AUTH_KEY = 'user';

  constructor() {}

  setAuthUserInfo(data: Auth) {
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(data));
  }

  getAuthUserInfo() {
    return localStorage.getItem(this.AUTH_KEY);
  }

  removeUser() {
    localStorage.removeItem(this.AUTH_KEY);
  }
}
