import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const user: any = authService.getAuthUserInfo();

  if (JSON.parse(user)) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
