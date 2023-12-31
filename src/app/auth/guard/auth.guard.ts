import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from 'src/app/shared/model/user.model';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const user: User = JSON.parse(authService.getAuthUserInfo()!);

  if (user) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
