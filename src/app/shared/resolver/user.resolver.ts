import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { catchError } from 'rxjs/operators';

export const userResolver: ResolveFn<any> = (route, state) => {
  const userService = inject(UserService);
  return userService.getAllUser().pipe(
    catchError((error) => {
      return error;
    })
  );
};
