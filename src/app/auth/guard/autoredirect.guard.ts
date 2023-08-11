import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from 'src/app/shared/model/user.model';

export const autoredirectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const user: User = JSON.parse(authService.getAuthUserInfo()!);

  if (user) {
    router.navigate(['/user']);
    return false;
  }
  return true;
};
