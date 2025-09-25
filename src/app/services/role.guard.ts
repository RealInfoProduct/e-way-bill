import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userRoles = localStorage.getItem('role') || '';
    const allowedRoles = route.data['roles'] as string[];

    const hasAccess = allowedRoles.some(role => userRoles.includes(role));

    if (!hasAccess) {
      // Redirect to unauthorized page or show error
     this.router.navigate(['/404']);
      return false;
    }

    return true;
  }
}
