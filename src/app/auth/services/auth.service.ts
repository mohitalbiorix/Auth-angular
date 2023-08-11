import { Injectable } from '@angular/core';
import { Auth } from 'src/app/shared/model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public AUTH_KEY: string = 'user';

  constructor() {}

  // set userData in localStorage
  setAuthUserInfo(data: Auth): void {
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(data));
  }

  // get userData from localStorage
  getAuthUserInfo(): string | null {
    return localStorage.getItem(this.AUTH_KEY);
  }

  //clear user from local storage
  removeUser(): void {
    localStorage.removeItem(this.AUTH_KEY);
  }
}
