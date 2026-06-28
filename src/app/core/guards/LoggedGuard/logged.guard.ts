import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environment/environment';

export const loggedGuard: CanActivateFn = () => {
  const router = inject(Router);
  const id = inject(PLATFORM_ID);

  if (isPlatformBrowser(id)) {
    //to know if user login or not
    if (localStorage.getItem(environment.token) !== null) {
      if (localStorage.getItem(environment.tokenExpireDate) !== null) {
        const expireDate = localStorage.getItem(environment.tokenExpireDate);
        if (Date.now() <= Number(expireDate)) {

          return true;
        } else {
          // Token expired
          localStorage.removeItem(environment.token);
          localStorage.removeItem(environment.tokenExpireDate);
          router.navigate(['/login']);
          return false;
        }
      } else {
        //navigate to projects
        return true;
      }
    } else {
      router.navigate(['/login']);
      return false;
    }
  } else {
    return true;
  }
};
